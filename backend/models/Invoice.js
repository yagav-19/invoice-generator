import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customer: {
    type: String,
    required: true,
  },
  products: [
    {
      name: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Invoice = mongoose.model("Invoice", invoiceSchema);

export default Invoice;
