import React, { useState } from 'react';
import { 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Info, 
  CreditCard, 
  FileText, 
  ChevronRight
} from 'lucide-react';
import type { AuditLog, PolicyResult } from '../types';

interface Props {
  auditLogs: AuditLog[];
}

export const AuditTrailView: React.FC<Props> = ({ auditLogs }) => {
  const [filterResult, setFilterResult] = useState<string>('ALL');
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  const filteredLogs = auditLogs.filter(log => {
    if (filterResult === 'ALL') return true;
    return log.policyResult === filterResult;
  });

  const getResultBadge = (result: PolicyResult) => {
    switch (result) {
      case 'PASS':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Gated Pass</span>
          </span>
        );
      case 'GATE_BLOCKED':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Bounded Blocked</span>
          </span>
        );
      case 'WARN_HUMAN_APPROVAL':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Human Review</span>
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner */}
      <div className="p-8 rounded-3xl bg-white border border-blue-200 shadow-md shadow-blue-500/5 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700 mb-2">
              <ShieldAlert className="w-3.5 h-3.5 text-blue-600" />
              <span>The Bar: 100% Explainable, Bounded & Gated Financial Trail</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Immutable Agentic Financial Audit Trail
            </h1>
            <p className="text-xs text-slate-600 max-w-2xl mt-1 leading-relaxed">
              Every financial intent, price check, policy gate evaluation, and Razorpay API call is logged with human-understandability rationale.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-mono text-blue-800 font-semibold">
              {auditLogs.length} Total Logs
            </span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setFilterResult('ALL')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              filterResult === 'ALL'
                ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            All Logs ({auditLogs.length})
          </button>
          <button
            onClick={() => setFilterResult('PASS')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              filterResult === 'PASS'
                ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Gated Passed ({auditLogs.filter(l => l.policyResult === 'PASS').length})
          </button>
          <button
            onClick={() => setFilterResult('GATE_BLOCKED')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition ${
              filterResult === 'GATE_BLOCKED'
                ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20'
                : 'bg-slate-100 text-slate-600 hover:text-slate-900'
            }`}
          >
            Bounded Blocked ({auditLogs.filter(l => l.policyResult === 'GATE_BLOCKED').length})
          </button>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                <th className="py-4 px-5">Timestamp</th>
                <th className="py-4 px-5">Actor</th>
                <th className="py-4 px-5">Action Type</th>
                <th className="py-4 px-5">Details</th>
                <th className="py-4 px-5">Amount</th>
                <th className="py-4 px-5">Policy Status</th>
                <th className="py-4 px-5">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 font-medium">
              {filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  onClick={() => setSelectedLog(log)}
                  className="hover:bg-blue-50/50 cursor-pointer transition"
                >
                  <td className="py-4 px-5 font-mono text-slate-500 text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold ${
                      log.actor === 'AI Buyer Agent' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      log.actor === 'Merchant Growth Engine' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                      log.actor === 'Safety Policy Gate' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    }`}>
                      {log.actor}
                    </span>
                  </td>

                  <td className="py-4 px-5 font-bold text-slate-900 font-mono text-[11px]">
                    {log.actionType}
                  </td>

                  <td className="py-4 px-5 text-slate-700 max-w-xs truncate">
                    {log.details}
                  </td>

                  <td className="py-4 px-5 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {log.moneyAmount > 0 ? `₹${log.moneyAmount.toLocaleString()}` : '-'}
                  </td>

                  <td className="py-4 px-5 whitespace-nowrap">
                    {getResultBadge(log.policyResult)}
                  </td>

                  <td className="py-4 px-5 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Inspection Modal */}
      {selectedLog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-white border border-blue-200 p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-slate-900">Financial Audit Record Inspection</h3>
                  <p className="font-mono text-xs text-slate-500">{selectedLog.id} • {selectedLog.timestamp}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedLog(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-800 transition"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div>
                  <span className="text-slate-500">Action:</span>
                  <div className="font-mono font-bold text-slate-900 text-sm">{selectedLog.actionType}</div>
                </div>
                <div className="text-right">
                  <span className="text-slate-500">Policy Evaluation:</span>
                  <div>{getResultBadge(selectedLog.policyResult)}</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 space-y-2">
                <div className="flex items-center gap-2 font-bold text-blue-900">
                  <Info className="w-4 h-4 text-blue-600" />
                  <span>Explainability Rationale ("Why this money action?")</span>
                </div>
                <p className="text-slate-800 leading-relaxed font-sans">{selectedLog.explainabilityText}</p>
              </div>

              {selectedLog.razorpayOrderData && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 font-mono text-[11px]">
                  <div className="font-bold text-emerald-400 flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <span>Razorpay API Receipt Payload</span>
                  </div>
                  <pre className="text-sky-300 leading-relaxed overflow-x-auto">
                    {JSON.stringify(selectedLog.razorpayOrderData, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setSelectedLog(null)}
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-600/30"
              >
                Close Audit Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
