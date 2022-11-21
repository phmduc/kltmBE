import asyncHandle from "express-async-handler";
import User from "../models/userModels.js";
const userController = {
  getAllUser: asyncHandle(async (req, res) => {
    const users = await User.find({});
    res.json(users);
  }),

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
};

export default userController;
