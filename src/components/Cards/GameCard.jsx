import React from 'react';

// Добавляем пропсы title, subtitle и image
const GameCard = ({ onClick, title, subtitle, image }) => {
  return (
    <div
      onClick={onClick}
      className="w-full h-[120px] rounded-[32px] bg-[#0d0d0d] border border-white/10 relative overflow-hidden active:scale-[0.96] transition-all duration-300 group shadow-2xl select-none touch-none isolation-auto cursor-pointer"
      style={{
        isolation: 'isolate',
        WebkitMaskImage: '-webkit-radial-gradient(white, black)',
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="absolute -left-4 top-0 w-24 h-24 bg-blue-600/5 blur-[30px] rounded-full pointer-events-none z-0" />

      {/* ЮЗАЕМ ТИТЛ ИЗ ПРОПСОВ */}
      <div className="absolute inset-y-0 left-7 flex flex-col justify-center z-30 pointer-events-none text-left">
        <h3 className="text-[20px] font-black italic uppercase tracking-tighter text-white leading-[0.9] drop-shadow-md whitespace-pre-line">
          {title || "The\nGames"}
        </h3>
        <div className="flex items-center gap-1.5 mt-2">
          <span className="w-1 h-1 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_#3b82f6]" />
          <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.15em]">
            {subtitle || "Play Now"}
          </p>
        </div>
      </div>

      <div
        className="absolute inset-0 z-10"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 20%, black 50%)',
          maskImage: 'linear-gradient(to right, transparent 20%, black 50%)',
        }}
      >
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500/20 blur-[45px] rounded-full animate-pulse z-0" />

        {/* ЮЗАЕМ КАРТИНКУ ИЗ ПРОПСОВ */}
        <img
          src={image || "/Oracle.png"}
          alt={title}
          draggable={false}
          className="absolute right-0 top-0 h-full w-[85%] object-cover object-right transition-transform duration-1000 ease-out group-hover:scale-105 filter saturate-[1.1] pointer-events-none z-10"
        />
      </div>

      <div className="absolute inset-0 z-40 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
};

export default GameCard;