import mongoose from "mongoose";

const sizeSchema = mongoose.Schema({
  sizeId: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});
const imgSchema = mongoose.Schema({
  publicId: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: [imgSchema],
    desc: {
      type: String,
    },
    idCate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    size: [sizeSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
