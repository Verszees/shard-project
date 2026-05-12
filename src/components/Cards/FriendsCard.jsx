import React from 'react';

const FriendsCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick} // Вешаем клик
      className="bg-[#0f0f0f] rounded-[30px] border border-white/5 px-5 h-[125px] flex items-center relative group overflow-hidden active:scale-[0.93] transition-all duration-200 gpu-layer select-none touch-none cursor-pointer"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative z-20 pointer-events-none">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_#3b82f6]" />
          <h3 className="text-[12px] font-black italic uppercase tracking-tight leading-[1.1] text-white">Invite<br />Friends</h3>
        </div>
      </div>
      <div className="absolute -right-2 top-[48%] -translate-y-1/2 w-28 h-28 z-10 transition-transform duration-700 group-hover:scale-105 pointer-events-none">
        <div className="absolute inset-0 bg-blue-400/20 blur-[25px] rounded-full scale-75" />
        <img
          src="/gift.png"
          alt="gift"
          style={{transform: 'rotate(-5deg)'}}
          draggable={false}
          className="relative z-10 w-full h-full object-contain opacity-90"
        />
      </div>
    </div>
  );
};

export default FriendsCard;