const Transaction = require('../schema/Schema');

exports.getBarChart = async (req, res) => {
  try {
    const { month } = req.query;

    // Set filter for the month (if provided)
    const filter = month ? {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)]
      }
    } : {};

    // Define the price ranges for the bar chart
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];

    // Fetch the data for each price range
    const barChartData = await Promise.all(
      priceRanges.map(async (range) => {
        // Count the documents within each price range and the filter
        const count = await Transaction.countDocuments({
          ...filter,
          price: { $gte: range.min, $lte: range.max }
        });

        // Return the data for this range
        return {
          range: `${range.min} - ${range.max}`,
          count,
        };
      })
    );

    res.json(barChartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bar chart data', error });
  }
};
