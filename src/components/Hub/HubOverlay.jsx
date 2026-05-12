import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HubOverlay = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('missions');

  return (
    <div className="flex flex-col items-center px-5 pb-32 pt-[max(2.5rem,var(--app-safe-area-top))]">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[430px] mb-8"
      >
        <h1 className="text-4xl font-black italic tracking-tighter uppercase leading-none">HUB</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-bold opacity-80">
          Tasks & Partners
        </p>
      </motion.div>

      <div className="w-full max-w-[430px] flex p-1 bg-white/5 border border-white/10 rounded-2xl mb-8 backdrop-blur-md">
        <button
          onClick={() => setActiveTab('missions')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${
            activeTab === 'missions' ? 'text-black' : 'text-white/50'
          }`}
        >
          <span className="relative z-10">Tasks</span>
          {activeTab === 'missions' && (
            <motion.div
              layoutId="hub-pill"
              className="absolute inset-0 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          )}
        </button>
        <button
          onClick={() => setActiveTab('partners')}
          className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 relative ${
            activeTab === 'partners' ? 'text-black' : 'text-white/50'
          }`}
        >
          <span className="relative z-10">Partners</span>
          {activeTab === 'partners' && (
            <motion.div
              layoutId="hub-pill"
              className="absolute inset-0 bg-white rounded-xl shadow-[0_0_15px_rgba(255,255,255,0.2)]"
            />
          )}
        </button>
      </div>

      <div className="w-full max-w-[430px] relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.98, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -5 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="space-y-3"
          >
            {activeTab === 'missions' ? (
              <div className="space-y-3">
                <h2 className="text-[10px] font-bold text-white/30 uppercase tracking-widest ml-1 mb-2">
                  Available Tasks
                </h2>
                <TaskCard icon="📢" title="Join Telegram" reward="+ 1,000 $SHRD" />
                <TaskCard icon="🐦" title="Follow on X" reward="+ 800 $SHRD" />
                <TaskCard icon="🔥" title="Daily Check-in" reward="+ 500 $SHRD" />
              </div>
            ) : (
              <div className="p-8 rounded-[32px] bg-gradient-to-b from-white/10 to-transparent border border-white/10 backdrop-blur-xl text-center">
                <span className="text-3xl mb-2 block">🤝</span>
                <h3 className="text-lg font-black italic uppercase tracking-tight">Become a Partner</h3>
                <p className="text-[11px] text-white/50 mb-6 px-4 leading-relaxed">
                  Connect your project to our active users.
                </p>
                <button className="w-full py-4 bg-white text-black rounded-full font-black italic uppercase text-sm active:scale-95 transition-transform">
                  Contact Admin
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Простой компонент карточки без лишних variants
const TaskCard = ({ icon, title, reward }) => (
  <div className="group flex items-center justify-between p-4 rounded-[24px] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] transition-all duration-300 active:scale-98">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-xl border border-white/10">
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-[14px] leading-tight">{title}</h4>
        <p className="text-blue-400 font-bold text-[11px] mt-0.5">{reward}</p>
      </div>
    </div>
    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-[10px] font-black group-hover:bg-white group-hover:text-black transition-all">
      GO
    </div>
  </div>
);

export default HubOverlay;