import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import type { TabType } from './components/Navbar';
import { MerchantDashboard } from './components/MerchantDashboard';
import { ConversationalCheckout } from './components/ConversationalCheckout';
import { AgentCatalogView } from './components/AgentCatalogView';
import { AuditTrailView } from './components/AuditTrailView';
import { FailureSimulator } from './components/FailureSimulator';
import { RazorpayKeyModal } from './components/RazorpayKeyModal';

import { 
  INITIAL_PRODUCTS, 
  INITIAL_SAFETY_POLICY, 
  INITIAL_CAMPAIGNS, 
  INITIAL_AGENT_PROTOCOL, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import type { Product, SafetyPolicy, Campaign, AuditLog } from './types';
import { DEFAULT_RAZORPAY_TEST_KEY } from './services/razorpayService';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('merchant');
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [policy, setPolicy] = useState<SafetyPolicy>(INITIAL_SAFETY_POLICY);
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CAMPAIGNS);
  const [protocol] = useState(INITIAL_AGENT_PROTOCOL);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);
  
  const [apiKey, setApiKey] = useState<string>(DEFAULT_RAZORPAY_TEST_KEY);
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);

  const handleAddAuditLog = (newLog: AuditLog) => {
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  const handlePaymentSuccessUpdateStats = (amountPaid: number) => {
    setPolicy((prev) => ({
      ...prev,
      currentDailySpent: prev.currentDailySpent + amountPaid
    }));
  };

  const handleToggleCampaign = (id: string) => {
    setCampaigns((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        policy={policy}
        onOpenKeyModal={() => setIsKeyModalOpen(true)}
        apiKey={apiKey}
      />

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'merchant' && (
          <MerchantDashboard
            products={products}
            campaigns={campaigns}
            policy={policy}
            onToggleCampaign={handleToggleCampaign}
            onUpdatePolicy={setPolicy}
            onNavigateToCheckout={() => setActiveTab('checkout')}
          />
        )}

        {activeTab === 'checkout' && (
          <ConversationalCheckout
            catalog={products}
            policy={policy}
            apiKey={apiKey}
            onAddAuditLog={handleAddAuditLog}
            onPaymentSuccessUpdateStats={handlePaymentSuccessUpdateStats}
          />
        )}

        {activeTab === 'catalog' && (
          <AgentCatalogView
            protocol={protocol}
            catalog={products}
          />
        )}

        {activeTab === 'audit' && (
          <AuditTrailView
            auditLogs={auditLogs}
          />
        )}

        {activeTab === 'simulator' && (
          <FailureSimulator
            policy={policy}
            onAddAuditLog={handleAddAuditLog}
            onNavigateToAudit={() => setActiveTab('audit')}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-slate-800 py-6 text-center text-xs text-slate-500 space-y-1">
        <p>Nexus AI Growth & Agentic Commerce Platform • NPCI UAP & ACP v1.2 Protocol Specs</p>
        <p className="text-slate-400">Powered by Razorpay Test Mode • 100% Explainable, Bounded & Gated Money Actions</p>
      </footer>

      {/* Razorpay Key Modal */}
      <RazorpayKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        apiKey={apiKey}
        onSaveApiKey={setApiKey}
      />

    </div>
  );
};

export default App;
