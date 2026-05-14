const Background = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* База: мягкий вертикальный градиент */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              165deg,
              #050508 0%,
              #0a0b12 28%,
              #0c0e18 52%,
              #090a10 78%,
              #060608 100%
            )
          `,
        }}
      />

      {/* Лёгкое тёпло-синее свечение сверху */}
      <div
        className="absolute -top-[5%] left-1/2 -translate-x-1/2 w-[120%] h-[55%] opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(59, 130, 246, 0.11) 0%, rgba(15, 23, 42, 0) 68%)',
        }}
      />

      {/* Очень мягкий индиго снизу */}
      <div
        className="absolute -bottom-[8%] left-1/2 -translate-x-1/2 w-[110%] h-[50%] opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
        }}
      />

      {/* Едва заметная текстура */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default Background;
