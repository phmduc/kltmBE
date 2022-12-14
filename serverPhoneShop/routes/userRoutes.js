import express from "express";
import asyncHandle from "express-async-handler";
import User from "../models/userModels.js";
import userController from "../controllers/userControl.js";
import generateToken from "../utils/generateToken.js";
import protect from "../middleware/authMiddleware.js";

const userRoutes = express.Router();

//get all product
userRoutes.get("/", userController.getAllUser);

userRoutes.put("/:id", userController.updateUser);

userRoutes.put("/verify/:id", userController.verifyUser);

userRoutes.delete("/:id", userController.deleteUser);

//get user by date
userRoutes.post("/date", userController.getUserByDate);
userRoutes.post("/year", userController.getUserByYear);

//register
userRoutes.post(
  "/register",
  asyncHandle(async (req, res) => {
    const { name, email, password, date } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
    const user = await User.create({
      name,
      email,
      password,
      date,
    });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        isVerify: user.isVerify,
        token: generateToken(user._id),
      });
      sendmail(user._id);
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
      if (user.isLock === 0)
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isVerify: user.isVerify,
          token: generateToken(user._id),
          createdAt: user.createdAt,
        });
      else {
        res.status(401);
        throw new Error("Tài khoản của bạn đã bị khóa");
      }
    } else {
      res.status(401);
      throw new Error("Sai Tài Khoản hoặc Mật Khẩu");
    }
  })
);

//user ChangePass
userRoutes.put(
  "/changepass/:id",
  asyncHandle(async (req, res) => {
    const { email, password, newPass } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (user && (await user.matchPass(password))) {
      user.password = newPass;
      const passUser = await user.save();
      res.json(passUser);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  })
);

//user ChangePass
userRoutes.put(
  "/changeforgetpass",
  asyncHandle(async (req, res) => {
    const { email, newPass } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.password = newPass;
      const passUser = await user.save();
      res.json(passUser);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  })
);

//user ChangePass forget
userRoutes.put(
  "/repass/:id",
  asyncHandle(async (req, res) => {
    const { newPass } = req.body;
    const user = await User.findById(req.params.id);
    if (user) {
      user.password = newPass;
      const passUser = await user.save();
      res.json(passUser);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  })
);

//user Checkmail
userRoutes.get(
  "/forgetpass/:email",
  asyncHandle(async (req, res) => {
    const email = req.params.email;
    const user = await User.findOne({ email });
    if (user) {
      res.json(user);
    } else {
      res.status(400);
      throw new Error("Mail chưa đăng ký");
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
