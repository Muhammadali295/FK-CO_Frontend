import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Calculator, PoundSterling, Percent, Calendar, TrendingUp } from 'lucide-react';
import { formatCurrency } from '../../utils/propertyHelpers';

function calculateMortgage(price, downPayment, annualRate, years) {
  const principal = Math.max(price - downPayment, 0);
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (principal === 0 || monthlyRate === 0) {
    return { monthly: 0, total: downPayment, interest: 0 };
  }

  const monthly =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const total = monthly * numPayments + downPayment;
  const interest = total - price;

  return { monthly, total, interest };
}

export default function MortgageCalculator({ propertyPrice }) {
  const [downPayment, setDownPayment] = useState(Math.round(propertyPrice * 0.2));
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanPeriod, setLoanPeriod] = useState(25);

  const results = useMemo(
    () => calculateMortgage(propertyPrice, downPayment, interestRate, loanPeriod),
    [propertyPrice, downPayment, interestRate, loanPeriod]
  );

  const inputClass =
    'w-full bg-[#051329]/90 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#D4A44A] transition-colors';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-[#D4A44A]/20"
    >
      <div className="flex items-center gap-3 mb-6">
        <Calculator className="w-5 h-5 text-[#D4A44A]" />
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
          Mortgage <span className="gold-text">Calculator</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
              Property Price
            </label>
            <input
              type="text"
              readOnly
              value={formatCurrency(propertyPrice)}
              className={`${inputClass} opacity-70 cursor-not-allowed`}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <PoundSterling className="w-3.5 h-3.5 text-[#D4A44A]" />
              Down Payment
            </label>
            <input
              type="range"
              min={0}
              max={propertyPrice}
              step={5000}
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full accent-[#D4A44A]"
            />
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Math.min(Number(e.target.value), propertyPrice))}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Percent className="w-3.5 h-3.5 text-[#D4A44A]" />
              Interest Rate (%)
            </label>
            <input
              type="number"
              min={0.1}
              max={15}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className={inputClass}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#D4A44A]" />
              Loan Period (Years)
            </label>
            <select
              value={loanPeriod}
              onChange={(e) => setLoanPeriod(Number(e.target.value))}
              className={`${inputClass} cursor-pointer`}
            >
              {[10, 15, 20, 25, 30, 35].map((y) => (
                <option key={y} value={y}>
                  {y} Years
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 text-center">
            <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">Estimated Monthly Payment</p>
            <p className="text-3xl sm:text-4xl font-serif-luxury font-bold gold-text">
              {formatCurrency(results.monthly)}
            </p>
            <p className="text-xs text-slate-500 mt-2">per month</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-[#D4A44A]" />
                <p className="text-xs text-slate-400">Total Payment</p>
              </div>
              <p className="text-lg font-bold text-white">{formatCurrency(results.total)}</p>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-2">
                <Percent className="w-4 h-4 text-[#D4A44A]" />
                <p className="text-xs text-slate-400">Total Interest</p>
              </div>
              <p className="text-lg font-bold text-white">{formatCurrency(Math.max(results.interest, 0))}</p>
            </div>
          </div>

          <p className="text-[10px] text-slate-500 leading-relaxed">
            * This calculator provides estimates only and does not constitute a mortgage offer.
            Contact FK&CO Estate for introductions to our trusted independent mortgage advisors.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
