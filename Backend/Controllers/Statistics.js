const Transaction = require('../schema/Schema');

exports.getStatistics = async (req, res) => {
  try {
    const { month } = req.query;

    // Filter by month alone using aggregation pipeline
    const matchStage = month ? {
      $match: {
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)] // Extract month from dateOfSale field
        }
      }
    } : {};

    // Aggregate total sales and total sold items
    const totalSales = await Transaction.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalAmount: { $sum: '$price' },
          totalSold: {
            $sum: {
              $cond: [{ $eq: ['$sold', true] }, 1, 0] // Count sold items
            }
          }
        }
      }
    ]);

    // Count total items in the filtered month
    const totalItems = await Transaction.countDocuments({
      ...matchStage.$match
    });

    // Calculate the total unsold items
    const totalNotSold = totalItems - (totalSales[0]?.totalSold || 0);

    res.json({
      totalSales: totalSales[0]?.totalAmount || 0,
      totalSoldItems: totalSales[0]?.totalSold || 0,
      totalNotSoldItems: totalNotSold,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error calculating statistics', error });
  }
};
