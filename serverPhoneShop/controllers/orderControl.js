import asyncHandle from "express-async-handler";
import Order from "../models/orderModels.js";
const orderController = {
  getAllOrder: asyncHandle(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      throw new Error("Not Found List Order");
    }
  }),

  createOrder: asyncHandle(async (req, res) => {
    const { user, name, orderItems, address, paymentMethod, totalPrice } =
      req.body;
    const order = new Order({
      user,
      name,
      orderItems,
      address,
      paymentMethod,
      totalPrice,
    });
    if (order) {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      res.status(400);
      throw new Error("Invalid Order");
    }
  }),
  verifyOrder: asyncHandle(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isVerify = true;
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      res.status(400);
      throw new Error("Invalid Order");
    }
  }),
};

export default orderController;
