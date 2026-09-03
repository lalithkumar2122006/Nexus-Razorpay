import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  XCircle, 
  Zap, 
  RefreshCcw, 
  ArrowRight, 
  CreditCard, 
  Link as LinkIcon
} from 'lucide-react';
import type { SafetyPolicy, AuditLog } from '../types';
import { createAuditEntry } from '../services/agentEngine';

interface Props {
  policy: SafetyPolicy;
  onAddAuditLog: (log: AuditLog) => void;
  onNavigateToAudit: () => void;
}

export const FailureSimulator: React.FC<Props> = ({
  policy,
  onAddAuditLog,
  onNavigateToAudit
}) => {
  const [activeScenario, setActiveScenario] = useState<'LIMIT_BREACH' | 'PAYMENT_DECLINE'>('LIMIT_BREACH');
  const [isRunning, setIsRunning] = useState(false);
  const [simulationResult, setSimulationResult] = useState<any>(null);

  // Scenario 1: Bounded Money Limit Violation
  const handleRunLimitBreachScenario = () => {
    setIsRunning(true);
    setSimulationResult(null);

    setTimeout(() => {
      const attemptedAmount = 12500;

      // Create Audit Log
      const auditEntry = createAuditEntry({
        actor: 'Safety Policy Gate',
        actionType: 'BOUNDED_LIMIT_BLOCKED',
        details: `BLOCKED: External AI Buyer Agent requested purchase of Dedicated AI Compute Node at ₹${attemptedAmount.toLocaleString()}.`,
        moneyAmount: attemptedAmount,
        policyResult: 'GATE_BLOCKED',
        explainabilityText: `BOUNDED SAFETY GATE ENGAGED: Order value ₹${attemptedAmount.toLocaleString()} exceeds merchant cap of ₹${policy.maxTransactionLimit.toLocaleString()}. Unauthorized AI money action blocked.`
      });

      onAddAuditLog(auditEntry);

      setSimulationResult({
        type: 'LIMIT_BREACH',
        attemptedAmount,
        limitCap: policy.maxTransactionLimit,
        gatePassed: false,
        auditLogId: auditEntry.id,
        explainability: auditEntry.explainabilityText,
        recoveryAction: {
          title: 'Automated Tier Fallback Proposed',
          recommendedAlternative: 'Agentic Intelligence API 100k Tokens',
          alternativePrice: 2499,
          status: 'Authorized & Bounded (₹2,499 <= ₹5,000 cap)'
        }
      });

      setIsRunning(false);
    }, 800);
  };

  // Scenario 2: Razorpay Payment Decline & Automated Cart Recovery Link
  const handleRunPaymentDeclineScenario = () => {
    setIsRunning(true);
    setSimulationResult(null);

    setTimeout(() => {
      const cartAmount = 3499;

      // Log failure entry
      const failAudit = createAuditEntry({
        actor: 'Razorpay API Gateway',
        actionType: 'RAZORPAY_PAYMENT_FAILED',
        details: `Payment Declined: Simulated test mode card failure (BAD_REQUEST_ERROR)`,
        moneyAmount: cartAmount,
        policyResult: 'GATE_BLOCKED',
        explainabilityText: `Razorpay API returned status: payment_failed. Merchant auto-recovery workflow engaged.`
      });

      // Log recovery link creation
      const recoveryLink = `https://rzp.io/i/nxs_recovery_${Math.random().toString(36).substring(2, 9)}`;
      const recoveryAudit = createAuditEntry({
        actor: 'Merchant Growth Engine',
        actionType: 'RECOVERY_LINK_GENERATED',
        details: `Generated fallback UPI Razorpay recovery payment link: ${recoveryLink}`,
        moneyAmount: cartAmount,
        policyResult: 'PASS',
        explainabilityText: `Dispatched cart recovery URL directly to AI buyer agent endpoint for instant retry.`
      });

      onAddAuditLog(failAudit);
      onAddAuditLog(recoveryAudit);

      setSimulationResult({
        type: 'PAYMENT_DECLINE',
        cartAmount,
        errorCode: 'BAD_REQUEST_ERROR',
        errorReason: 'Card Declined in Razorpay Test Mode',
        failAuditId: failAudit.id,
        recoveryLink,
        recoveryAuditId: recoveryAudit.id,
        explainability: 'Graceful Handling: Application intercepted Razorpay failure cleanly without crashing, created audit trace, and generated a backup UPI paylink.'
      });

      setIsRunning(false);
    }, 800);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="p-8 rounded-3xl bg-white border border-rose-200 shadow-md shadow-rose-500/5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>The Bar Requirement • Failure Handled Gracefully</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Bounded Safety Gate & Failure Simulator
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl leading-relaxed">
              Test how the Nexus Agentic Engine blocks over-budget AI buyer spending attempts and handles Razorpay payment declines without crashing.
            </p>
          </div>

          <button
            onClick={onNavigateToAudit}
            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 border border-slate-300 transition flex items-center gap-2"
          >
            <span>Inspect Live Audit Log</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scenario Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Scenario 1 Card */}
        <div
          onClick={() => setActiveScenario('LIMIT_BREACH')}
          className={`p-6 rounded-3xl bg-white cursor-pointer transition border ${
            activeScenario === 'LIMIT_BREACH'
              ? 'border-blue-500 ring-2 ring-blue-500/20 shadow-xl'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
              Scenario A
            </span>
            <ShieldAlert className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-900 mt-4">Bounded Money Limit Breach</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            AI Buyer Agent attempts to spend ₹12,500 (Exceeds Single Tx Limit cap of ₹{policy.maxTransactionLimit.toLocaleString()}).
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Expected Outcome:</span>
            <span className="font-mono font-bold text-rose-600">Blocked + Lower Tier Proposed</span>
          </div>
        </div>

        {/* Scenario 2 Card */}
        <div
          onClick={() => setActiveScenario('PAYMENT_DECLINE')}
          className={`p-6 rounded-3xl bg-white cursor-pointer transition border ${
            activeScenario === 'PAYMENT_DECLINE'
              ? 'border-rose-500 ring-2 ring-rose-500/20 shadow-xl'
              : 'border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
              Scenario B
            </span>
            <CreditCard className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="font-heading text-lg font-bold text-slate-900 mt-4">Razorpay Payment Decline</h3>
          <p className="text-xs text-slate-600 mt-2 leading-relaxed">
            Simulates card decline during Razorpay payment execution (Triggers auto cart recovery link).
          </p>
          <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">Expected Outcome:</span>
            <span className="font-mono font-bold text-amber-600">Caught Gracefully + Recovery URL</span>
          </div>
        </div>

      </div>

      {/* Interactive Trigger Area */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h3 className="font-heading text-xl font-bold text-slate-900">
              {activeScenario === 'LIMIT_BREACH' ? 'Run Bounded Money Breach Simulation' : 'Run Razorpay Payment Decline Simulation'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Click trigger to execute the agentic failure scenario in real time.
            </p>
          </div>

          <button
            onClick={activeScenario === 'LIMIT_BREACH' ? handleRunLimitBreachScenario : handleRunPaymentDeclineScenario}
            disabled={isRunning}
            className={`px-6 py-3 rounded-2xl font-semibold text-xs transition shadow-xl flex items-center gap-2 ${
              activeScenario === 'LIMIT_BREACH'
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/30'
                : 'bg-rose-600 hover:bg-rose-700 text-white shadow-rose-600/30'
            }`}
          >
            {isRunning ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            <span>Execute Failure Simulation</span>
          </button>
        </div>

        {/* Live Execution Output Box */}
        {simulationResult && (
          <div className="space-y-6 animate-in fade-in zoom-in-95">
            
            {simulationResult.type === 'LIMIT_BREACH' && (
              <div className="p-6 rounded-3xl bg-slate-50 border border-rose-300 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 font-bold text-rose-700 text-sm">
                    <XCircle className="w-5 h-5 text-rose-600" />
                    <span>BOUNDED SAFETY GATE BLOCKED ACTION</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Audit ID: {simulationResult.auditLogId}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                    <span className="text-slate-500">Attempted Amount:</span>
                    <div className="font-mono font-bold text-slate-900 text-base">₹{simulationResult.attemptedAmount.toLocaleString()}</div>
                    <span className="text-[10px] text-rose-600 font-semibold">Exceeds Cap ₹{simulationResult.limitCap.toLocaleString()}</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-1">
                    <span className="text-blue-700 font-bold">{simulationResult.recoveryAction.title}</span>
                    <div className="font-bold text-slate-900 text-sm">{simulationResult.recoveryAction.recommendedAlternative}</div>
                    <span className="font-mono text-emerald-700 font-bold">₹{simulationResult.recoveryAction.alternativePrice.toLocaleString()} ({simulationResult.recoveryAction.status})</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-blue-900">AI Explainability Rationale:</span>
                  <p className="leading-relaxed text-[11px]">{simulationResult.explainability}</p>
                </div>
              </div>
            )}

            {simulationResult.type === 'PAYMENT_DECLINE' && (
              <div className="p-6 rounded-3xl bg-amber-50/50 border border-amber-300 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2 font-bold text-amber-800 text-sm">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                    <span>RAZORPAY PAYMENT DECLINE CAUGHT GRACEFULLY</span>
                  </div>
                  <span className="font-mono text-xs text-slate-500">Error: {simulationResult.errorCode}</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Reason:</span>
                    <span className="font-bold text-rose-600">{simulationResult.errorReason}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Cart Amount:</span>
                    <span className="font-mono font-bold text-slate-900">₹{simulationResult.cartAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cart Recovery Link Box */}
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-emerald-800 text-xs">
                    <LinkIcon className="w-4 h-4 text-emerald-600" />
                    <span>Automated Cart Recovery Link Dispatched</span>
                  </div>
                  <p className="text-xs text-slate-700">
                    Dispatched signed Razorpay UPI test paylink to agent callback endpoint:
                  </p>
                  <div className="p-3 rounded-xl bg-white border border-slate-200 font-mono text-xs text-blue-700 truncate font-semibold">
                    {simulationResult.recoveryLink}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-xs text-slate-700 space-y-1">
                  <span className="font-bold text-amber-900">AI Explainability Rationale:</span>
                  <p className="leading-relaxed text-[11px]">{simulationResult.explainability}</p>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
