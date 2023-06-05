//project level ki API
const express = require("express");
const app = express();
require("./config");
const Product = require("./product");

app.use(express.json()); //POST and PUT (compulsory)
//create/insert(POST) data in database from the postman
app.post("/create", async (req, res) => {
  let data = new Product(req.body);
  let result = await data.save();
  console.log(result);
  res.send(result);
});

//get/read(GET) data from the database
app.get("/list", async (req, res) => {
  let data = await Product.find();
  res.send(data);
  console.log(data);
});

// //delete(DELETE) data from the database
app.delete("/delete/:_id", async (req, res) => {
  let data = await Product.deleteOne(req.params);
  console.log(data);
  res.send(data);
});

//update(PUT) the data in database with the help of postman
app.put("/update/:_id", async (req, res) => {
  let data = await Product.updateOne(req.params, { $set: req.body });
  res.send(req.body);
  console.log(req.body);
});

//search API in nodejs with mongoDB
//->make simple GET route for API
// ->search with single field
//->search with multiple field
//->Test API with postman
app.get("/search/key", async (req, res) => {
  let data = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { brand: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
    ],
  });
  console.log(req.params.key);
  res.send(data);
});
app.listen(7000);
