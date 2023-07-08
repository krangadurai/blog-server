const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    // Other fields specific to the Category model
  })
);

module.exports = Category;
