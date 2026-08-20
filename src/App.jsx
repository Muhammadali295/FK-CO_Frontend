import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import BuyProperties from './pages/BuyProperties';
import SellProperties from './pages/SellProperties';
import LetProperties from './pages/LetProperties';
import RentProperties from './pages/RentProperties';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';

import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AddProperty from './pages/AddProperty';

function GlobalShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.shiftKey && event.key.toLowerCase() === 'a') {
        event.preventDefault();
        navigate('/admin/dashboard');
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  return null;
}

function SessionTimeout() {
  const navigate = useNavigate();
  const location = useLocation();
  const timeoutId = useRef(null);

  useEffect(() => {
    const isAdminRoute = location.pathname.startsWith('/admin') && location.pathname !== '/admin/login';
    if (!isAdminRoute) return;

    const handleLogout = async () => {
      await supabase.auth.signOut();
      alert('You have been securely logged out due to 30 minutes of inactivity.');
      navigate('/admin/login');
    };

    const resetTimer = () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
      timeoutId.current = setTimeout(handleLogout, 1800000); 
    };

    const activityEvents = ['mousedown', 'mousemove', 'keydown', 'scroll', 'touchstart'];
    
    activityEvents.forEach(event => window.addEventListener(event, resetTimer));
    
    resetTimer();

    return () => {
      activityEvents.forEach(event => window.removeEventListener(event, resetTimer));
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [navigate, location.pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <GlobalShortcuts />
      <SessionTimeout />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<BuyProperties />} />
          <Route path="/sell" element={<SellProperties />} />
          <Route path="/let" element={<LetProperties />} />
          <Route path="/rent" element={<RentProperties />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/add-property"
          element={
            <ProtectedRoute>
              <AddProperty />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}