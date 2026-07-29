import React from 'react';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';

export default function PropertyDescription({ property }) {
  const paragraphs = property.longDescription.split('\n\n').filter(Boolean);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-[#D4A44A]/10 border border-[#D4A44A]/30 flex items-center justify-center">
          <FileText className="w-5 h-5 text-[#D4A44A]" />
        </div>
        <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
          Property <span className="gold-text">Description</span>
        </h2>
      </div>

      <div className="space-y-4">
        {paragraphs.map((paragraph, i) => (
          <p key={i} className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            {paragraph}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
