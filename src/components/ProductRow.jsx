function ProductRow({ product, index, updateProduct, removeProduct }) {
  return (
    <div className="flex gap-2 items-center group animate-fade-in-left">
      <input
        type="text"
        placeholder="Product Name"
        value={product.name}
        onChange={(e) => updateProduct(index, "name", e.target.value)}
        className="w-5/12 bg-white border border-slate-200 text-slate-800 p-2 rounded focus:border-solar-purple focus:ring-1 focus:ring-solar-purple outline-none transition-all placeholder:text-slate-400 font-sans shadow-sm"
      />

      <input
        type="number"
        min="0"
        placeholder="0"
        value={product.qty}
        onChange={(e) => updateProduct(index, "qty", e.target.value)}
        className="w-2/12 bg-white border border-slate-200 text-slate-800 p-2 rounded text-center focus:border-solar-blue focus:ring-1 focus:ring-solar-blue outline-none transition-all shadow-sm"
      />

      <input
        type="number"
        min="0"
        placeholder="0.00"
        value={product.price}
        onChange={(e) => updateProduct(index, "price", e.target.value)}
        className="w-3/12 bg-white border border-slate-200 text-slate-800 p-2 rounded text-right focus:border-solar-blue focus:ring-1 focus:ring-solar-blue outline-none transition-all shadow-sm"
      />

      <button
        onClick={() => removeProduct(index)}
        className="w-2/12 h-10 flex items-center justify-center border border-red-200 text-red-400 rounded hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-all"
      >
        ✕
      </button>
    </div>

  );
}

export default ProductRow;
