import React from 'react';

// Добавили onClick в деструктуризацию пропсов
const TasksCard = ({ onClick }) => {
  return (
    <div
      onClick={onClick} // Вешаем событие клика
      className="bg-[#0f0f0f] rounded-[30px] border border-white/5 px-6 h-[125px] flex items-center relative group overflow-hidden active:scale-[0.95] transition-transform duration-200 gpu-layer select-none touch-none cursor-pointer"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className="relative z-20 pointer-events-none">
        <h3 className="text-[11px] font-black italic uppercase tracking-widest leading-tight text-white">Complete<br />Tasks</h3>
        <span className="text-[9px] font-black text-blue-400 uppercase italic mt-1 block">8 Available</span>
      </div>
      <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-36 h-36 z-10 transition-transform duration-500 group-hover:scale-105 pointer-events-none">
        <div className="absolute inset-0 bg-blue-500/20 blur-[30px] rounded-full scale-75" />
        <img
          src="/tasks.png"
          alt="tasks"
          draggable={false}
          className="relative z-10 w-full h-full object-contain opacity-90"
        />
      </div>
    </div>
  );
};

export default TasksCard;