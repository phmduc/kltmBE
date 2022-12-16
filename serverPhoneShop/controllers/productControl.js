import asyncHandle from "express-async-handler";
import Product from "../models/productModels.js";
const productController = {
  getAllProduct: asyncHandle(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json(products);
    } catch (error) {
      throw new Error("Not Found List Product");
    }
  }),
  getEightProduct: asyncHandle(async (req, res) => {
    try {
      const products = await Product.find({});
      const list = products.filter((elem, index) => {
        if (index + 1 < 9) {
          return elem;
        } else {
          return;
        }
      });
      res.json(list);
    } catch (error) {
      throw new Error("Not Found List Product");
    }
  }),
  getFourNewestProduct: asyncHandle(async (req, res) => {
    try {
      const products = await Product.find({});
      const list = products.reverse().filter((elem, index) => {
        if (index + 1 < 5) {
          return elem;
        } else {
          return;
        }
      });
      res.json(list);
    } catch (error) {
      throw new Error("Not Found List Product");
    }
  }),
  getSingleProduct: asyncHandle(async (req, res, next) => {
    try {
      const product = await Product.findById(req.params.id);
      res.json(product);
    } catch (error) {
      throw new Error("Product Not Found");
    }
  }),
  getProductByCategory: asyncHandle(async (req, res, next) => {
    try {
      const product = await Product.find({ category });
      res.json(product);
    } catch (error) {
      throw new Error("Product Not Found");
    }
  }),
  addProduct: asyncHandle(async (req, res) => {
    const { name, image, idCate, desc, size } = req.body;
    const productExist = await Product.findOne({ name });
    console.log(image);
    if (productExist) {
      res.status(400);
      throw new Error("Product name already exist");
    } else {
      const product = new Product({
        name,
        image,
        idCate,
        desc,
        size,
      });
      console.log(product);
      if (product) {
        const createdproduct = await product.save();
        res.status(201).json(createdproduct);
      } else {
        res.status(400);
        throw new Error("Invalid Product");
      }
    }
  }),
  updateProduct: asyncHandle(async (req, res) => {
    const { name, image, desc, cate, size } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
      product.name = name;
      product.cate = cate;
      product.desc = desc;
      product.image = image;
      product.size = size;
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  }),
  deleteProduct: asyncHandle(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.json("xoa thanh cong");
    } else {
      res.status(400);
      throw new Error("Not Found Product");
    }
  }),
  addComment: asyncHandle(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      const { vote } = req.body;
      product.vote = [vote, ...product.vote];
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  }),
  updateQuantity: asyncHandle(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const { sizeId, count } = req.body;
    if (product) {
      product.size.map((elem, index) => {
        if (elem.sizeId === sizeId) {
          elem.count -= count;
        }
      });
      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(400);
      throw new Error("Invalid Product Data");
    }
  }),
};

export default productController;
