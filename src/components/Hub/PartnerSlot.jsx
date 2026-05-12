import React from 'react';

export default function PartnerSlot({ label, isLocked }) {
  return (
    <div className="relative h-28 rounded-[28px] border-2 border-dashed border-white/5 flex flex-col items-center justify-center group overflow-hidden bg-white/[0.01]">
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors duration-500" />

      {isLocked && (
        <div className="flex flex-col items-center relative z-10">
          <span className="text-xl opacity-30 mb-1">🔒</span>
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">{label}</p>
        </div>
      )}

      {/* Анимация сканирования */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/20 blur-sm animate-scan" />

      <style>{`
        @keyframes scan {
          0% { top: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan { animation: scan 3s linear infinite; }
      `}</style>
    </div>
  );
}