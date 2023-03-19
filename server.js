const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://batch6:herovired@cluster0.aqifkg2.mongodb.net/Batch7")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const productSchema = {
  category: String,
  subcategory: [String],
  price: Number,
  name: String,
  id: String,
};

const Product = mongoose.model("product", productSchema);

app.post("/add-product", async (req, res) => {
  const { category, subcategory, price, name, id } = req.body;
  try {
    const newProduct = new Product({
      category: category,
      subcategory: subcategory,
      price: price,
      name: name,
      id: id,
    });
    const result = await newProduct.save();
    if (result) {
      res.send({ message: "Data added successfully!", data: result });
    }
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

//for gettingg all the procuts

app.get("/products", async (req,res) => {
    const productList = await Product.find();
    res.send(productList);
  });

//for gettinng producy by id

app.get("/products/:id", async (req, res) => {
    const { id } = req.params;
      const product = await Product.find({id: id});
      if(product){
        res.send(product);  
    }
    else{
        res.status(404).send("Product not found");
    }
  });
  



app.listen(5000, () => {
  console.log("server is running on port 5000");
});
