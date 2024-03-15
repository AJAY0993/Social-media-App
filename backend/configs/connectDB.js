const mongoose = require('mongoose');

const dbString = process.env.DB_STRING;
const dbPassword = process.env.DB_PASSWORD;

const dbURI = dbString.replace('<password>', dbPassword);

module.exports = async () => {
  try {
    await mongoose.connect(dbURI);
    console.log('Connected to db');
  } catch (error) {
    console.log(error);
  }
};
