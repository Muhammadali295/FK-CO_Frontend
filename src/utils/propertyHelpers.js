import { PROPERTIES_DATA } from '../data/properties';

const AGENT = {
  name: 'James Whitfield',
  role: 'Senior Property Consultant',
  phone: '+441212345678',
  phoneDisplay: '0121 234 5678',
  whatsapp: '441212345678',
  email: 'viewings@fkcoestate.co.uk',
};

const LOCATION_COORDS = {
  Edgbaston: { lat: 52.4539, lng: -1.9248 },
  Solihull: { lat: 52.4118, lng: -1.7776 },
  'Sutton Coldfield': { lat: 52.5648, lng: -1.8242 },
  Harborne: { lat: 52.4604, lng: -1.9565 },
  Moseley: { lat: 52.4453, lng: -1.8857 },
  Bournville: { lat: 52.4278, lng: -1.9356 },
  'Kings Heath': { lat: 52.4367, lng: -1.8944 },
  Shirley: { lat: 52.4089, lng: -1.8203 },
  Digbeth: { lat: 52.4751, lng: -1.8853 },
  'City Centre': { lat: 52.4814, lng: -1.8998 },
  'Jewellery Quarter': { lat: 52.4872, lng: -1.9115 },
  'Barnt Green': { lat: 52.3589, lng: -1.9936 },
};

const AMENITY_PATTERNS = [
  { key: 'garden', label: 'Garden', patterns: ['garden', 'grounds', 'landscap', 'terrace', 'acre'] },
  { key: 'garage', label: 'Garage', patterns: ['garage', 'parking', 'driveway'] },
  { key: 'swimmingPool', label: 'Swimming Pool', patterns: ['pool', 'swim', 'spa'] },
  { key: 'cctv', label: 'CCTV Security', patterns: ['cctv', 'security', 'alarm', 'gated'] },
  { key: 'balcony', label: 'Balcony', patterns: ['balcony', 'terrace', 'roof terrace'] },
  { key: 'centralHeating', label: 'Central Heating', patterns: ['underfloor heating', 'heating', 'climate'] },
  { key: 'solarPanels', label: 'Solar Panels', patterns: ['solar', 'air source', 'heat pump', 'eco'] },
  { key: 'parking', label: 'Parking Space', patterns: ['parking', 'ev charging', 'garage'] },
  { key: 'furnished', label: 'Furnished', patterns: ['furnished', 'fitted wardrobes', 'designer'] },
  { key: 'smartHome', label: 'Smart Home System', patterns: ['smart home', 'automation', 'concierge'] },
];

const DEFAULT_NEARBY = {
  schools: ['King Edward VI High School — 0.8 mi', 'St George\'s School — 1.2 mi'],
  hospitals: ['Queen Elizabeth Hospital — 2.1 mi', 'City Hospital — 3.4 mi'],
  parks: ['Cannon Hill Park — 1.5 mi', 'Sutton Park — 4.2 mi'],
  shopping: ['Bullring & Grand Central — 2.8 mi', 'Touchwood Shopping Centre — 1.1 mi'],
  transport: ['Birmingham New Street — 2.5 mi', 'Nearest Bus Stop — 0.2 mi'],
};

function detectAmenities(property) {
  const text = [
    property.description,
    ...(property.features || []),
  ].join(' ').toLowerCase();

  const found = AMENITY_PATTERNS.filter(({ patterns }) =>
    patterns.some((p) => text.includes(p))
  );

  const unique = [];
  const seen = new Set();
  for (const item of found) {
    if (!seen.has(item.key)) {
      seen.add(item.key);
      unique.push(item.key);
    }
  }

  if (unique.length === 0) {
    return ['garden', 'parking', 'centralHeating'];
  }
  return unique;
}

function inferGarages(property) {
  const text = (property.features || []).join(' ').toLowerCase();
  if (text.includes('triple garage')) return 3;
  if (text.includes('double garage')) return 2;
  if (text.includes('garage') || text.includes('parking')) return 2;
  if (property.type?.includes('Apartment') || property.type?.includes('Loft')) return 1;
  return 2;
}

function inferCoords(location) {
  for (const [area, coords] of Object.entries(LOCATION_COORDS)) {
    if (location.includes(area)) return coords;
  }
  return { lat: 52.4862, lng: -1.8904 };
}

function inferYearBuilt(property) {
  const type = property.type?.toLowerCase() || '';
  if (type.includes('period') || type.includes('victorian') || type.includes('edwardian')) return 1895;
  if (type.includes('heritage') || type.includes('arts')) return 1920;
  if (type.includes('contemporary') || type.includes('penthouse')) return 2019;
  if (type.includes('loft')) return 1910;
  return 2005;
}

function inferCouncilTax(property) {
  if (property.price >= 2000000) return 'H';
  if (property.price >= 1500000) return 'G';
  if (property.price >= 1000000) return 'F';
  if (property.price >= 750000) return 'E';
  if (property.price >= 500000) return 'D';
  return 'C';
}

export function getPurposeLabel(status) {
  switch (status) {
    case 'Buy': return 'For Sale';
    case 'Let': return 'To Let';
    case 'Rent': return 'To Rent';
    case 'Sell': return 'For Sale';
    default: return status;
  }
}

export function getDisplayStatus(property) {
  const { status, listingStatus } = property;

  if (status === 'Buy') {
    if (listingStatus === 'Sold STC') return 'Sold';
    if (listingStatus === 'Under Offer') return 'Under Offer';
    return 'Available for Sale';
  }
  if (status === 'Let') {
    if (listingStatus === 'Under Offer') return 'Let Agreed';
    return 'To Let';
  }
  if (status === 'Rent') {
    if (listingStatus === 'Under Offer') return 'Let Agreed';
    return 'Available';
  }
  return listingStatus || 'Available';
}

export function enrichProperty(property) {
  if (!property) return null;

  const coords = property.coordinates || inferCoords(property.location);
  const amenities = property.amenities || detectAmenities(property);

  return {
    ...property,
    fullAddress: property.fullAddress || `${property.title}, ${property.location}, United Kingdom`,
    garages: property.garages ?? inferGarages(property),
    yearBuilt: property.yearBuilt ?? inferYearBuilt(property),
    councilTaxBand: property.councilTaxBand ?? inferCouncilTax(property),
    purpose: property.purpose || getPurposeLabel(property.status),
    displayStatus: getDisplayStatus(property),
    amenities,
    floorPlan:
      property.floorPlan ||
      'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80',
    coordinates: coords,
    nearbyPlaces: property.nearbyPlaces || DEFAULT_NEARBY,
    agent: property.agent || AGENT,
    longDescription:
      property.longDescription ||
      `${property.description}\n\nThis exceptional ${property.type.toLowerCase()} represents the finest in Birmingham luxury living. Presented by FK&CO Estate with full professional photography, verified EPC documentation, and accompanied viewings by our senior consultants. Early viewing is strongly recommended for this distinguished residence.`,
    allImages: [
      property.image,
      ...(property.gallery || []).filter((img) => img !== property.image),
    ],
  };
}

export function getPropertyById(id) {
  const raw = PROPERTIES_DATA.find((p) => p.id === id);
  return enrichProperty(raw);
}

export function getSimilarProperties(currentId, limit = 4) {
  const current = PROPERTIES_DATA.find((p) => p.id === currentId);
  if (!current) return [];

  const scored = PROPERTIES_DATA.filter((p) => p.id !== currentId).map((p) => {
    let score = 0;
    if (p.status === current.status) score += 3;
    if (p.type === current.type) score += 2;
    if (Math.abs(p.price - current.price) / current.price < 0.3) score += 2;
    if (p.location.split(',')[0] === current.location.split(',')[0]) score += 1;
    score += (p.popularity || 0) / 100;
    return { property: p, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ property }) => enrichProperty(property));
}

export function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(value);
}
