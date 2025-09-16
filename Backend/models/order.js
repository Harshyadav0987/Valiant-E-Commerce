const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      quantity: { type: Number, required: true, min: 1 },
    }
  ],
  total_amount: {
    type: Number,
    required: true,
    min: 0,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  payment_mode: {
    type: String,
    enum: ["COD", "UPI", "CARD", "NETBANKING"],
    required: true,
  },
  placed_at: {
    type: Date,
    default: Date.now,
  },
  delivery_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  }
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
