import React from 'react';

// Добавляем onClick в аргументы компонента
const HubCard = ({ onClick }) => {
  return (
    <div
      // Привязываем событие клика к контейнеру
      onClick={onClick}
      className="w-full h-[110px] rounded-[32px] bg-[#0f0f0f] border border-white/5 flex items-center pl-8 relative overflow-hidden active:scale-[0.96] transition-transform duration-200 group gpu-layer cursor-pointer"
    >
      <div className="z-20 relative pointer-events-none">
        <h3 className="text-lg font-black italic uppercase tracking-tighter text-white leading-tight">Hub &<br/>Partners</h3>
        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">Exclusive Drops</p>
      </div>

      <div className="absolute right-[-10px] top-0 bottom-0 w-48 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-full h-full flex items-center justify-center animate-soft-float">
          {/* Свечение */}
          <div className="absolute w-24 h-24 bg-purple-600/30 blur-[40px] rounded-full scale-100 group-hover:scale-150 transition-transform duration-1000" />

          <img
            src="/octarine.png"
            alt="octarine"
            className="relative z-10 w-44 h-44 object-contain opacity-90 group-hover:opacity-100 scale-100 group-hover:scale-105 transition-all duration-1000 ease-out animate-slow-spin"
          />
        </div>
      </div>
    </div>
  );
};

export default HubCard;