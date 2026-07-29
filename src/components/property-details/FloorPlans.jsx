import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutGrid, Download, ZoomIn, ZoomOut, X, Maximize2 } from 'lucide-react';

export default function FloorPlans({ floorPlanUrl, propertyTitle }) {
  const [zoom, setZoom] = useState(1);
  const [lightbox, setLightbox] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = floorPlanUrl;
    link.download = `${propertyTitle.replace(/\s+/g, '-').toLowerCase()}-floor-plan.jpg`;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <LayoutGrid className="w-5 h-5 text-[#D4A44A]" />
            <h2 className="font-serif-luxury text-xl sm:text-2xl font-bold text-white">
              Floor <span className="gold-text">Plans</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.25, 1))}
              disabled={zoom <= 1}
              aria-label="Zoom out floor plan"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4A44A] disabled:opacity-30 transition-all cursor-pointer"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.25, 2.5))}
              disabled={zoom >= 2.5}
              aria-label="Zoom in floor plan"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4A44A] disabled:opacity-30 transition-all cursor-pointer"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLightbox(true)}
              aria-label="Expand floor plan"
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-[#D4A44A] transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl gold-bg gold-bg-hover text-[#071B35] text-xs font-bold uppercase tracking-wider cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#051329] aspect-[4/3] sm:aspect-[16/10]">
          <img
            src={floorPlanUrl}
            alt={`${propertyTitle} floor plan`}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-300"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
      </motion.div>

      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col p-4 sm:p-8"
          >
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setLightbox(false)}
                aria-label="Close floor plan"
                className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-rose-500/80 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto">
              <img
                src={floorPlanUrl}
                alt={`${propertyTitle} floor plan`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
