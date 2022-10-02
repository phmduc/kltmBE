import express from "express";
import User from "./models/userModels.js"
import {users} from "./data/user.js"
import Product from "./models/productModels.js"
import {products} from "./data/products.js"
import asyncHandle from "express-async-handler"
const ImportData = express.Router();


ImportData.post("/users", asyncHandle( async (req, res) => {
    await User.remove({});
    const importUser= await User.insertMany(users);
    res.send({importUser});
}))

ImportData.post("/products", asyncHandle( async (req, res) => {
    await Product.remove({});
    const importProducts= await Product.insertMany(products);
    res.send({importProducts});
}))

export default ImportData;