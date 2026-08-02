// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'properties'
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal State for Property Editing
  const [editingProperty, setEditingProperty] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      };

      if (activeTab === 'leads') {
        const res = await fetch('http://localhost:5000/api/leads', { headers });
        const json = await res.json();
        if (json.success) setLeads(json.data);
      } else {
        const res = await fetch('http://localhost:5000/api/properties');
        const json = await res.json();
        if (json.success) setProperties(json.data);
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  // --- LOGOUT FUNCTIONALITY ---
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

  // --- UPDATE PROPERTY API CALL ---
  const handleUpdateProperty = async (id, updatedFields) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedFields)
      });

      const json = await res.json();
      if (json.success) {
        setProperties(properties.map(p => p.id === id ? { ...p, ...updatedFields } : p));
        setEditingProperty(null);
      } else {
        alert('Failed to update property: ' + json.error);
      }
    } catch (err) {
      alert('Error communicating with server.');
    }
  };

  // --- UPDATE LEAD STATUS API CALL ---
  const handleUpdateLeadStatus = async (id, newStatus) => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`http://localhost:5000/api/leads/${id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const json = await res.json();
      if (json.success) {
        setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
      } else {
        alert('Failed to update lead status: ' + json.error);
      }
    } catch (err) {
      alert('Error updating lead status.');
    }
  };

  // --- DELETE PROPERTY API CALL ---
  const handleDeleteProperty = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`http://localhost:5000/api/properties/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await res.json();
      if (json.success) {
        setProperties(properties.filter(item => item.id !== id));
      } else {
        alert('Failed to delete property: ' + json.error);
      }
    } catch (err) {
      alert('Server error while deleting property.');
    }
  };

  // --- DELETE LEAD API CALL ---
  const handleDeleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enquiry record?')) return;

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(`http://localhost:5000/api/leads/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const json = await res.json();
      if (json.success) {
        setLeads(leads.filter(item => item.id !== id));
      } else {
        alert('Failed to delete lead: ' + json.error);
      }
    } catch (err) {
      alert('Server error while deleting lead.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-200 p-6 md:p-10 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-[#D4AF37]/20 gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-[#D4AF37] text-[#080E1E] font-bold text-xl px-3 py-1.5 rounded font-serif">
            FK
          </div>
          <div>
            <h1 className="text-white text-xl font-serif tracking-widest leading-none">
              FK&CO ESTATE
            </h1>
            <p className="text-[#D4AF37] text-[10px] tracking-wider mt-1">
              ADMINISTRATION PORTAL
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to="/admin/add-property"
            className="bg-[#D4AF37] text-[#080E1E] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#c5a059] transition"
          >
            + Add Property Listing
          </Link>

          {/* Integrated Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-4 my-8">
        <button
          onClick={() => setActiveTab('leads')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition cursor-pointer ${
            activeTab === 'leads'
              ? 'bg-[#D4AF37] text-[#080E1E]'
              : 'bg-white/5 text-[#8899A6] hover:bg-white/10'
          }`}
        >
          Inbound Leads & Valuation Requests ({leads.length})
        </button>
        <button
          onClick={() => setActiveTab('properties')}
          className={`px-6 py-3 rounded-full text-sm font-semibold transition cursor-pointer ${
            activeTab === 'properties'
              ? 'bg-[#D4AF37] text-[#080E1E]'
              : 'bg-white/5 text-[#8899A6] hover:bg-white/10'
          }`}
        >
          Property Listings ({properties.length})
        </button>
      </div>

      {/* Main Content View */}
      {loading ? (
        <div className="text-[#D4AF37] py-16 text-center font-serif">Loading luxury database...</div>
      ) : activeTab === 'leads' ? (
        <LeadsTable 
          leads={leads} 
          onUpdateStatus={handleUpdateLeadStatus} 
          onDeleteLead={handleDeleteLead} 
        />
      ) : (
        <PropertiesGrid 
          properties={properties} 
          onEditProperty={(prop) => setEditingProperty(prop)} 
          onDeleteProperty={handleDeleteProperty} 
        />
      )}

      {/* Edit Property Modal */}
      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSave={handleUpdateProperty}
        />
      )}
    </div>
  );
}

// Leads Table with Status Dropdown
function LeadsTable({ leads, onUpdateStatus, onDeleteLead }) {
  if (!leads.length) {
    return <p className="text-[#8899A6] p-4">No inbound leads captured yet.</p>;
  }

  return (
    <div className="overflow-x-auto bg-[#0D172A] rounded-xl border border-white/10">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#D4AF37]/20 text-[#D4AF37] text-xs uppercase tracking-wider">
            <th className="p-4">Date</th>
            <th className="p-4">Client Name</th>
            <th className="p-4">Contact</th>
            <th className="p-4">Intent</th>
            <th className="p-4">Lead Type</th>
            <th className="p-4">Address / Message</th>
            <th className="p-4">Status</th>
            <th className="p-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5 text-sm">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-white/[0.02]">
              <td className="p-4 text-slate-400">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="p-4 font-bold text-white">{lead.full_name}</td>
              <td className="p-4">
                <div>{lead.email}</div>
                <div className="text-xs text-[#D4AF37]">{lead.phone}</div>
              </td>
              <td className="p-4">
                <span className="bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1 rounded-full text-xs font-semibold">
                  {lead.intent?.toUpperCase()}
                </span>
              </td>
              <td className="p-4 capitalize">{lead.lead_type}</td>
              <td className="p-4">
                {lead.property_address && (
                  <div className="text-[#D4AF37] text-xs mb-1">
                    📌 {lead.property_address}
                  </div>
                )}
                <div className="text-xs text-slate-400">{lead.message || '-'}</div>
              </td>
              <td className="p-4">
                <select
                  value={lead.status || 'new'}
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                  className="bg-[#132238] border border-white/10 text-white text-xs p-1.5 rounded outline-none focus:border-[#D4AF37]"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td className="p-4">
                <button
                  onClick={() => onDeleteLead(lead.id)}
                  className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Properties Grid with Edit Button
function PropertiesGrid({ properties, onEditProperty, onDeleteProperty }) {
  if (!properties.length) {
    return <p className="text-[#8899A6] p-4">No property listings found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((prop) => (
        <div key={prop.id} className="bg-[#0D172A] rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between">
          <div>
            <div className="h-44 bg-[#132238] flex items-center justify-center relative">
              {prop.images && prop.images[0] ? (
                <img src={prop.images[0]} alt={prop.title} className="w-full h-full object-cover" />
              ) : (
                <span className="text-[#D4AF37] font-serif font-bold text-sm tracking-widest">
                  FK&CO LUXURY
                </span>
              )}
              <span className="absolute top-3 right-3 bg-[#D4AF37] text-black px-2.5 py-0.5 rounded-full text-xs font-bold uppercase">
                {prop.status || 'available'}
              </span>
            </div>
            <div className="p-5">
              <span className="text-[#D4AF37] text-xs font-bold uppercase tracking-wider block mb-1">
                {prop.type}
              </span>
              <h3 className="text-white font-serif text-lg mb-1">{prop.title}</h3>
              <p className="text-[#D4AF37] font-bold text-xl mb-2">
                £{Number(prop.price).toLocaleString()}
              </p>
              <p className="text-[#8899A6] text-xs">📍 {prop.city}, {prop.address}</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 pt-0 flex justify-between gap-2 border-t border-white/5 mt-2">
            <button
              onClick={() => onEditProperty(prop)}
              className="bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/30 hover:bg-[#D4AF37] hover:text-[#080E1E] px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer mt-3"
            >
              ✏️ Edit Listing
            </button>
            <button
              onClick={() => onDeleteProperty(prop.id, prop.title)}
              className="bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer mt-3"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

// Edit Property Modal Component
function EditPropertyModal({ property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: property.title,
    price: property.price,
    status: property.status || 'available',
    type: property.type || 'buy',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(property.id, formData);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-[#0D172A] border border-[#D4AF37]/30 rounded-2xl w-full max-w-md p-6 space-y-4">
        <h3 className="text-white font-serif text-xl">Update Property</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Price (£)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none"
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="let">Let</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-[#8899A6] text-xs hover:text-white px-3 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#D4AF37] text-[#080E1E] px-5 py-2 rounded-full font-bold text-xs hover:bg-[#c5a059]"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}