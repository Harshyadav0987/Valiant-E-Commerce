const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
  },
  products: [
    { 
        type: Schema.Types.ObjectId,
        ref: "Product" 
    }
  ],
  contact: {
    type: String,
    required: true,
    match: [/^[0-9]{10}$/, "Please enter a valid 10-digit phone number"],
  },
  address: {
    type: String,
    required: true,
  },
  upi: {
    type: String,
    required: true,
    match: [/^[\w.-]+@[\w.-]+$/, "Please enter a valid UPI ID"],
  },
  approved_status: {
    type: Boolean,
    default: false,
  }
});

const Vendor = mongoose.model("Vendor", vendorSchema);
module.exports = Vendor;
