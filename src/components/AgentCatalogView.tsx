import React, { useState } from 'react';
import { 
  FileCode, 
  Copy, 
  Check, 
  ShieldCheck, 
  Terminal
} from 'lucide-react';
import type { AgentProtocolCatalog, Product } from '../types';

interface Props {
  protocol: AgentProtocolCatalog;
  catalog: Product[];
}

export const AgentCatalogView: React.FC<Props> = ({ protocol, catalog }) => {
  const [copied, setCopied] = useState(false);
  const [activeEndpoint, setActiveEndpoint] = useState<'wellknown' | 'catalog' | 'x402'>('wellknown');

  const jsonWellKnown = {
    "$schema": "https://agentic-commerce.org/schemas/v1.2/manifest.json",
    "protocol": protocol.protocolVersion,
    "uap_specification": protocol.uapVersion,
    "merchant_identity": {
      "id": protocol.merchantId,
      "name": protocol.merchantName,
      "razorpay_mode": protocol.razorpayMode,
      "supported_currencies": protocol.supportedCurrencies
    },
    "endpoints": {
      "catalog": "https://nexus.store/api/agent/catalog.json",
      "create_order": "https://nexus.store/api/razorpay/create-order",
      "verify_payment": "https://nexus.store/api/razorpay/verify-signature"
    },
    "capabilities": protocol.capabilities,
    "negotiation_rules": {
      "allow_agent_discount": true,
      "max_discount_cap": "25%",
      "bounded_safety_gate": "ENFORCED"
    }
  };

  const jsonCatalogData = {
    "version": "1.2",
    "updated_at": new Date().toISOString(),
    "items_count": catalog.length,
    "products": catalog.map(p => ({
      "sku": p.acpSchema.sku,
      "title": p.title,
      "category": p.category,
      "base_price": p.basePrice,
      "currency": p.acpSchema.currency,
      "tags": p.tags,
      "uap_compliant": p.acpSchema.uapCompliant,
      "x402_header_supported": p.acpSchema.x402HeaderSupported,
      "agent_can_negotiate": p.acpSchema.agentCanNegotiate,
      "max_discount_pct": p.acpSchema.maxNegotiableDiscountPct,
      "upsell_candidate": p.upsellSuggestion || null
    }))
  };

  const jsonX402Data = {
    "status": 402,
    "error": "Payment Required (x402 Agent Protocol)",
    "payment_spec": {
      "gateway": "Razorpay Test Mode",
      "currency": "INR",
      "x402_headers": {
        "X-402-Payment-Required": "true",
        "X-Razorpay-Order-Id": "order_Nxs9921a8x9",
        "X-Payment-Amount": "349900",
        "X-Payment-Callback": "https://nexus.store/api/agent/webhook"
      }
    }
  };

  const activeJson = 
    activeEndpoint === 'wellknown' ? jsonWellKnown :
    activeEndpoint === 'catalog' ? jsonCatalogData : jsonX402Data;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(activeJson, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white border border-blue-200 shadow-md shadow-blue-500/5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
              <FileCode className="w-3.5 h-3.5 text-blue-600" />
              <span>Machine-Readable Agentic Protocols (NPCI UAP • ACP • x402)</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Agent-Readable Merchant Catalog & Endpoints
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Third-party AI buyer agents (ChatGPT, Claude, Autonomous Buying Swarms) discover products, negotiate dynamic pricing, and fetch Razorpay order payloads standardly.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-mono font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Razorpay Test Mode Verified</span>
            </span>
          </div>
        </div>
      </div>

      {/* Protocol Architecture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <div className="p-5 rounded-2xl glass-card border border-slate-200 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700">NPCI UAP Specification</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200">v0.9</span>
          </div>
          <h3 className="font-heading font-bold text-slate-900 text-sm">Universal Agent Protocol</h3>
          <p className="text-xs text-slate-600">Standardized agent discovery manifest mapping merchant catalog & Razorpay order schemas.</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-blue-700">ACP Standard</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-blue-50 text-blue-700 border border-blue-200">v1.2</span>
          </div>
          <h3 className="font-heading font-bold text-slate-900 text-sm">Agentic Commerce Protocol</h3>
          <p className="text-xs text-slate-600">Enables dynamic discount bounds, stock limits, and explainable upsell rationale.</p>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-slate-200 bg-white space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-700">HTTP x402 Header</span>
            <span className="px-2 py-0.5 rounded text-[10px] bg-amber-50 text-amber-700 border border-amber-200">Active</span>
          </div>
          <h3 className="font-heading font-bold text-slate-900 text-sm">402 Payment Required</h3>
          <p className="text-xs text-slate-600">Machine-to-machine header standard delivering instant Razorpay order links to autonomous agents.</p>
        </div>

      </div>

      {/* Interactive API Payload Explorer */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        
        {/* Endpoint Selector Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <button
              onClick={() => setActiveEndpoint('wellknown')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeEndpoint === 'wellknown'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              /.well-known/agentic-commerce.json
            </button>

            <button
              onClick={() => setActiveEndpoint('catalog')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeEndpoint === 'catalog'
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              /api/agent/catalog.json
            </button>

            <button
              onClick={() => setActiveEndpoint('x402')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeEndpoint === 'x402'
                  ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900'
              }`}
            >
              HTTP x402 Razorpay Header
            </button>
          </div>

          <button
            onClick={handleCopy}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 border border-slate-300 transition flex items-center gap-2 self-start sm:self-auto"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-500" />}
            <span>{copied ? 'Copied Payload!' : 'Copy JSON'}</span>
          </button>
        </div>

        {/* Code View */}
        <div className="relative rounded-2xl bg-slate-900 p-6 border border-slate-800 font-mono text-xs overflow-x-auto text-sky-300 shadow-inner">
          <div className="flex items-center justify-between text-[10px] text-slate-400 pb-3 border-b border-slate-800 mb-4">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-blue-400" />
              <span>CONTENT-TYPE: application/json</span>
            </div>
            <span className="text-emerald-400 font-bold">200 OK</span>
          </div>

          <pre className="leading-relaxed">
            {JSON.stringify(activeJson, null, 2)}
          </pre>
        </div>

      </div>

    </div>
  );
};
