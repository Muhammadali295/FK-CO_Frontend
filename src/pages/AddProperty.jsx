import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import API_BASE_URL from '../utils/api';
import { ArrowLeft, ArrowRight, X } from 'lucide-react';

export default function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  
  const [imageFiles, setImageFiles] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    type: 'buy',
    status: 'available',
    bedrooms: 1,
    bathrooms: 1,
    area_sqft: '',
    address: '',
    city: 'Birmingham',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      if (imageFiles.length + newFiles.length > 15) {
        alert('You can only upload a maximum of 15 images per property.');
        e.target.value = null;
        return;
      }

      const newImageObjects = newFiles.map(file => ({
        file,
        previewUrl: URL.createObjectURL(file),
        id: Math.random().toString(36).substring(2, 9)
      }));

      setImageFiles(prev => [...prev, ...newImageObjects]);
      e.target.value = null;
    }
  };

  // Reordering controls
  const moveImage = (index, direction) => {
    const newImages = [...imageFiles];
    if (direction === 'left' && index > 0) {
      [newImages[index - 1], newImages[index]] = [newImages[index], newImages[index - 1]];
    } else if (direction === 'right' && index < newImages.length - 1) {
      [newImages[index + 1], newImages[index]] = [newImages[index], newImages[index + 1]];
    }
    setImageFiles(newImages);
  };

  const removeImage = (index) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadImagesToSupabase = async () => {
    if (!imageFiles.length) return [];
    
    setUploadingImages(true);
    const uploadedUrls = [];

    for (const imgObj of imageFiles) {
      const fileExt = imgObj.file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, imgObj.file);

      if (uploadError) {
        console.error('Image upload failed:', uploadError.message);
        continue;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('property-images')
        .getPublicUrl(filePath);

      uploadedUrls.push(publicUrl);
    }

    setUploadingImages(false);
    return uploadedUrls;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const uploadedImages = await uploadImagesToSupabase();
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const response = await fetch(`${API_BASE_URL}/api/properties`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages
        }),
      });

      const result = await response.json();
      setLoading(false);

      if (result.success) {
        alert('Property Listing & Images Published Successfully!');
        navigate('/admin/dashboard');
      } else {
        alert('Error creating property: ' + result.error);
      }
    } catch (err) {
      setLoading(false);
      alert('Failed to connect with backend server.');
    }
  };

  return (
    <div className="min-h-screen bg-[#080E1E] p-6 md:p-10 flex justify-center font-sans">
      <div className="bg-[#0D172A] p-8 md:p-10 rounded-2xl w-full max-w-2xl border border-[#D4AF37]/20 shadow-xl h-fit">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white font-serif text-2xl">Create Luxury Listing</h2>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="text-[#8899A6] text-sm hover:text-white transition cursor-pointer"
          >
            ← Back to Dashboard
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Property Title
            </label>
            <input
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Modern Penthouse Luxury Suite"
              className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Listing Type
              </label>
              <select name="type" value={formData.type} onChange={handleChange} className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]">
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="let">Let</option>
              </select>
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Price (£)
              </label>
              <input name="price" type="number" required value={formData.price} onChange={handleChange} placeholder="550000" className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-2">Bedrooms</label>
              <input name="bedrooms" type="number" value={formData.bedrooms} onChange={handleChange} className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-2">Bathrooms</label>
              <input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-2">Sq Ft</label>
              <input name="area_sqft" type="number" value={formData.area_sqft} onChange={handleChange} placeholder="1200" className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-2">City</label>
              <input name="city" required value={formData.city} onChange={handleChange} className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase font-semibold mb-2">Full Address</label>
              <input name="address" required value={formData.address} onChange={handleChange} placeholder="123 Jewellery Quarter, Birmingham" className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]" />
            </div>
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Property Images (Max 15)
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              disabled={imageFiles.length >= 15}
              className="w-full bg-[#132238] border border-white/10 text-slate-300 p-2.5 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-[#080E1E] hover:file:bg-[#c5a059] cursor-pointer disabled:opacity-50"
            />
            
            {imageFiles.length > 0 && (
              <div className="mt-4 space-y-3">
                <p className="text-xs text-[#8899A6]">
                  Drag or use arrows to set the main picture (first image). {imageFiles.length}/15 uploaded.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imageFiles.map((img, index) => (
                    <div key={img.id} className={`relative group rounded-xl overflow-hidden border-2 ${index === 0 ? 'border-[#D4AF37]' : 'border-white/10'} aspect-video`}>
                      <img src={img.previewUrl} alt="Preview" className="w-full h-full object-cover" />
                      
                      {index === 0 && (
                        <span className="absolute top-1 left-1 bg-[#D4AF37] text-black text-[9px] font-bold px-1.5 py-0.5 rounded uppercase">
                          Main
                        </span>
                      )}

                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <button type="button" onClick={() => moveImage(index, 'left')} disabled={index === 0} className="p-1.5 bg-white/20 hover:bg-[#D4AF37] hover:text-black rounded text-white disabled:opacity-30 cursor-pointer transition">
                          <ArrowLeft className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => removeImage(index)} className="p-1.5 bg-red-500/80 hover:bg-red-500 rounded text-white cursor-pointer transition">
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <button type="button" onClick={() => moveImage(index, 'right')} disabled={index === imageFiles.length - 1} className="p-1.5 bg-white/20 hover:bg-[#D4AF37] hover:text-black rounded text-white disabled:opacity-30 cursor-pointer transition">
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Highlight the key luxury features..."
              className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37] resize-y"
            />
          </div>

          <button
            type="submit"
            disabled={loading || uploadingImages}
            className="w-full bg-[#D4AF37] text-[#080E1E] py-3.5 rounded-full font-bold text-sm hover:bg-[#c5a059] transition cursor-pointer mt-4 disabled:opacity-50"
          >
            {uploadingImages ? 'Uploading Images...' : loading ? 'Publishing Listing...' : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}