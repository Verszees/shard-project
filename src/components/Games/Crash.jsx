import React from 'react';

const Crash = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[120px] rounded-[24px] bg-gradient-to-br from-[#1a1a1a] via-[#0f0f0f] to-[#050505] border border-white/10 relative overflow-hidden active:scale-[0.96] transition-all duration-300 group shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transform-gpu"
    >
      <div className="absolute top-4 left-4 z-20 pointer-events-none">
        <h3 className="text-[18px] font-black italic uppercase tracking-tighter text-white leading-[0.95] drop-shadow-md">
          Crash
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-pulse shadow-[0_0_8px_#a855f7]" />
          <p className="text-[8px] font-black text-purple-400 uppercase tracking-widest">To Moon</p>
        </div>
      </div>

      {/* Обертка для ПНГ и свечения с фиксом мерцания */}
      <div className="absolute bottom-[14%] right-[-8%] w-[80%] h-[75%] z-10 pointer-events-none transform-gpu" style={{ backfaceVisibility: 'hidden' }}>
        {/* Подсветка: добавил will-change и translate-z-0 для стабильности */}
        <div className="absolute inset-0 bg-purple-500/15 blur-[25px] rounded-full will-change-[filter] transform-gpu" style={{ transform: 'translateZ(0)' }} />
        <img
          src="/crash.png"
          alt="Rocket"
          className="w-full h-full object-contain object-bottom transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-6 drop-shadow-[0_10px_15px_rgba(0,0,0,0.8)] will-change-transform"
        />
      </div>

      <div className="absolute inset-0 z-30 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};

export default Crash;