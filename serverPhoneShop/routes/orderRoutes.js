import express from "express";
import asyncHandle from "express-async-handler";
import Order from "../models/orderModels.js";
import orderController from "../controllers/orderControl.js";

const orderRoutes = express.Router();

//get all product
orderRoutes.get("/", orderController.getAllOrder);
// add Order
orderRoutes.post("/", orderController.createOrder);
//Verify
orderRoutes.put("/:id", orderController.verifyOrder);
//cancel
orderRoutes.put("/cancel/:id", orderController.cancelOrder);
// delete Order
orderRoutes.delete("/:id", orderController.deleteOrder);
// get order by user
orderRoutes.get("/user", orderController.getOrderByUser);

export default orderRoutes;
