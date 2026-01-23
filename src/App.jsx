import { useState } from "react";
import InvoiceForm from "./components/InvoiceForm";
import InvoicePreview from "./components/InvoicePreview";

function App() {
  const [invoiceData, setInvoiceData] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-8 relative overflow-hidden bg-bright-bg text-slate-800 font-sans selection:bg-solar-blue selection:text-white">
      {/* Background Glow Effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-solar-purple/10 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-solar-blue/10 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

      {/* Floating particles or tech elements could go here */}

      <div className="relative w-full max-w-5xl z-10 transition-all duration-500">
        <div className="bg-glass-light backdrop-blur-3xl border border-white/40 p-8 md:p-12 rounded-3xl shadow-card-float relative overflow-hidden group">

          {/* Subtle gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-solar-blue/5 to-solar-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

          <h1 className="text-4xl md:text-6xl font-bold text-center mb-10 tracking-tight font-sans">
            <span className="bg-gradient-to-r from-solar-blue via-slate-800 to-solar-purple bg-clip-text text-transparent drop-shadow-sm">
               INVOICE GENERATOR
            </span>
            
          </h1>

          <div className="relative z-10">
            {!invoiceData ? (
              <InvoiceForm onGenerate={setInvoiceData} />
            ) : (
              <InvoicePreview data={invoiceData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
