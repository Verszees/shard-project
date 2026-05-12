import React from 'react';
import { motion } from 'framer-motion';

const FriendsOverlay = ({ onClose }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } }
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black text-white flex flex-col overflow-hidden pt-[max(4rem,var(--app-safe-area-top))]"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Атмосферное свечение на фоне */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-20%] w-[70%] h-[70%] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      {/* Кнопка закрытия */}
      <motion.button
        variants={itemVariants}
        onClick={onClose}
        className="absolute right-6 top-[max(1rem,var(--app-safe-area-top))] w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-2xl z-50 active:scale-90 transition-transform"
      >
        ×
      </motion.button>

      <div className="relative z-10 w-full px-6 flex flex-col">
        {/* Заголовок */}
        <motion.header variants={itemVariants} className="mb-8">
          <h1 className="text-[44px] font-black italic uppercase tracking-tighter leading-none text-white">
            Friends
          </h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]" />
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-500">
              Invite and get rewards
            </p>
          </div>
        </motion.header>

        {/* Карточка статистики */}
        <motion.div
          variants={itemVariants}
          className="w-full bg-gradient-to-br from-[#111] to-[#080808] border border-white/10 rounded-[35px] p-7 relative overflow-hidden shadow-2xl mb-12"
        >
          <div className="absolute -right-12 -top-12 w-40 h-40 bg-blue-600/10 blur-[60px] rounded-full pointer-events-none" />
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-6 font-sans">Your Referral Stats</h2>
          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <p className="text-4xl font-black italic tracking-tighter">0</p>
              <p className="text-[9px] uppercase font-black text-white/50 tracking-widest font-sans">Total Friends</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-2xl font-black italic text-blue-500">+0 $SHRD</p>
              <p className="text-[9px] uppercase font-black text-white/50 tracking-widest font-sans">Earned Bonus</p>
            </div>
          </div>
        </motion.div>

        {/* Блок с подарком */}
        <motion.div
          variants={itemVariants}
          className="w-full flex flex-col items-center"
        >
          <div className="w-24 h-24 mb-4 relative">
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full" />
            <img
              src="/gift.png"
              alt="Empty"
              className="w-full h-full object-contain grayscale opacity-20 relative z-10"
            />
          </div>
          <p className="text-[11px] italic font-black text-white/20 uppercase tracking-[0.25em]">
            No recruits yet
          </p>
        </motion.div>
      </div>

      {/* Кнопка приглашения — УМЕНЬШЕННАЯ */}
      <motion.div
        variants={itemVariants}
        className="fixed bottom-32 left-0 w-full px-10 z-50"
      >
        <button className="w-full py-4 bg-white text-black rounded-2xl font-black italic uppercase text-[14px] tracking-tight active:scale-[0.96] transition-all shadow-[0_15px_30px_rgba(255,255,255,0.1)] flex items-center justify-center gap-2">
          <span className="text-lg">➕</span>
          Invite a Friend
        </button>
        <p className="text-center mt-3 text-[9px] font-bold text-white/20 uppercase tracking-[0.2em]">
          Earn 10% of their rewards
        </p>
      </motion.div>
    </motion.div>
  );
};

export default FriendsOverlay;