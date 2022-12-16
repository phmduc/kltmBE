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
//Delivered
orderRoutes.put("/delivered/:id", orderController.deliveredOrder);
//cancel
orderRoutes.put("/cancel/:id", orderController.cancelOrder);
// delete Order
orderRoutes.delete("/:id", orderController.deleteOrder);
// get order by user
orderRoutes.post("/user", orderController.getOrderByUser);
// get order by date
orderRoutes.post("/date", orderController.getOrderByDate);
// get order by year
orderRoutes.post("/year", orderController.getOrderByYear);
// get bestseller by year
orderRoutes.post("/bestseller/year", orderController.getBestSeller);
export default orderRoutes;
