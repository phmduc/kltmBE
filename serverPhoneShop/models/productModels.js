import mongoose from "mongoose";
import moment from "moment-timezone";
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
const historySchema = mongoose.Schema({
  sizeId: {
    type: String,
  },
  date: {
    type: String,
  },
  status: {
    type: Number,
  },
  oldCount: {
    type: Number,
  },
  number: {
    type: Number,
  },
  newCount: {
    type: Number,
  },
  fromOrder: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
});
const votingSchema = mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  starVote: {
    type: Number,
    required: true,
  },
  created: {
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
    vote: [votingSchema],
    historyUpdate: [historySchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
