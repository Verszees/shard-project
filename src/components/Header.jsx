import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const menuRef = useRef(null);

  const socialLinks = [
    {
      name: 'Telegram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
      ),
      url: 'https://t.me/TheShardProject' // Замени на актуальную, если будет другая
    },
    {
      name: 'Instagram',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
      ),
      url: 'https://www.instagram.com/projecttheshard/'
    },
    {
      name: 'X.com',
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      ),
      url: 'https://x.com/TheShardProject'
    },
    {
      name: 'Support',
      icon: (
        /* Упрощенная иконка чашки — будет четкой даже в маленьком меню */
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      ),
      url: 'https://buymeacoffee.com/theShard'
    },
  ];

  const handleOpenLink = (url) => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.openLink(url);
    } else {
      window.open(url, '_blank');
    }
    setIsLinksOpen(false);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-[100] px-4 flex justify-between items-start pointer-events-none"
      style={{
        paddingTop: 'var(--app-header-pad-top, var(--app-safe-area-top, 16px))',
      }}
    >

      {/* CONNECT BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full shadow-lg"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-90">
          <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1" />
          <path d="M16 12h5" />
          <circle cx="18" cy="12" r="1" fill="white" />
        </svg>
        <span className="text-[11px] font-black italic uppercase tracking-wider text-white">Connect</span>
      </motion.button>

      {/* LINKS DROPDOWN */}
      <div className="relative flex flex-col items-end" ref={menuRef}>
        <motion.button
          onClick={() => setIsLinksOpen(!isLinksOpen)}
          whileTap={{ scale: 0.97 }}
          className="pointer-events-auto flex items-center gap-1.5 px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full shadow-lg"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
          </svg>
          <span className="text-[11px] font-bold text-white tracking-wide">Links</span>
        </motion.button>

        <AnimatePresence>
          {isLinksOpen && (
            <motion.div
              initial={{ opacity: 0, y: 5, scale: 0.98 }}
              animate={{ opacity: 1, y: 8, scale: 1 }}
              exit={{ opacity: 0, y: 5, scale: 0.98 }}
              className="pointer-events-auto w-56 bg-[#111111] rounded-[20px] shadow-2xl border border-white/5 overflow-hidden"
            >
              <div className="flex flex-col">
                {socialLinks.map((link, index) => (
                  <React.Fragment key={link.name}>
                    <button
                      onClick={() => handleOpenLink(link.url)}
                      className="flex items-center justify-between px-5 py-4 active:bg-white/5 transition-colors w-full text-left"
                    >
                      <span className="text-[15px] font-medium text-white/90">{link.name}</span>
                      <span className={link.name === 'Support' ? "text-yellow-500" : "text-white/80"}>
                        {link.icon}
                      </span>
                    </button>
                    {index < socialLinks.length - 1 && (
                      <div className="h-[1px] bg-white/[0.04] mx-4" />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* BACKDROP FOR CLOSE */}
      {isLinksOpen && (
        <div
          className="fixed inset-0 z-[-1] pointer-events-auto"
          onClick={() => setIsLinksOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;