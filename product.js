const mongoose = require("mongoose");

//schema
const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  category: String,
  price: Number,
});

//model
const ProductModel = mongoose.model("practices", ProductSchema);

module.exports = ProductModel;
