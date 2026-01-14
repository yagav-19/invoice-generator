import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Invoice from "./models/Invoice.js";

dotenv.config();

// ✅ CREATE APP FIRST
const app = express();

// ✅ MIDDLEWARE
app.use(cors());
app.use(express.json());

// ✅ CONNECT MONGODB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Local Connected"))
  .catch((err) => console.log("MongoDB Error:", err));

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ✅ SAVE INVOICE
app.post("/api/invoice", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json({ message: "Invoice saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL INVOICES
app.get("/api/invoice", async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ START SERVER
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
