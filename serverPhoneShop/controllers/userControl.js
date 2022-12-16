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
        console.log(isAdmin);
        user.isAdmin = true;
      } else {
        user.isAdmin = false;
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
  getUserByDate: asyncHandle(async (req, res) => {
    const { fromDate, toDate } = req.body;
    const Users = await User.find({});
    if (Users) {
      const sortUsers = Users.filter((elem, index) => {
        const currentday = new Date(
          Number(elem.date.split("@")[0].split("/")[2]),
          Number(elem.date.split("@")[0].split("/")[1]) - 1,
          Number(elem.date.split("@")[0].split("/")[0]) + 1
        );
        return (
          Number(currentday) >= Number(new Date(fromDate)) &&
          Number(currentday) <= Number(new Date(toDate))
        );
      });
      res.json(sortUsers);
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
  getUserByYear: asyncHandle(async (req, res) => {
    const { year } = req.body;
    const Users = await User.find({});
    if (Users) {
      const data = [
        {
          name: "Jan",
          total: 0,
        },
        {
          name: "Feb",
          total: 0,
        },
        {
          name: "Mar",
          total: 0,
        },
        {
          name: "Apr",
          total: 0,
        },
        {
          name: "May",
          total: 0,
        },
        {
          name: "Jun",
          total: 0,
        },
        {
          name: "Jul",
          total: 0,
        },
        {
          name: "Aug",
          total: 0,
        },
        {
          name: "Sep",
          total: 0,
        },
        {
          name: "Oct",
          total: 0,
        },
        {
          name: "Nov",
          total: 0,
        },
        {
          name: "Dec",
          total: 0,
        },
      ];
      const sortUsers = Users.filter((elem, index) => {
        return Number(elem.date.split("@")[0].split("/")[2]) === year;
      });
      sortUsers.forEach((elem) => {
        data.map((month, index) => {
          if (Number(elem.date.split("@")[0].split("/")[1]) - 1 === index) {
            month.total += 1;
          }
        });
      });
      res.json(data);
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
};

export default userController;
