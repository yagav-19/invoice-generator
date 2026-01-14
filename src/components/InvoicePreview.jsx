function InvoicePreview({ data }) {
  const gstRate = 0.18;

  const subtotal = data.products.reduce(
    (sum, item) => sum + item.qty * item.price,
    0
  );

  const gst = subtotal * gstRate;
  const total = subtotal + gst;

  return (
    <div className="bg-white p-8 rounded-lg border border-slate-100 shadow-xl animate-fade-in font-mono relative overflow-hidden">
      {/* Decorative top pattern */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-solar-blue to-solar-purple"></div>

      <div className="flex justify-between items-start mb-8 pb-6 border-b border-dashed border-slate-200">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-1 tracking-tight">INVOICE RECEIPT</h2>
          <p className="text-xs text-slate-400 uppercase tracking-widest">ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-solar-blue uppercase font-bold">Billed To</p>
          <p className="text-lg font-bold text-slate-700">{data.customer}</p>
        </div>
      </div>

      <div className="mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-400 uppercase tracking-widest border-b border-slate-100">
              <th className="text-left py-3 font-medium">Item Description</th>
              <th className="text-center py-3 font-medium">Qty</th>
              <th className="text-right py-3 font-medium">Price</th>
              <th className="text-right py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {data.products.map((item, index) => (
              <tr key={index} className="text-slate-600 hover:bg-slate-50 transition-colors">
                <td className="py-3 font-medium">{item.name}</td>
                <td className="py-3 text-center">{item.qty}</td>
                <td className="py-3 text-right">₹{item.price}</td>
                <td className="py-3 text-right text-solar-blue font-semibold">
                  ₹{item.qty * item.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mb-8">
        <div className="w-1/2 space-y-2">
          <div className="flex justify-between text-slate-500 text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-sm">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-slate-200 mt-2">
            <span className="text-slate-800 font-bold">GRAND TOTAL</span>
            <span className="text-2xl font-bold text-solar-purple">
              ₹{total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={() => window.print()}
        className="w-full bg-slate-50 border border-slate-200 hover:bg-white hover:border-solar-blue hover:text-solar-blue text-slate-600 py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group shadow-sm hover:shadow-md"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">🖨</span>
        <span className="text-sm font-bold uppercase tracking-widest">Print Receipt</span>
      </button>
    </div>
  );
}

export default InvoicePreview;
