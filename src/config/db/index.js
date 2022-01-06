const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@api-shopping-cart.rpzxl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );

    console.log(`MongoDB connected`);
  } catch (error) {
    console.log('MongDB connect failed: ', error.message);
  }
}

module.exports = connectDB;
