const Transaction = require('../schema/Schema');

exports.getTransactions = async (req, res) => {
  try {
    const { page = 1, perPage = 10, search, month } = req.query;

    // Initialize the aggregation pipeline
    let pipeline = [];

    // If month is provided, add a $match stage to filter by month
    if (month) {
      const monthNumber = parseInt(month, 10);
      if (isNaN(monthNumber) || monthNumber < 1 || monthNumber > 12) {
        return res.status(400).json({ message: "Invalid month provided" });
      }

      // Add $match for month filtering (only month)
      pipeline.push({
        $match: {
          $expr: {
            $eq: [{ $month: '$dateOfSale' }, monthNumber]
          }
        }
      });
    }

    // If search is provided, add search filters to $match
    if (search) {
      const searchValue = search.toString();
      const numericSearch = !isNaN(searchValue) ? Number(searchValue) : null;

      const searchFilter = {
        $or: [
          { title: { $regex: searchValue, $options: 'i' } },
          { description: { $regex: searchValue, $options: 'i' } }
        ]
      };

      // Add price search if the search term is a number
      if (numericSearch !== null) {
        searchFilter.$or.push({ price: numericSearch });
      }

      // Add the search filter to the aggregation pipeline
      pipeline.push({ $match: searchFilter });
    }

    // Add pagination to the pipeline
    const skip = (parseInt(page) - 1) * parseInt(perPage);
    const limit = parseInt(perPage);

    pipeline.push(
      { $skip: skip },
      { $limit: limit }
    );

    // Execute the aggregation pipeline
    const transactions = await Transaction.aggregate(pipeline);

    // Get the total count of documents with the applied filters
    const countPipeline = [...pipeline];
    countPipeline.pop(); // Remove the pagination ($skip, $limit) from the count query

    const total = await Transaction.aggregate([
      ...countPipeline,
      { $count: 'total' }
    ]);

    const totalCount = total[0] ? total[0].total : 0;

    return res.json({
      transactions,
      total: totalCount,
      pages: Math.ceil(totalCount / perPage),
    });

  } catch (error) {
    console.error("Error Fetching Transactions:", error);
    res.status(500).json({
      message: "Error fetching transactions",
      error: error.toString()
    });
  }
};
