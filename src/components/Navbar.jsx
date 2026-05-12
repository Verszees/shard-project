import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ onHubClick, onHomeClick, onGamesClick, activeTab, isInventoryOpen }) => {
  return (
    <AnimatePresence>
      {!isInventoryOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] z-[110] pointer-events-auto"
        >
          <div className="ios-blur bg-black/40 border border-white/[0.08] rounded-[45px] p-1.5 flex justify-between items-center shadow-2xl">
            <button onClick={onHomeClick} className="relative flex-1 py-4 flex items-center justify-center transition-all">
              {activeTab === 'home' && (
                <motion.div layoutId="nav-pill-bg" className="absolute inset-y-0 inset-x-0 bg-[#2c2c2e]/80 rounded-[35px] shadow-lg" />
              )}
              <span className={`relative z-10 text-[13px] font-black uppercase tracking-tighter italic ${activeTab === 'home' ? 'text-white' : 'text-gray-400'}`}>
                Home
              </span>
            </button>

            <button onClick={onGamesClick} className="relative flex-1 py-4 flex items-center justify-center active:scale-95 transition-all">
              {activeTab === 'games' && (
                <motion.div layoutId="nav-pill-bg" className="absolute inset-y-0 inset-x-0 bg-[#2c2c2e]/80 rounded-[35px] shadow-lg" />
              )}
              <span className={`relative z-10 text-[13px] font-black uppercase tracking-tighter italic ${activeTab === 'games' ? 'text-white' : 'text-gray-400'}`}>
                Games
              </span>
            </button>

            <button onClick={onHubClick} className="relative flex-1 py-4 flex items-center justify-center transition-all">
              {activeTab === 'hub' && (
                <motion.div layoutId="nav-pill-bg" className="absolute inset-y-0 inset-x-0 bg-[#2c2c2e]/80 rounded-[35px] shadow-lg" />
              )}
              <span className={`relative z-10 text-[13px] font-black uppercase tracking-tighter italic ${activeTab === 'hub' ? 'text-white' : 'text-gray-400'}`}>
                Hub
              </span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;