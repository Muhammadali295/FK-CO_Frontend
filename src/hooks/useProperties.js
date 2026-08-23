import { useState, useEffect } from 'react';

// Utility to safely parse image arrays from Supabase
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

export const useProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProperties = async () => {
      const API_BASE_URL = import.meta.env?.VITE_API_URL || 'http://localhost:5000';
      try {
        const response = await fetch(`${API_BASE_URL}/api/properties`);
        const json = await response.json();

        if (json.success) {
          // Format DB data to exactly match your old PROPERTIES_DATA structure
          const formattedData = json.data.map(prop => {
            const imageList = parseImages(prop.images);
            const rawType = String(prop.type || '').toLowerCase();
            const isRental = rawType === 'rent' || rawType === 'let';

            // canonical purpose mapping: 'sell' -> 'Buy'
            let purpose = rawType ? (rawType === 'sell' ? 'Buy' : rawType.charAt(0).toUpperCase() + rawType.slice(1)) : undefined;

            return {
              id: prop.id,
              title: prop.title,
              location: `${prop.address}, ${prop.city}`,
              price: Number(prop.price),
              priceFormatted: isRental 
                ? `£${Number(prop.price).toLocaleString()} / pcm` 
                : `£${Number(prop.price).toLocaleString()}`,
              type: 'Luxury Property', // Or pull from DB if you add a category column
              status: rawType ? rawType.charAt(0).toUpperCase() + rawType.slice(1) : undefined, // 'buy' -> 'Buy'
              purpose,
              bedrooms: prop.bedrooms || 0,
              bathrooms: prop.bathrooms || 0,
              areaSqFt: prop.area_sqft || 0,
              epcRating: 'TBC',
              image: imageList[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
              gallery: imageList,
              featured: false,
              tag: isRental ? 'Fully Managed' : 'Exclusive Listing',
              listingStatus: prop.status ? prop.status.charAt(0).toUpperCase() + prop.status.slice(1) : undefined,
              description: prop.description || 'An exceptional luxury property presented by FK&CO Estate.',
              features: ['Premium Location', 'Luxury Finish', 'Concierge Service'] // Fallback features
            };
          });

          // Only show properties that aren't deleted
          setProperties(formattedData);
        } else {
          setError(json.error);
        }
      } catch (err) {
        setError('Server connection failed.');
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  return { properties, loading, error };
};