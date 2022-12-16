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
    const {
      user,
      name,
      orderItems,
      address,
      paymentMethod,
      totalPrice,
      img,
      date,
      x,
    } = req.body;
    let isPaid = true;
    if (paymentMethod === "COD") {
      isPaid = false;
    }
    const order = new Order({
      user,
      name,
      orderItems,
      address,
      isPaid,
      paymentMethod,
      totalPrice,
      img,
      date,
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
  deliveredOrder: asyncHandle(async (req, res) => {
    const order = await Order.findById(req.params.id);
    const { bool } = req.body;
    if (order) {
      order.isDelivered = bool;
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      res.status(400);
      throw new Error("Invalid Order");
    }
  }),
  cancelOrder: asyncHandle(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isCancel = true;
      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    } else {
      res.status(400);
      throw new Error("Invalid Order");
    }
  }),
  deleteOrder: asyncHandle(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      await order.deleteOne();
      res.json("xoa thanh cong");
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
  getOrderByUser: asyncHandle(async (req, res) => {
    const { userId } = req.body;
    const orders = await Order.find({ user: userId });
    if (orders) {
      res.json(orders);
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
  getOrderByDate: asyncHandle(async (req, res) => {
    const { fromDate, toDate } = req.body;
    const orders = await Order.find({});
    if (orders) {
      const sortOrders = orders.filter((elem, index) => {
        const currentday = new Date(
          Number(elem.date.split("@")[0].split("/")[2]),
          Number(elem.date.split("@")[0].split("/")[1]) - 1,
          Number(elem.date.split("@")[0].split("/")[0]) + 1
        );
        return (
          Number(currentday) >= Number(new Date(fromDate)) &&
          Number(currentday) <= Number(new Date(toDate)) &&
          elem.isPaid === true
        );
      });
      let soldProduct = [];
      sortOrders.forEach((elem, index) => {
        elem.orderItems.forEach((item, index) => {
          if (soldProduct.length === 0) {
            soldProduct.push({
              id: item.id,
              count: item.count,
              name: item.name,
              total: item.price,
            });
          } else {
            if (
              soldProduct.find((el) => {
                return el.id.equals(item.id);
              })
            ) {
              soldProduct[
                soldProduct.findIndex((el) => el.id.equals(item.id))
              ].count += item.count;
              soldProduct[
                soldProduct.findIndex((el) => el.id.equals(item.id))
              ].total += item.price;
            } else {
              soldProduct.push({
                id: item.id,
                count: item.count,
                name: item.name,
                total: item.price,
              });
            }
          }
        });
      });

      res.json({
        sortOrders,
        soldestProduct: soldProduct.reduce((max, min) =>
          max.count > min.count ? max : min
        ),
      });
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
  getOrderByYear: asyncHandle(async (req, res) => {
    const { year } = req.body;
    const orders = await Order.find({});
    if (orders) {
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
      const sortOrders = orders.filter((elem, index) => {
        return (
          Number(elem.date.split("@")[0].split("/")[2]) === year &&
          elem.isPaid === true
        );
      });
      sortOrders.forEach((elem) => {
        data.map((month, index) => {
          if (Number(elem.date.split("@")[0].split("/")[1]) - 1 === index) {
            month.total += elem.totalPrice;
          }
        });
      });
      res.json(data);
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
  getBestSeller: asyncHandle(async (req, res) => {
    const { year } = req.body;
    const orders = await Order.find({});
    if (orders) {
      const sortOrders = orders.filter((elem, index) => {
        return (
          Number(elem.date.split("@")[0].split("/")[2]) === year &&
          elem.isPaid === true
        );
      });
      let soldProduct = [];
      sortOrders.forEach((elem, index) => {
        elem.orderItems.forEach((item, index) => {
          if (soldProduct.length === 0) {
            soldProduct.push({
              id: item.id,
              count: item.count,
              name: item.name,
              total: item.price,
              img: item.img,
            });
          } else if (soldProduct.length <= 5) {
            if (
              soldProduct.find((el) => {
                return el.id.equals(item.id);
              })
            ) {
              soldProduct[
                soldProduct.findIndex((el) => el.id.equals(item.id))
              ].count += item.count;
              soldProduct[
                soldProduct.findIndex((el) => el.id.equals(item.id))
              ].total += item.price;
            } else {
              soldProduct.push({
                id: item.id,
                count: item.count,
                name: item.name,
                total: item.price,
                img: item.img,
              });
            }
          }
        });
      });
      res.json(soldProduct);
    } else {
      res.status(400);
      throw new Error("Not Found Order");
    }
  }),
};

export default orderController;
