import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <BrowserRouter>
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