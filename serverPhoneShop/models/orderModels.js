import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Product",
  },
  count: { type: Number, required: true },
  name: { type: String, required: true },
  sizeId: { type: String, required: true },
  price: { type: Number, required: true },
});

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: { type: String, required: true },
    orderItems: [orderItemSchema],
    address: {
      addressDetail: { type: String, required: true },
      city: { type: String, required: true },
      district: { type: String, required: true },
      ward: { type: String, required: true },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: "Paypal",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCancel: {
      type: Boolean,
      required: true,
      default: false,
    },
    isVerify: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
