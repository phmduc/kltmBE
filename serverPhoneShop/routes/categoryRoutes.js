import express from "express";
import asyncHandle from "express-async-handler";
import Category from "../models/categoryModels.js";
import categoryController from "../controllers/categoryControl.js";

const categoryRoutes = express.Router();

//get all product
categoryRoutes.get("/" , categoryController.getAllCategory)
//get single category
categoryRoutes.get("/:id" , categoryController.getSingleCategory)
// add category
categoryRoutes.post("/" , categoryController.addCategory)
// update category
categoryRoutes.put("/:id" , categoryController.updateCategory)
// delete category
categoryRoutes.delete("/:id" , categoryController.deleteCategory)


export default categoryRoutes