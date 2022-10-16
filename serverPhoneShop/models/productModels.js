import mongoose from "mongoose";

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
    Cate:{
        idCate: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"Category"},
        nameCate: {
            type: String,
            required: true,}
    }
    ,
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