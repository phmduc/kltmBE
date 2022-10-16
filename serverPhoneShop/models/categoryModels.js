import mongoose from "mongoose";

const orderSchema  = mongoose.Schema({
    nameCate: {
        type: String,
        required: true,
    },
    avatarCate: {
        type: String,
        required: true,
    },
    },
    {
        timestamps: true,
    })
    
 

const Category = mongoose.model("Category",orderSchema)

export default Category