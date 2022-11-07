import express from "express";
import asyncHandle from "express-async-handler";
import User from "../models/userModels.js";
import userController from "../controllers/userControl.js";
import generateToken from "../utils/generateToken.js";
import protect from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

//get all product
userRoutes.get("/", userController.getAllUser);

//register
userRoutes.post(
  "/register",
  asyncHandle(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  })
);

//login
userRoutes.post(
  "/login",
  asyncHandle(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPass(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        createdAt: user.createdAt,
      });
    } else {
      res.status(401);
      throw new Error("Wrong email or password");
    }
  })
);

//user Profile
userRoutes.get(
  "/profile",
  protect,
  asyncHandle(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      const profile = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt,
      };
      res.json(profile);
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  })
);

//userImage
userRoutes.post("/", async (req, res) => {
  try {
    const file = req.body.file;

    cloudinary.v2.uploader.upload(
      file,
      { folder: "userImg" },
      (err, result) => {
        if (err) throw err;
        res.json(result);
      }
    );
  } catch (err) {
    res.status(500).json("Oops, Error!");
  }
});

export default userRoutes;
