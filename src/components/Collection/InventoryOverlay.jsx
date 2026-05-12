import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InventoryOverlay = ({ isOpen, onClose }) => {
  // Заглушки для сетки
  const lockedItems = [1, 2, 3, 4, 5, 6];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[150] bg-black flex flex-col overflow-hidden"
        >
          {/* Глубокий фон */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[120px] rounded-full" />
          </div>

          {/* ХЕДЕР */}
          <header className="relative z-10 px-6 pt-10 pb-4 flex items-center">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center active:scale-90 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <h1 className="ml-4 text-2xl font-black italic uppercase tracking-tighter text-white/30">Collection</h1>
          </header>

          {/* КОНТЕНТ (СЕТКА + ЦЕНТРАЛЬНЫЙ БЛОК) */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6">

            {/* Сетка на фоне (заблюрена) */}
            <div className="absolute inset-x-6 top-10 grid grid-cols-2 gap-3 blur-md grayscale opacity-10 pointer-events-none">
              {lockedItems.map((i) => (
                <div key={i} className="aspect-[4/5] rounded-[28px] border border-white/20 bg-white/5" />
              ))}
            </div>

            {/* ГЛАВНЫЙ БЛОК COMING SOON */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center text-center relative z-20"
            >
              <div className="w-20 h-20 bg-blue-600/10 rounded-[32px] flex items-center justify-center mb-6 border border-blue-500/20 shadow-[0_0_50px_rgba(37,99,235,0.15)]">
                <span className="text-4xl drop-shadow-lg">🔒</span>
              </div>

              <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white mb-3">
                Coming Soon
              </h2>

              <p className="max-w-[240px] text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                Inventory & Crafting system is under development
              </p>
            </motion.div>
          </div>

          {/* НИЖНЯЯ ПАНЕЛЬ (МАКСИМАЛЬНО НЕЗАМЕТНАЯ) */}
          <footer className="relative z-10 px-10 pb-12 flex flex-col gap-2 opacity-20 pointer-events-none">

            {/* Crafting */}
            <div className="w-full py-3 bg-white/5 border border-white/5 rounded-2xl flex items-center justify-center gap-2">
              <span className="text-sm grayscale">⚒️</span>
              <span className="text-[12px] font-black italic uppercase tracking-tight text-white/60">Crafting Station</span>
            </div>

            {/* Boxes */}
            <div className="w-full py-3 flex items-center justify-center gap-2">
              <span className="text-sm grayscale opacity-50">📦</span>
              <span className="text-[11px] font-black italic uppercase tracking-tight text-white/40">Open Mystery Box</span>
            </div>

          </footer>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InventoryOverlay;