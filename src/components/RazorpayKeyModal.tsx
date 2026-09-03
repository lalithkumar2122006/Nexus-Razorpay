import React, { useState } from 'react';
import { Key, CheckCircle, X, ShieldCheck, Zap } from 'lucide-react';
import { DEFAULT_RAZORPAY_TEST_KEY } from '../services/razorpayService';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onSaveApiKey: (key: string) => void;
}

export const RazorpayKeyModal: React.FC<Props> = ({
  isOpen,
  onClose,
  apiKey,
  onSaveApiKey
}) => {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleUseDefault = () => {
    setInputKey(DEFAULT_RAZORPAY_TEST_KEY);
    onSaveApiKey(DEFAULT_RAZORPAY_TEST_KEY);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
      <div className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white border border-blue-200 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-slate-900">Razorpay API Credentials</h3>
              <p className="text-xs text-slate-500">Configure Razorpay Test Mode Key for real-time payments</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Razorpay Key ID (Test Mode)
            </label>
            <div className="relative">
              <input
                type="text"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                placeholder="rzp_test_..."
                className="w-full px-4 py-3 rounded-xl glass-input font-mono text-sm pl-10"
              />
              <Zap className="w-4 h-4 text-amber-500 absolute left-3.5 top-3.5" />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              Starts with <code className="text-blue-700 font-bold">rzp_test_</code>. If left empty or default, built-in test sandbox key will be used.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 space-y-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-900">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Razorpay Test Mode Active</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              No real funds are charged. Payments utilize Razorpay's official Test Mode cards & UPI simulators with verified Razorpay Order receipts.
            </p>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Razorpay Test Key updated successfully!</span>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <button
              type="button"
              onClick={handleUseDefault}
              className="text-xs text-blue-700 hover:text-blue-800 underline font-semibold"
            >
              Reset to Demo Test Key
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-slate-600 hover:bg-slate-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/30 transition flex items-center gap-2"
              >
                <span>Save Key</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
