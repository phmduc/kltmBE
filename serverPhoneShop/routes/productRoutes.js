import express from "express";
import asyncHandle from "express-async-handler";
import Product from "../models/productModels.js";
import productController from "../controllers/productControl.js";

const productRoutes = express.Router();

//get all product
productRoutes.get("/", productController.getAllProduct);
//get four newest product
productRoutes.get("/four", productController.getFourNewestProduct);
//get eight  product
productRoutes.get("/eight", productController.getEightProduct);
//get single product
productRoutes.get("/:id", productController.getSingleProduct);
// add Product
productRoutes.post("/", productController.addProduct);
// update Product
productRoutes.put("/:id", productController.updateProduct);
// update Size
productRoutes.put("/size/:id", productController.updateSize);
// delete Size
productRoutes.put("/size/delete/:id", productController.deleteSize);
// delete product
productRoutes.delete("/:id", productController.deleteProduct);
// addcomment
productRoutes.put("/comment/:id", productController.addComment);
// updateQuantily
productRoutes.put("/updateqtt/:id", productController.updateQuantity);

export default productRoutes;
