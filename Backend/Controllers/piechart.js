const Transaction = require('../schema/Schema');

exports.getPieChart = async (req, res) => {
  try {
    const { month } = req.query;

    // Apply the month filter using the $expr operator
    const filter = month ? {
      $expr: {
        $eq: [{ $month: '$dateOfSale' }, parseInt(month, 10)]
      }
    } : {};

    // seperate on the base of category
    const pieChartData = await Transaction.aggregate([
      { $match: filter },
      { 
        $group: { 
          _id: '$category', 
          count: { $sum: 1 } 
        }
      }
    ]);

    res.json(pieChartData);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pie chart data', error });
  }
};
