import React from 'react';
import { motion } from 'framer-motion';
import InventoryOverlay from "../Collection/InventoryOverlay";

const CollectionCard = ({ isInventoryOpen, setIsInventoryOpen }) => {
  return (
    <>
      <div
        onClick={() => setIsInventoryOpen(true)}
        className="w-full rounded-[32px] bg-[#0a0a0a] border border-white/10 p-7 pb-8 relative overflow-hidden active:scale-[0.96] transition-transform duration-200 shadow-2xl gpu-layer group cursor-pointer"
      >
        <div className="relative z-20 flex flex-col justify-between">
          <div className="mb-6">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-white italic uppercase tracking-wider">Level 12</span>
              <div className="flex-1 max-w-[80px] h-[5px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div className="w-2/3 h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]" />
              </div>
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mt-1">
              Your Collection
            </h3>
          </div>

          <div className="flex items-center gap-6 mt-2">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-blue-500/60 uppercase tracking-[0.2em] mb-0.5">
                Shards Balance
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black italic text-white tracking-tighter">1,250</span>
                <span className="text-[10px] font-bold text-blue-400/80 italic">$SHRD</span>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-white/10 self-end mb-1" />
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-purple-500/60 uppercase tracking-[0.2em] mb-0.5">
                NFT Assets
              </span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black italic text-white tracking-tighter">12</span>
                <span className="text-[10px] font-bold text-purple-400/80 italic">NFT</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-[-75px] top-1/2 -translate-y-1/2 w-[270px] h-[270px] pointer-events-none z-10">
          <div className="absolute inset-0 bg-blue-500/15 blur-[60px] rounded-full scale-75 animate-pulse" />
          <motion.img
            src="/crystal.png"
            alt="crystal"
            className="w-full h-full object-contain relative z-10 opacity-90 group-hover:opacity-100 transition-all duration-500"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 3, 0]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.03] via-transparent to-purple-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>

      <InventoryOverlay
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
      />
    </>
  );
};

export default CollectionCard;