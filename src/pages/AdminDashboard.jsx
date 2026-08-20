// src/pages/AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { X, ArrowLeft, ArrowRight, Upload } from 'lucide-react';

// --- UTILITY: Safely parse Postgres strings, JSON, or Arrays ---
const parseImages = (data) => {
  if (!data) return [];
  if (Array.isArray(data)) return data;
  if (typeof data === 'string') {
    if (data.startsWith('{') && data.endsWith('}')) {
      const content = data.slice(1, -1);
      if (!content) return [];
      return content.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
    }
    try {
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      return [data];
    }
  }
  return [];
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('leads'); // 'leads' | 'properties'
  const [leads, setLeads] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modal States
  const [editingProperty, setEditingProperty] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null); 

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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/admin/login');
    } catch (err) {
      console.error('Error logging out:', err);
    }
  };

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
        if (selectedLead?.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
      } else {
        alert('Failed to update lead status: ' + json.error);
      }
    } catch (err) {
      alert('Error updating lead status.');
    }
  };

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
        if (selectedLead?.id === id) setSelectedLead(null); 
      } else {
        alert('Failed to delete lead: ' + json.error);
      }
    } catch (err) {
      alert('Server error while deleting lead.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1E] text-slate-200 p-6 md:p-10 font-sans">
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

          <button
            onClick={handleLogout}
            className="bg-transparent text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white px-4 py-2.5 rounded-full text-sm font-semibold transition cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </header>

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

      {loading ? (
        <div className="text-[#D4AF37] py-16 text-center font-serif">Loading luxury database...</div>
      ) : activeTab === 'leads' ? (
        <LeadsTable 
          leads={leads} 
          onUpdateStatus={handleUpdateLeadStatus} 
          onDeleteLead={handleDeleteLead}
          onViewLead={setSelectedLead} 
        />
      ) : (
        <PropertiesGrid 
          properties={properties} 
          onEditProperty={(prop) => setEditingProperty(prop)} 
          onDeleteProperty={handleDeleteProperty} 
        />
      )}

      {editingProperty && (
        <EditPropertyModal
          property={editingProperty}
          onClose={() => setEditingProperty(null)}
          onSave={handleUpdateProperty}
        />
      )}

      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}

function LeadsTable({ leads, onUpdateStatus, onDeleteLead, onViewLead }) {
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
            <tr 
              key={lead.id} 
              onClick={() => onViewLead(lead)} 
              className="hover:bg-white/[0.04] cursor-pointer transition-colors"
            >
              <td className="p-4 text-slate-400">
                {new Date(lead.created_at).toLocaleDateString()}
              </td>
              <td className="p-4 font-bold text-white">{lead.full_name}</td>
              <td className="p-4">
                <div>{lead.email}</div>
                <div className="text-xs text-[#D4AF37]">{lead.phone}</div>
              </td>
              <td className="p-4">
                <span className="bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider">
                  {lead.intent?.toUpperCase()}
                </span>
              </td>
              <td className="p-4 capitalize">{lead.lead_type?.replace('_', ' ')}</td>
              <td className="p-4">
                {lead.property_address && (
                  <div className="text-[#D4AF37] text-xs mb-1 line-clamp-1">
                    📌 {lead.property_address}
                  </div>
                )}
                <div className="text-xs text-slate-400 line-clamp-1">{lead.message || '-'}</div>
              </td>
              <td className="p-4">
                <select
                  value={lead.status || 'new'}
                  onClick={(e) => e.stopPropagation()} 
                  onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                  className="bg-[#132238] border border-white/10 text-white text-xs p-1.5 rounded outline-none focus:border-[#D4AF37] cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              </td>
              <td className="p-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    onDeleteLead(lead.id);
                  }}
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

// ─── UPGRADED LEAD DETAILS MODAL (WITH SMART PARSER) ───
function LeadDetailsModal({ lead, onClose }) {
  if (!lead) return null;

  // Smart Parser: Extracts "Key: Value" info packed into the message string
  let extractedDetails = [];
  let displayNotes = lead.message || '';

  if (displayNotes.includes(' | ')) {
    // Handle Valuation Form format: "Service: Selling | Timeline: ASAP | Notes: None"
    const parts = displayNotes.split(' | ');
    displayNotes = ''; // Reset notes to only capture the 'Notes' value
    parts.forEach(part => {
      const splitIdx = part.indexOf(':');
      if (splitIdx > -1) {
        const key = part.substring(0, splitIdx).trim();
        const value = part.substring(splitIdx + 1).trim();
        if (key.toLowerCase() === 'notes' || key.toLowerCase() === 'message') {
          displayNotes = value;
        } else {
          extractedDetails.push({ key, value });
        }
      } else {
        displayNotes += (displayNotes ? ' ' : '') + part;
      }
    });
  } else if (displayNotes.includes('Preferred Date:')) {
    // Handle Viewing Form format: "[Private Viewing Request] Preferred Date: X, Time: Y. Notes: Z"
    const dateMatch = displayNotes.match(/Preferred Date: (.*?), Time:/);
    const timeMatch = displayNotes.match(/Time: (.*?)\. Notes:/);
    const notesMatch = displayNotes.match(/Notes: (.*)/);
    
    if (dateMatch) extractedDetails.push({ key: 'Preferred Date', value: dateMatch[1] });
    if (timeMatch) extractedDetails.push({ key: 'Preferred Time', value: timeMatch[1] });
    if (notesMatch) displayNotes = notesMatch[1];
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#0D172A] border border-[#D4AF37]/30 rounded-2xl w-full max-w-2xl p-6 relative my-8 shadow-2xl">
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition p-2 cursor-pointer bg-white/5 hover:bg-white/10 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>
        
        <h3 className="text-[#D4AF37] font-serif text-2xl mb-1">
          Lead Information
        </h3>
        <p className="text-xs text-slate-400 mb-6 pb-4 border-b border-white/10">
          Received on: {new Date(lead.created_at).toLocaleString()}
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-4 text-sm mb-6">
          <div>
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Full Name</strong>
            <span className="text-white text-lg font-medium">{lead.full_name}</span>
          </div>
          <div>
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Contact Details</strong>
            <a href={`mailto:${lead.email}`} className="text-[#D4AF37] hover:underline block">{lead.email}</a>
            <a href={`tel:${lead.phone}`} className="text-slate-300 hover:text-white block mt-0.5">{lead.phone || 'No phone provided'}</a>
          </div>
          <div>
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Intent</strong>
            <span className="bg-[#D4AF37]/15 text-[#D4AF37] px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider inline-block">
              {lead.intent}
            </span>
          </div>
          <div>
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Lead Type</strong>
            <span className="text-slate-200 capitalize">{lead.lead_type?.replace('_', ' ')}</span>
          </div>
          <div>
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">Current Status</strong>
            <span className={`px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider inline-block ${
              lead.status === 'new' ? 'bg-blue-500/20 text-blue-300' :
              lead.status === 'contacted' ? 'bg-amber-500/20 text-amber-300' :
              'bg-emerald-500/20 text-emerald-300'
            }`}>
              {lead.status || 'new'}
            </span>
          </div>

          {/* DYNAMICALLY MAP PARSED DETAILS (Service, Timeline, Type, Postcode, Dates, etc) */}
          {extractedDetails.map((detail, idx) => (
            <div key={idx}>
              <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-1">{detail.key}</strong>
              <span className="text-slate-200 text-base">{detail.value}</span>
            </div>
          ))}
        </div>

        {lead.property_address && (
          <div className="mb-6 pt-4 border-t border-white/10">
            <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-2">Target Property / Address</strong>
            <p className="text-white flex items-start gap-2">
              <span className="text-[#D4AF37]">📌</span> {lead.property_address}
            </p>
          </div>
        )}

        <div className="pt-4 border-t border-white/10">
          <strong className="text-xs text-slate-500 uppercase tracking-widest block mb-3">Client Message / Notes</strong>
          <div className="bg-[#132238] border border-white/5 p-4 rounded-xl text-slate-300 leading-relaxed whitespace-pre-wrap">
            {displayNotes || <span className="italic text-slate-500">No additional notes provided.</span>}
          </div>
        </div>

      </div>
    </div>
  );
}

function PropertiesGrid({ properties, onEditProperty, onDeleteProperty }) {
  if (!properties.length) {
    return <p className="text-[#8899A6] p-4">No property listings found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((prop) => {
        const imageList = parseImages(prop.images);
        
        return (
          <div key={prop.id} className="bg-[#0D172A] rounded-xl overflow-hidden border border-white/10 flex flex-col justify-between">
            <div>
              <div className="h-44 bg-[#132238] flex items-center justify-center relative">
                {imageList.length > 0 && imageList[0] ? (
                  <img src={imageList[0]} alt={prop.title} className="w-full h-full object-cover" />
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

            <div className="p-4 pt-0 flex justify-between gap-2 border-t border-white/5 mt-2">
              <button
                onClick={() => onEditProperty({ ...prop, images: imageList })}
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
        );
      })}
    </div>
  );
}

function EditPropertyModal({ property, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: property.title || '',
    price: property.price || '',
    status: property.status || 'available',
    type: property.type || 'buy',
    bedrooms: property.bedrooms || '',
    bathrooms: property.bathrooms || '',
    area_sqft: property.area_sqft || '',
    city: property.city || '',
    address: property.address || '',
    description: property.description || '',
  });

  const [mixedImages, setMixedImages] = useState(
    (property.images || []).map((url, i) => ({
      id: `existing-${i}`,
      url: url,
      isNew: false
    }))
  );
  
  const [isUploading, setIsUploading] = useState(false);

  const handleImageSelect = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (mixedImages.length + newFiles.length > 5) {
        alert('Properties can have a maximum of 5 images combined.');
        e.target.value = null;
        return;
      }
      
      const newImageObjects = newFiles.map(file => ({
        id: `new-${Math.random().toString(36).substr(2, 9)}`,
        file: file,
        url: URL.createObjectURL(file), 
        isNew: true
      }));

      setMixedImages(prev => [...prev, ...newImageObjects]);
      e.target.value = null;
    }
  };

  const moveImage = (index, direction) => {
    const newArr = [...mixedImages];
    if (direction === 'left' && index > 0) {
      [newArr[index - 1], newArr[index]] = [newArr[index], newArr[index - 1]];
    } else if (direction === 'right' && index < newArr.length - 1) {
      [newArr[index + 1], newArr[index]] = [newArr[index], newArr[index + 1]];
    }
    setMixedImages(newArr);
  };

  const removeImage = (idToRemove) => {
    setMixedImages(prev => prev.filter(img => img.id !== idToRemove));
  };

  const uploadNewImages = async () => {
    const finalUrls = [];
    setIsUploading(true);

    for (const img of mixedImages) {
      if (img.isNew) {
        const fileExt = img.file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        const { error } = await supabase.storage.from('property-images').upload(filePath, img.file);
        if (error) {
          console.error("Failed to upload new image:", error);
          continue;
        }

        const { data: { publicUrl } } = supabase.storage.from('property-images').getPublicUrl(filePath);
        finalUrls.push(publicUrl);
      } else {
        finalUrls.push(img.url);
      }
    }

    setIsUploading(false);
    return finalUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalImageUrls = await uploadNewImages();
    onSave(property.id, { ...formData, images: finalImageUrls });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#0D172A] border border-[#D4AF37]/30 rounded-2xl w-full max-w-2xl p-6 space-y-4 my-8">
        <h3 className="text-white font-serif text-xl">Update Property Details</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Listing Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="let">Let</option>
              </select>
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              >
                <option value="available">Available</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Price (£)</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Bedrooms</label>
              <input
                type="number"
                value={formData.bedrooms}
                onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Bathrooms</label>
              <input
                type="number"
                value={formData.bathrooms}
                onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Sq Ft</label>
              <input
                type="number"
                value={formData.area_sqft}
                onChange={(e) => setFormData({ ...formData, area_sqft: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">City</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Full Address</label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[#D4AF37] text-xs uppercase font-semibold">
                Manage Images ({mixedImages.length}/5)
              </label>
              <label className={`text-xs flex items-center gap-1 cursor-pointer transition ${mixedImages.length >= 5 ? 'text-slate-500 opacity-50' : 'text-[#8899A6] hover:text-white'}`}>
                <Upload className="w-3.5 h-3.5" />
                Add More
                <input type="file" multiple accept="image/*" onChange={handleImageSelect} disabled={mixedImages.length >= 5} className="hidden" />
              </label>
            </div>

            {mixedImages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {mixedImages.map((img, index) => (
                  <div key={img.id} className={`relative group rounded-lg overflow-hidden border-2 ${index === 0 ? 'border-[#D4AF37]' : 'border-white/10'} aspect-video`}>
                    <img src={img.url} alt="Property" className="w-full h-full object-cover" />
                    
                    {index === 0 && (
                      <span className="absolute top-1 left-1 bg-[#D4AF37] text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">Main</span>
                    )}

                    {img.isNew && (
                      <span className="absolute top-1 right-1 bg-emerald-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">New</span>
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                      <button type="button" onClick={() => moveImage(index, 'left')} disabled={index === 0} className="p-1 bg-white/20 hover:bg-[#D4AF37] hover:text-black rounded text-white disabled:opacity-30 cursor-pointer">
                        <ArrowLeft className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => removeImage(img.id)} className="p-1 bg-red-500/80 hover:bg-red-500 rounded text-white cursor-pointer">
                        <X className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" onClick={() => moveImage(index, 'right')} disabled={index === mixedImages.length - 1} className="p-1 bg-white/20 hover:bg-[#D4AF37] hover:text-black rounded text-white disabled:opacity-30 cursor-pointer">
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-500 italic">No images attached.</p>
            )}
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-1">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-[#132238] border border-white/10 text-white p-2.5 rounded-lg text-sm outline-none focus:border-[#D4AF37] resize-y"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isUploading}
              className="text-[#8899A6] text-sm hover:text-white px-3 py-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUploading}
              className="bg-[#D4AF37] text-[#080E1E] px-5 py-2.5 rounded-full font-bold text-sm hover:bg-[#c5a059] disabled:opacity-60 transition cursor-pointer"
            >
              {isUploading ? 'Saving & Uploading...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}