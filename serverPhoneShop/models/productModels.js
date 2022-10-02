import mongoose from "mongoose";

const reviewSchema  = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
})
 
const sizeSchema  = mongoose.Schema({
    sizeId:{
        type: String,
        required: true,
    },
    count:{
        type: Number,
        default: 0,
        required: true,
    }
})
 
const productSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true,
    },
    desc:{
        type: String,
        required: true,
    },
    reviews:[reviewSchema],
    size:[sizeSchema],
    price:{
        type: Number,
        required: true
    },
},
{
    timestamps: true,
})

const Product = mongoose.model("Product",productSchema)

export default Product