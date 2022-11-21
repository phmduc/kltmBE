import express from "express";
import asyncHandle from "express-async-handler";
import Order from "../models/orderModels.js";
import orderController from "../controllers/orderControl.js";

const orderRoutes = express.Router();

//get all product
orderRoutes.get("/", orderController.getAllOrder);

//get single product
// add Order
orderRoutes.post("/", orderController.createOrder);

// update Product
// delete product

export default orderRoutes;
