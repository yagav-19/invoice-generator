import axios from "axios";
import { useState } from "react";
import ProductRow from "./ProductRow";

function InvoiceForm({ onGenerate }) {
  const [customer, setCustomer] = useState("");
  const [products, setProducts] = useState([
    { name: "", qty: 1, price: 0 },
  ]);

  const [loading, setLoading] = useState(false);

  const updateProduct = (index, field, value) => {
    if ((field === "qty" || field === "price") && Number(value) < 0) return;
    const updated = [...products];
    updated[index][field] = value;
    setProducts(updated);
  };

  const addProduct = () => {
    setProducts([...products, { name: "", qty: 1, price: 0 }]);
  };

  const removeProduct = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  const totalQty = products.reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );

  const totalPrice = products.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const generateInvoice = async () => {
    // 1. Validation
    if (!customer.trim()) {
      alert("⚠️ Please enter a Customer Name.");
      return;
    }
    if (products.some(p => !p.name.trim() || p.qty <= 0)) {
      alert("⚠️ Please fill in all product details (Name and Qty > 0).");
      return;
    }

    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await axios.post(`${API_URL}/api/invoice`, {
        customer,
        products,
      });
      console.log("Invoice created:", response.data);
      onGenerate({ customer, products });
    } catch (error) {
      console.error("Error creating invoice:", error);
      alert(`Error! Could not save invoice.\n\nDetails: ${error.response?.data?.error || error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (

    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-sans text-transparent bg-clip-text bg-gradient-to-r from-slate-800 to-slate-500">
          Create Invoice
        </h2>
        <div className="h-px bg-gradient-to-r from-solar-blue/30 to-transparent flex-grow ml-4"></div>
      </div>

      <div className="group">
        <label className="block text-xs font-mono text-solar-blue mb-1 uppercase tracking-wider">Customer Name</label>
        <input
          type="text"
          placeholder="Enter Client Name..."
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full bg-white border border-slate-200 text-slate-800 p-3 rounded-lg focus:border-solar-blue focus:ring-1 focus:ring-solar-blue outline-none transition-all placeholder:text-slate-400 font-sans shadow-sm"
        />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-xs font-mono text-slate-400 uppercase tracking-widest px-1">
          <span className="w-5/12">Item</span>
          <span className="w-2/12 text-center">Qty</span>
          <span className="w-3/12 text-center">Price</span>
          <span className="w-2/12 text-right">Action</span>
        </div>
        {products.map((product, index) => (
          <ProductRow
            key={index}
            product={product}
            index={index}
            updateProduct={updateProduct}
            removeProduct={removeProduct}
          />
        ))}
      </div>

      <button
        onClick={addProduct}
        className="w-full py-2 border border-dashed border-slate-300 text-slate-400 rounded-lg hover:border-solar-blue hover:text-solar-blue hover:bg-solar-blue/5 transition-all duration-300 font-mono text-sm uppercase flex items-center justify-center gap-2"
      >
        <span>+</span> Add Item
      </button>

      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={generateInvoice}
          disabled={loading}
          className={`w-full bg-gradient-to-r from-solar-blue to-solar-purple text-white font-bold uppercase tracking-wider py-4 rounded-lg shadow-lg hover:shadow-glow-light transition-all transform ${loading ? 'opacity-75 cursor-wait' : 'hover:translate-y-[-2px] hover:scale-[1.01] active:translate-y-[0px]'}`}
        >
          {loading ? "Generating & Saving..." : `Generate Holographic Invoice (${totalQty} items – ₹{totalPrice})`}
        </button>
      </div>
    </div>
  );


}

export default InvoiceForm;
