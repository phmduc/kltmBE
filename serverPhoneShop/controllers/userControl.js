import asyncHandle from "express-async-handler";
import User from "../models/userModels.js";
const userController = {
  getAllUser: asyncHandle(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  }),
  // getSingleProduct : asyncHandle(async (req, res) => {
  //     const product = await Product.findById(req.params.id);
  //     if(product){
  //         res.json(product);
  //     }
  //     else{
  //         res.status(404);
  //         throw new Error("Product not found");
  //     }
  //     }),
  // getAllProduct : asyncHandle(async (req, res) => {
  //         const products = await Product.find({});
  //         res.json(products);
  //     }),
  // getSingleProduct : asyncHandle(async (req, res) => {
  //     const product = await Product.findById(req.params.id);
  //     if(product){
  //         res.json(product);
  //     }
  //     else{
  //         res.status(404);
  //         throw new Error("Product not found");
  //     }
  //     }),
  // addProduct : asyncHandle(async (req, res) => {
  //    const { name , image, desc, price ,countInStock } = req.body;
  //    const productExist = await Product.findOne({name})
  //    if(productExist){
  //        res.status(400);
  //        throw new Error("Product name already exist");
  //    }
  //    else{
  //    const product = new Product({
  //        name,
  //        image,
  //        desc,
  //        price,
  //        countInStock
  //    });
  //    if(product){
  //        const createdproduct = await product.save()
  //        res.status(201).json(createdproduct);
  //    }
  //    else{
  //        res.status(400);
  //        throw new Error("Invalid Product");
  //    }
  //     }}),
  updateUser: asyncHandle(async (req, res) => {
    const { name, isAdmin, isVerify } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      if (name) {
        user.name = name;
      }
      if (isAdmin) {
        user.isAdmin = isAdmin;
      }
      if (name) {
        user.isVerify = isVerify;
      }

      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  }),
  verifyUser: asyncHandle(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      user.isVerify = true;
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(400);
      throw new Error("Invalid User");
    }
  }),
  deleteUser: asyncHandle(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
      await user.deleteOne();
      res.json("xoa thanh cong");
    } else {
      res.status(400);
      throw new Error("Not Found User");
    }
  }),
  // deleteProduct : asyncHandle(async (req, res) => {
  //     const product = await Product.findById(req.params.id);
  //     if(product){
  //         await product.deleteOne();
  //         res.json("xoa thanh cong")
  //     }
  //     else{
  //         res.status(400);
  //         throw new Error("Not Found Product")
  //     }
  //     }),
};

export default userController;
