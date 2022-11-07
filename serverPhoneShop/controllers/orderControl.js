import asyncHandle from "express-async-handler";
import Order from "../models/orderModels";
const orderController = {
  getAllOrder: asyncHandle(async (req, res) => {
    try {
      const orders = await Order.find({});
      res.json(orders);
    } catch (error) {
      throw new Error("Not Found List Order");
    }
  }),
  //   getSingleProduct: asyncHandle(async (req, res, next) => {
  //     try {
  //       const product = await Product.findById(req.params.id);
  //       res.json(product);
  //     } catch (error) {
  //       throw new Error("Product Not Found");
  //     }
  //   }),
  //   getProductByCategory: asyncHandle(async (req, res, next) => {
  //     try {
  //       const product = await Product.find({ category });
  //       res.json(product);
  //     } catch (error) {
  //       throw new Error("Product Not Found");
  //     }
  //   }),
  createOrder: asyncHandle(async (req, res) => {
    const { user, orderItem, address, paymentMethod, totalPrice, isPaid } =
      req.body;
    const order = new Order({
      user,
      orderItem,
      address,
      paymentMethod,
      totalPrice,
      isPaid,
    });
    if (order) {
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      res.status(400);
      throw new Error("Invalid Order");
    }
  }),
  //   updateProduct: asyncHandle(async (req, res) => {
  //     const { name, image, desc, cate, size } = req.body;
  //     const product = await Product.findById(req.params.id);
  //     if (product) {
  //       product.name = name;
  //       product.cate = cate;
  //       product.desc = desc;
  //       product.image = image;
  //       product.size = size;
  //       const updatedProduct = await product.save();
  //       res.json(updatedProduct);
  //     } else {
  //       res.status(400);
  //       throw new Error("Invalid Product Data");
  //     }
  //   }),
  //   deleteProduct: asyncHandle(async (req, res) => {
  //     const product = await Product.findById(req.params.id);
  //     if (product) {
  //       await product.deleteOne();
  //       res.json("xoa thanh cong");
  //     } else {
  //       res.status(400);
  //       throw new Error("Not Found Product");
  //     }
  //   }),
};

export default productController;
