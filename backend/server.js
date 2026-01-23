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
// ✅ CONNECT MONGODB
// ✅ CONNECT MONGODB & START SERVER
if (!process.env.MONGO_URI) {
  console.error("❌ FATAL ERROR: MONGO_URI is missing in environment variables!");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");
    // Only start server if DB connects
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ✅ SAVE INVOICE
// ✅ SAVE INVOICE
app.post("/api/invoice", async (req, res) => {
  console.log("📥 Received Invoice Data:", req.body); // DEBUG LOG
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
