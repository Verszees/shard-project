import React from 'react';

export default function TaskItem({ icon, title, reward, description }) {
  return (
    <div className="bg-[#111] border border-white/5 rounded-[24px] p-4 flex items-center justify-between group active:bg-[#151515] transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <p className="font-bold text-[15px]">{title}</p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-blue-400 text-xs font-black">+ {reward} $SHRD</span>
          </div>
        </div>
      </div>
      <button className="bg-white/10 hover:bg-white text-white hover:text-black px-5 py-2 rounded-full text-xs font-black transition-all">
        GO
      </button>
    </div>
  );
}