import { useState, useEffect } from 'react';
import API_BASE_URL from '../utils/api';

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
      try {
        const response = await fetch(`${API_BASE_URL}/api/properties`);
        const json = await response.json();

        if (json.success) {
          const formattedData = json.data.map(prop => {
            const imageList = parseImages(prop.images);
            
            // Type & Purpose Logic
            const rawType = String(prop.type || '').toLowerCase();
            const isRental = rawType === 'rent' || rawType === 'let';
            const purpose = rawType ? (rawType === 'sell' ? 'Buy' : rawType.charAt(0).toUpperCase() + rawType.slice(1)) : undefined;

            // Smart Tag & Status Logic
            const rawStatus = String(prop.status || '').toLowerCase();
            let displayTag = isRental ? 'Fully Managed' : 'Exclusive Listing';
            let displayListingStatus = prop.status ? prop.status.charAt(0).toUpperCase() + prop.status.slice(1) : undefined;

            // Hide the duplicate grey status badge if a prominent tag is used
            if (rawStatus === 'sold') {
              displayTag = 'SOLD';
              displayListingStatus = '';
            } else if (rawStatus === 'rented') {
              displayTag = 'LET AGREED';
              displayListingStatus = '';
            } else if (rawStatus === 'pending') {
              displayTag = 'UNDER OFFER';
              displayListingStatus = '';
            }

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
              tag: displayTag,
              listingStatus: displayListingStatus,
              description: prop.description || 'An exceptional luxury property presented by FK&CO Estate.',
              features: ['Premium Location', 'Luxury Finish', 'Concierge Service'] // Fallback features
            };
          });

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