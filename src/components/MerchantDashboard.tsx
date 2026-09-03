import React, { useState } from 'react';
import { 
  TrendingUp, 
  Sparkles, 
  Plus, 
  Check, 
  ShieldCheck, 
  Bot, 
  Zap, 
  ArrowUpRight, 
  Tag,
  DollarSign
} from 'lucide-react';
import type { Product, Campaign, SafetyPolicy } from '../types';

interface Props {
  products: Product[];
  campaigns: Campaign[];
  policy: SafetyPolicy;
  onToggleCampaign: (id: string) => void;
  onUpdatePolicy: (newPolicy: SafetyPolicy) => void;
  onNavigateToCheckout: () => void;
}

export const MerchantDashboard: React.FC<Props> = ({
  products,
  campaigns,
  policy,
  onToggleCampaign,
  onUpdatePolicy,
  onNavigateToCheckout
}) => {
  const [showNewCampaignModal, setShowNewCampaignModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  // Stats calculation
  const totalRevenue = 148900;
  const aiRevenue = 58400;
  const aiLiftPct = 39.2;
  const totalTransactions = 54;
  const aiTransactions = 22;

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    setShowNewCampaignModal(false);
    setNewTitle('');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner: Merchant AI Revenue Accelerator */}
      <div className="relative overflow-hidden rounded-3xl bg-white border border-blue-200 p-8 shadow-xl shadow-blue-500/5">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-80 h-80 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Razorpay AI Growth Engine • NPCI UAP Ready</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Grow Merchant Revenue & Make Store <span className="gradient-text-blue">Transactable by AI Buyers</span>
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Automate dynamic cross-sells, upsells, and abandoned cart recovery for human shoppers & autonomous AI buyer agents with explainable, bounded, and gated financial safety controls.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onNavigateToCheckout}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-blue-700 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-white font-semibold text-sm shadow-xl shadow-blue-600/25 transition transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-sky-200" />
              <span>Launch AI Buyer Checkout Sandbox</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Sales (30d)</span>
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">₹{totalRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-semibold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+24.8% vs last month</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-blue-300 relative overflow-hidden group bg-blue-50/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">AI Agent Revenue Lift</span>
            <div className="p-2 rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/30">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">₹{aiRevenue.toLocaleString()}</div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-blue-700 font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>{aiLiftPct}% of total merchant revenue</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AI Buyer Agent Orders</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Bot className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">{aiTransactions} <span className="text-xs text-slate-500 font-normal">/ {totalTransactions} total</span></div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-emerald-600 font-semibold">
              <Check className="w-3.5 h-3.5" />
              <span>100% Gated & Explainable</span>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-200 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">AOV Upsell Lift</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Tag className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-extrabold text-slate-900 font-mono">₹2,654 <span className="text-xs text-slate-500 font-normal">(+₹680)</span></div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-amber-600 font-semibold">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+34.4% Average Cart Increase</span>
            </div>
          </div>
        </div>

      </div>

      {/* Main Grid: Campaign Orchestrator & Safety Policy Guardrails */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Autonomous AI Campaign Orchestrator (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-heading text-xl font-bold text-slate-900">Autonomous Revenue & Campaign Orchestrator</h2>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Active Rules
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  AI rules dynamically execute cross-sell offers, bulk discounts, and agent-to-agent negotiations.
                </p>
              </div>

              <button
                onClick={() => setShowNewCampaignModal(true)}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Create AI Campaign Rule</span>
              </button>
            </div>

            {/* Campaign Cards List */}
            <div className="space-y-4">
              {campaigns.map((camp) => (
                <div
                  key={camp.id}
                  className={`p-5 rounded-2xl transition-all border ${
                    camp.active
                      ? 'bg-slate-50 border-blue-200 shadow-sm'
                      : 'bg-slate-100/50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5 max-w-xl">
                      <div className="flex items-center gap-2">
                        <span className="font-heading text-base font-bold text-slate-900">{camp.title}</span>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          {camp.triggerType}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700">
                        <span className="text-slate-500 font-medium">Target:</span> {camp.targetSegment}
                      </p>
                      <div className="p-2.5 rounded-xl bg-white border border-slate-200 text-[11px] text-blue-900 flex items-start gap-2 shadow-xs">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span><strong className="text-blue-800">AI Rationale:</strong> {camp.aiExplanation}</span>
                      </div>
                    </div>

                    <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-slate-200 pt-3 sm:pt-0 gap-3 shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-slate-500">Revenue Lift</div>
                        <div className="font-mono font-bold text-blue-700 text-sm">₹{camp.revenueGenerated.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500">{camp.conversions} AI Conversions</div>
                      </div>

                      <button
                        onClick={() => onToggleCampaign(camp.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                          camp.active
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                            : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                        }`}
                      >
                        {camp.active ? 'Active' : 'Paused'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Dynamic Catalog & Pricing Table */}
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="font-heading text-lg font-bold text-slate-900">Merchant Catalog & Agent Dynamic Pricing</h3>
                <p className="text-xs text-slate-500">Manage base rates and AI negotiable caps per SKU</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                {products.length} Active SKUs
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold bg-slate-50">
                    <th className="py-3 px-3">Product Name</th>
                    <th className="py-3 px-3">Category</th>
                    <th className="py-3 px-3">Base Price</th>
                    <th className="py-3 px-3">Max AI Discount</th>
                    <th className="py-3 px-3">UAP / ACP Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 font-medium">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-blue-50/50 transition">
                      <td className="py-3 px-3 font-semibold text-slate-900 flex items-center gap-2">
                        <img src={p.image} alt={p.title} className="w-7 h-7 rounded-lg object-cover border border-slate-200" />
                        <span>{p.title}</span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{p.category}</td>
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">₹{p.basePrice.toLocaleString()}</td>
                      <td className="py-3 px-3 font-mono text-blue-700 font-bold">{p.acpSchema.maxNegotiableDiscountPct}% OFF</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          {p.acpSchema.uapCompliant ? 'UAP Ready' : 'Standard'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* Right Column: Safety Policy & Bounded Money Controls (1 col) */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-blue-200 bg-white space-y-6 sticky top-24 shadow-md shadow-blue-500/5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-heading text-lg font-bold text-slate-900">Bounded Safety Controls</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Gated Protection
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Every financial action by AI buyer agents must strictly satisfy merchant safety parameters.
            </p>

            {/* Slider 1: Max Single Transaction Cap */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Max Single Tx Limit:</span>
                <span className="font-mono font-bold text-blue-700">₹{policy.maxTransactionLimit.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="20000"
                step="500"
                value={policy.maxTransactionLimit}
                onChange={(e) => onUpdatePolicy({ ...policy, maxTransactionLimit: Number(e.target.value) })}
                className="w-full accent-blue-600 bg-slate-200 rounded-lg cursor-pointer h-2"
              />
              <p className="text-[11px] text-slate-500">Transactions exceeding this limit are blocked and flagged for human review.</p>
            </div>

            {/* Slider 2: Daily Budget Ceiling */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700">Daily AI Budget Ceiling:</span>
                <span className="font-mono font-bold text-blue-700">₹{policy.maxDailyBudget.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={policy.maxDailyBudget}
                onChange={(e) => onUpdatePolicy({ ...policy, maxDailyBudget: Number(e.target.value) })}
                className="w-full accent-sky-600 bg-slate-200 rounded-lg cursor-pointer h-2"
              />
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                <span className="text-slate-600">Spent Today:</span>
                <span className="font-mono font-bold text-emerald-700">₹{policy.currentDailySpent.toLocaleString()} / ₹{policy.maxDailyBudget.toLocaleString()}</span>
              </div>
            </div>

            {/* Guardrail Toggles */}
            <div className="space-y-3 pt-2">
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Active Guardrails</span>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50 transition">
                <span className="text-xs text-slate-700 font-medium">Enforce Hard Single Tx Cap</span>
                <input
                  type="checkbox"
                  checked={policy.activeGuardrails.enforceTxLimit}
                  onChange={(e) => onUpdatePolicy({
                    ...policy,
                    activeGuardrails: { ...policy.activeGuardrails, enforceTxLimit: e.target.checked }
                  })}
                  className="rounded accent-blue-600 w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-blue-50/50 transition">
                <span className="text-xs text-slate-700 font-medium">Auto-Generate Razorpay Recovery Links</span>
                <input
                  type="checkbox"
                  checked={policy.activeGuardrails.autoCartRecoveryLink}
                  onChange={(e) => onUpdatePolicy({
                    ...policy,
                    activeGuardrails: { ...policy.activeGuardrails, autoCartRecoveryLink: e.target.checked }
                  })}
                  className="rounded accent-blue-600 w-4 h-4"
                />
              </label>
            </div>

          </div>
        </div>

      </div>

      {/* New AI Campaign Rule Modal */}
      {showNewCampaignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white border border-blue-200 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-heading text-lg font-bold text-slate-900">Create AI Campaign Rule</h3>
              <button
                onClick={() => setShowNewCampaignModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Campaign Title</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Developer Productivity Hardware Bundle"
                  className="w-full px-3 py-2.5 rounded-xl glass-input"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Trigger Segment</label>
                <select className="w-full px-3 py-2.5 rounded-xl glass-input bg-white text-slate-800">
                  <option>Hardware Buyers looking for Ergonomic gear</option>
                  <option>AI Buyer Agents with &gt;₹2,000 cart</option>
                  <option>Abandoned Checkouts (UAP Paylink Dispatch)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCampaignModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md shadow-blue-600/30"
                >
                  Activate AI Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
