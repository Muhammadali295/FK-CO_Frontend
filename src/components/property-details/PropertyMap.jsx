import React from 'react';
import { motion } from 'framer-motion';
import {
  MapPin,
  GraduationCap,
  Hospital,
  Trees,
  ShoppingBag,
  Train,
} from 'lucide-react';

const NEARBY_CATEGORIES = [
  { key: 'schools', label: 'Schools', icon: GraduationCap },
  { key: 'hospitals', label: 'Hospitals', icon: Hospital },
  { key: 'parks', label: 'Parks', icon: Trees },
  { key: 'shopping', label: 'Shopping Centres', icon: ShoppingBag },
  { key: 'transport', label: 'Public Transport', icon: Train },
];

export default function PropertyMap({ property }) {
  const { coordinates, nearbyPlaces, fullAddress } = property;
  const mapSrc = `https://maps.google.com/maps?q=${coordinates.lat},${coordinates.lng}&z=14&output=embed`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="flex items-center gap-3">
        <MapPin className="w-5 h-5 text-[#D4A44A]" />
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
          Location & <span className="gold-text">Nearby</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10">
          <div className="p-4 border-b border-white/10">
            <p className="text-sm text-slate-400">{fullAddress}</p>
          </div>
          <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-[#071B35]">
            <iframe
              title={`Map showing location of ${property.title}`}
              src={mapSrc}
              className="absolute inset-0 w-full h-full border-0 grayscale-[30%] contrast-[1.1]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        <div className="space-y-4">
          {NEARBY_CATEGORIES.map(({ key, label, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="glass-panel rounded-2xl p-4 border border-white/10"
            >
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-4 h-4 text-[#D4A44A]" />
                <h3 className="text-sm font-bold text-white">{label}</h3>
              </div>
              <ul className="space-y-2">
                {(nearbyPlaces[key] || []).map((place, i) => (
                  <li key={i} className="text-xs text-slate-400 flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#D4A44A] mt-1.5 shrink-0" />
                    {place}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
