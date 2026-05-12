import React from 'react';

const Background = () => {
  return (
    <div className="fixed inset-0 z-0 bg-black overflow-hidden pointer-events-none">
      {/* Левое фиолетовое свечение */}
      <div
        className="absolute top-[-10%] left-[-20%] w-[70%] h-[120%] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Правое фиолетовое свечение */}
      <div
        className="absolute top-[-10%] right-[-20%] w-[70%] h-[120%] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Дополнительный слой шума для текстуры (по желанию) */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
           }}
      />
    </div>
  );
};

export default Background;