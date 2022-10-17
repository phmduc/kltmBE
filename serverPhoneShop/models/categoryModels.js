import mongoose from "mongoose";


const avatarSchema  = mongoose.Schema({
    publicId:{
        type: String,
        required: true,
    },
    url:{
        type: String,
        required: true,
    }
})
const orderSchema  = mongoose.Schema({
    nameCate: {
        type: String,
        required: true,
    },
    avatarCate:[avatarSchema]
    },
    {
        timestamps: true,
    })
    
 

const Category = mongoose.model("Category",orderSchema)

export default Category