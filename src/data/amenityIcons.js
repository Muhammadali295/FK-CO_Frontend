import {
  TreePine,
  Car,
  Waves,
  Camera,
  Sun,
  Flame,
  Zap,
  ParkingCircle,
  Sofa,
  Smartphone,
} from 'lucide-react';

export const AMENITY_CONFIG = {
  garden: { label: 'Garden', icon: TreePine },
  garage: { label: 'Garage', icon: Car },
  swimmingPool: { label: 'Swimming Pool', icon: Waves },
  cctv: { label: 'CCTV Security', icon: Camera },
  balcony: { label: 'Balcony', icon: Sun },
  centralHeating: { label: 'Central Heating', icon: Flame },
  solarPanels: { label: 'Solar Panels', icon: Zap },
  parking: { label: 'Parking Space', icon: ParkingCircle },
  furnished: { label: 'Furnished', icon: Sofa },
  smartHome: { label: 'Smart Home System', icon: Smartphone },
};

export function getAmenityDetails(key) {
  return AMENITY_CONFIG[key] || { label: key, icon: Smartphone };
}
