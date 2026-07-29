import React, { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyGallery({ images, title }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const activeImage = images[activeIndex] || images[0];

  const goTo = useCallback(
    (index) => {
      setActiveIndex((index + images.length) % images.length);
      setZoomLevel(1);
    },
    [images.length]
  );

  const handleZoomIn = () => setZoomLevel((z) => Math.min(z + 0.25, 3));
  const handleZoomOut = () => setZoomLevel((z) => Math.max(z - 0.25, 1));

  useEffect(() => {
    if (!fullscreen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape') setFullscreen(false);
      if (e.key === 'ArrowLeft') goTo(activeIndex - 1);
      if (e.key === 'ArrowRight') goTo(activeIndex + 1);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [fullscreen, activeIndex, goTo]);

  useEffect(() => {
    document.body.style.overflow = fullscreen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [fullscreen]);

  return (
    <>
      <div className="space-y-4">
        <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 aspect-[16/10] sm:aspect-[16/9] bg-[#071B35]">
          <motion.img
            key={activeImage}
            src={activeImage}
            alt={`${title} — image ${activeIndex + 1}`}
            loading="lazy"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover cursor-zoom-in transition-transform duration-500"
            style={{ transform: `scale(${zoomLevel})` }}
            onClick={() => setFullscreen(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#071B35]/40 via-transparent to-transparent pointer-events-none" />

          {images.length > 1 && (
            <>
              <button
                onClick={() => goTo(activeIndex - 1)}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#D4A44A]/80 hover:text-[#071B35] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => goTo(activeIndex + 1)}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white hover:bg-[#D4A44A]/80 hover:text-[#071B35] opacity-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-xs text-slate-300 border border-white/10">
              {activeIndex + 1} / {images.length}
            </span>
            <button
              onClick={() => setFullscreen(true)}
              aria-label="Open fullscreen"
              className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-[#D4A44A]/80 hover:text-[#071B35] transition-all cursor-pointer"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => { setActiveIndex(i); setZoomLevel(1); }}
                aria-label={`View image ${i + 1}`}
                className={`relative shrink-0 w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer ${
                  activeIndex === i
                    ? 'border-[#D4A44A] scale-105 shadow-lg shadow-[#D4A44A]/20'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" loading="lazy" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            <div className="flex items-center justify-between p-4 sm:p-6 shrink-0">
              <span className="text-sm text-slate-400">
                {activeIndex + 1} of {images.length}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomLevel <= 1}
                  aria-label="Zoom out"
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#D4A44A]/80 hover:text-[#071B35] disabled:opacity-30 transition-all cursor-pointer"
                >
                  <ZoomOut className="w-5 h-5" />
                </button>
                <button
                  onClick={handleZoomIn}
                  disabled={zoomLevel >= 3}
                  aria-label="Zoom in"
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-[#D4A44A]/80 hover:text-[#071B35] disabled:opacity-30 transition-all cursor-pointer"
                >
                  <ZoomIn className="w-5 h-5" />
                </button>
                <button
                  onClick={() => { setFullscreen(false); setZoomLevel(1); }}
                  aria-label="Close fullscreen"
                  className="p-2.5 rounded-xl bg-white/10 text-white hover:bg-rose-500/80 transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 relative flex items-center justify-center overflow-hidden px-4 pb-4">
              <motion.img
                key={`fs-${activeImage}`}
                src={activeImage}
                alt={title}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: zoomLevel }}
                transition={{ duration: 0.3 }}
                className="max-w-full max-h-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={() => goTo(activeIndex - 1)}
                    aria-label="Previous"
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#D4A44A] hover:text-[#071B35] transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={() => goTo(activeIndex + 1)}
                    aria-label="Next"
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-[#D4A44A] hover:text-[#071B35] transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
