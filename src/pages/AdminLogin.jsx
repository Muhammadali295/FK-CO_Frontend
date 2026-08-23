// src/pages/AdminLogin.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Password visibility state
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
        <div className="flex items-center justify-center mb-5">
          <img src="/fkco-estate-logo.svg" alt="FK&CO Estate logo" className="brand-logo brand-logo-admin" />
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
              placeholder="admin@fkandcoestate.com"
              className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37] transition"
            />
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Password
            </label>
            {/* Password Field Wrapper */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#132238] border border-white/10 text-white p-3 pr-10 rounded-lg text-sm outline-none focus:border-[#D4AF37] transition"
              />
              {/* Eye Icon Toggle Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8899A6] hover:text-[#D4AF37] transition cursor-pointer"
              >
                {showPassword ? (
                  /* Eye Off Icon */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  /* Eye Icon */
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12c1.341-4.52 5.421-7.5 9.964-7.5 4.543 0 8.623 2.98 9.964 7.5-1.341 4.52-5.421 7.5-9.964 7.5-4.543 0-8.623-2.98-9.964-7.5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
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