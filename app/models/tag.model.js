const mongoose = require("mongoose");

const Tag = mongoose.model(
  "Tag",
  new mongoose.Schema({
    name: String,
    // Other fields specific to the Tag model
  })
);

module.exports = Tag;
