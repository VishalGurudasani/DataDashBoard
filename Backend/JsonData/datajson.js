const mongoose = require('mongoose');
const axios = require('axios');
const Transaction = require('../schema/Schema');

const fetchDataAndSeed = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const data = response.data;
    console.log(data);

    await mongoose.connect('mongodb://localhost:27017/transactionDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Transaction.deleteMany({});

    const transactions = data.map(item => ({
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      sold: item.sold,
      dateOfSale: new Date(item.dateOfSale),
    }));

    await Transaction.insertMany(transactions);

    console.log('Data seeded successfully!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Error fetching or seeding data:', error);
  }
};

fetchDataAndSeed();
