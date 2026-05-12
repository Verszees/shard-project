import React, { useState } from 'react';
import { motion } from 'framer-motion';
import OracleMain from './OracleMain';
import CoinFlip from './CoinFlip';
import Crash from './Crash';

const GamesOverlay = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      className="w-full px-5 pt-8 space-y-4 pb-24"
      variants={containerVariants}
      initial="hidden"
      animate={videoLoaded ? "visible" : "hidden"}
    >
      <motion.h1 variants={itemVariants} className="text-2xl font-black italic uppercase tracking-tighter text-white px-1">
        Available Games
      </motion.h1>

      <motion.div variants={itemVariants}>
        <OracleMain onReady={() => setVideoLoaded(true)} onClick={() => console.log('Open Oracle')} />
      </motion.div>

      <div className="grid grid-cols-2 gap-3.5">
        <motion.div variants={itemVariants}>
          <CoinFlip onClick={() => console.log('Open CoinFlip')} />
        </motion.div>

        <motion.div variants={itemVariants}>
          <Crash onClick={() => console.log('Open Crash')} />
        </motion.div>
      </div>

      {/* ОБНОВЛЕННЫЙ БЛОК С ЗАМКОМ */}
      <motion.div
        variants={itemVariants}
        className="w-full p-6 rounded-[32px] bg-white/5 border border-white/5 flex items-center justify-between opacity-40"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">
          More games coming soon
        </span>

        <div className="flex items-center justify-center w-9 h-9 rounded-2xl bg-white/5 border border-white/10 shadow-inner">
          {/* Иконка замка */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-50"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GamesOverlay;