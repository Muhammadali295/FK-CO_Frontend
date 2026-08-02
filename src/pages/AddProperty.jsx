import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

export default function AddProperty() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [imageFiles, setImageFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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

  // Handle File Selection
  const handleImageChange = (e) => {
    if (e.target.files) {
      setImageFiles(Array.from(e.target.files));
    }
  };

  // Upload Images directly to Supabase Storage Bucket ('property-images')
  const uploadImagesToSupabase = async () => {
    if (!imageFiles.length) return [];
    
    setUploadingImages(true);
    const uploadedUrls = [];

    for (const file of imageFiles) {
      // Create a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      // Upload file to 'property-images' bucket
      const { error: uploadError } = await supabase.storage
        .from('property-images')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Image upload failed:', uploadError.message);
        continue;
      }

      // Get Public URL
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
      // 1. Upload images first & collect URLs
      const uploadedImages = await uploadImagesToSupabase();

      // 2. Get active admin session token
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      // 3. Post payload to backend Node API
      const response = await fetch('http://localhost:5000/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          images: uploadedImages // Send array of uploaded Supabase image URLs
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
          {/* Title */}
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

          {/* Listing Type & Price */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Listing Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              >
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="let">Let</option>
              </select>
            </div>

            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Price (£)
              </label>
              <input
                name="price"
                type="number"
                required
                value={formData.price}
                onChange={handleChange}
                placeholder="550000"
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Bedrooms
              </label>
              <input
                name="bedrooms"
                type="number"
                value={formData.bedrooms}
                onChange={handleChange}
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Bathrooms
              </label>
              <input
                name="bathrooms"
                type="number"
                value={formData.bathrooms}
                onChange={handleChange}
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Sq Ft
              </label>
              <input
                name="area_sqft"
                type="number"
                value={formData.area_sqft}
                onChange={handleChange}
                placeholder="1200"
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                City
              </label>
              <input
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
                Full Address
              </label>
              <input
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                placeholder="123 Jewellery Quarter, Birmingham"
                className="w-full bg-[#132238] border border-white/10 text-white p-3 rounded-lg text-sm outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Image Upload Field */}
          <div>
            <label className="block text-[#D4AF37] text-xs uppercase tracking-widest font-semibold mb-2">
              Property Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-[#132238] border border-white/10 text-slate-300 p-2.5 rounded-lg text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-[#D4AF37] file:text-[#080E1E] hover:file:bg-[#c5a059] cursor-pointer"
            />
            {imageFiles.length > 0 && (
              <p className="text-xs text-[#8899A6] mt-2">
                📷 {imageFiles.length} file(s) selected for upload.
              </p>
            )}
          </div>

          {/* Description */}
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
            {uploadingImages
              ? 'Uploading Images to Supabase Storage...'
              : loading
              ? 'Publishing Listing...'
              : 'Publish Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}