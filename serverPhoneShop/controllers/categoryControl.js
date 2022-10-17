import asyncHandle from "express-async-handler";
import Category from "../models/categoryModels.js";
const categoryController = {
    getAllCategory : asyncHandle(async (req, res) => {
        try{
            const category = await Category.find({});
            res.json(category);
        }catch(error){
            throw new Error("Not Found List Category")
        }
           
        }),
    getSingleCategory : asyncHandle(async (req, res, next) => {
        try{
        const category = await Category.findById(req.params.id);
        res.json(category)
        }
        catch(error){
           throw new Error("Category Not Found")
        }}
        ),
    addCategory : asyncHandle(async (req, res) => {
       const {  nameCate, avatarCate  } = req.body; 
       console.log(req.body)
       const categoryExist = await Category.findOne({nameCate})
       if(categoryExist){
           res.status(400);
           throw new Error("Category already exist");
       }
       else{
       const category = new Category({
        nameCate,
        avatarCate 
       });
       if(category){
           const createdCategory = await category.save()
           res.status(201).json(createdCategory);
       }
       else{
           res.status(400);
           throw new Error("Invalid Category");
       }
        }}),
    updateCategory : asyncHandle(async (req, res) => {
        const { nameCate, avatarCate } = req.body; 
        const category = await Category.findById(req.params.id);
        if(category){
            category.nameCate=nameCate;
            category.avatarCate= avatarCate;
            const updatedCategory = await category.save();
            res.json(updatedCategory);   
        }
        else{
            res.status(400);
            throw new Error("Invalid Category Data")
        }
        }),
    deleteCategory : asyncHandle(async (req, res) => {
        const category = await Category.findById(req.params.id);
        if(category){
            await category.deleteOne();
            res.json("xoa thanh cong")
        }
        else{
            res.status(400);
            throw new Error("Not Found Category")
        }
        }),
}

export default categoryController