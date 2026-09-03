import React from 'react';
import { 
  TrendingUp, 
  Bot, 
  FileCode, 
  ShieldAlert, 
  AlertTriangle, 
  Zap, 
  Key, 
  CheckCircle2
} from 'lucide-react';
import type { SafetyPolicy } from '../types';

export type TabType = 'merchant' | 'checkout' | 'catalog' | 'audit' | 'simulator';

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  policy: SafetyPolicy;
  onOpenKeyModal: () => void;
  apiKey?: string;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  policy,
  onOpenKeyModal,
  apiKey
}) => {
  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200 bg-white/90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Protocol Info */}
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={() => setActiveTab('merchant')}>
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-500 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900">NEXUS</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200 tracking-wide uppercase">
                  Agentic Commerce
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                NPCI UAP & ACP Protocol • Razorpay Test Mode Engine
              </p>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
            <button
              onClick={() => setActiveTab('merchant')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'merchant'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Revenue Growth</span>
            </button>

            <button
              onClick={() => setActiveTab('checkout')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'checkout'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Bot className="w-4 h-4 text-blue-500" />
              <span>AI Buyer Checkout</span>
            </button>

            <button
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'catalog'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <FileCode className="w-4 h-4 text-sky-600" />
              <span>Agent Catalog API</span>
            </button>

            <button
              onClick={() => setActiveTab('audit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'audit'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <ShieldAlert className="w-4 h-4 text-emerald-600" />
              <span>Audit Trail</span>
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'simulator'
                  ? 'bg-gradient-to-r from-rose-600 to-amber-600 text-white shadow-md shadow-rose-600/20'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-500" />
              <span>Failure Demo</span>
            </button>
          </nav>

          {/* Right Header Status & Config */}
          <div className="flex items-center gap-3">
            {/* Safety Gate Summary Pill */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs">
              <div className="w-2 h-2 rounded-full bg-blue-600 pulse-glow" />
              <span className="text-slate-500 font-medium">Tx Cap:</span>
              <span className="font-mono font-bold text-slate-900">₹{policy.maxTransactionLimit.toLocaleString()}</span>
            </div>

            {/* Razorpay Key Modal Button */}
            <button
              onClick={onOpenKeyModal}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 hover:bg-blue-100 transition text-xs font-medium"
              title={`Active Key: ${apiKey || 'rzp_test_...'}`}
            >
              <Key className="w-3.5 h-3.5 text-blue-600" />
              <span className="hidden sm:inline">Razorpay Key</span>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            </button>
          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="flex lg:hidden overflow-x-auto gap-2 py-3 border-t border-slate-200 scrollbar-none">
          <button
            onClick={() => setActiveTab('merchant')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'merchant' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Growth Dashboard
          </button>
          <button
            onClick={() => setActiveTab('checkout')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'checkout' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            AI Checkout
          </button>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'catalog' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Agent Catalog
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'audit' ? 'bg-blue-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Audit Trail
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap ${
              activeTab === 'simulator' ? 'bg-rose-600 text-white' : 'text-slate-600 bg-slate-100'
            }`}
          >
            Failure Demo
          </button>
        </div>

      </div>
    </header>
  );
};
