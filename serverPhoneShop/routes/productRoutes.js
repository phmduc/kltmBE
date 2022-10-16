import express from "express";
import asyncHandle from "express-async-handler";
import Product from "../models/productModels.js";
import productController from "../controllers/productControl.js";

const productRoutes = express.Router();

//get all product
productRoutes.get("/" , productController.getAllProduct)
//get single product
productRoutes.get("/:id" , productController.getSingleProduct)
// add Product
productRoutes.post("/" , productController.addProduct)
// update Product
productRoutes.put("/:id" , productController.updateProduct)
// delete product
productRoutes.delete("/:id" , productController.deleteProduct)


export default productRoutes