// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
    } else {
      navigate('/admin/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1E] flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-md bg-[#0D172A] p-8 rounded-2xl border border-[#D4AF37]/25 shadow-2xl">
        {/* Brand Header */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <div className="bg-[#D4AF37] text-[#080E1E] font-bold text-lg px-2.5 py-1 rounded font-serif">
            FK
          </div>
          <div>
            <h1 className="text-white text-lg font-serif tracking-widest leading-none">
              FK&CO ESTATE
            </h1>
            <p className="text-[#D4AF37] text-[9px] tracking-wider leading-none mt-1">
              LUXURY REAL ESTATE
            </p>
          </div>
        </div>

        <div className="h-px bg-[#D4AF37]/15 my-5" />

        <h2 className="text-white text-2xl font-serif text-center mb-1">
          Staff Portal Login
        </h2>
        <p className="text-[#8899A6] text-sm text-center mb-6">
          Enter your executive credentials to access property management.
        </p>

        {errorMsg && (
          <div className="bg-red-500/15 text-red-400 border border-red-500/30 p-3 rounded-lg text-sm mb-5 text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@fkcoestate.com"
              className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37] transition"
            />
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37] transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-[#080E1E] py-3.5 rounded-full font-bold text-sm hover:bg-[#c5a059] transition cursor-pointer mt-2 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In To Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-[#8899A6] text-xs hover:text-white transition">
            ← Return to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}