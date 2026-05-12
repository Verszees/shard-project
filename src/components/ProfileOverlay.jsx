import { motion, AnimatePresence } from 'framer-motion';

const ProfileOverlay = ({ isOpen, onClose, userData }) => {
  // В теории userData прилетает из Telegram (имя, аватарка)
  const username = userData?.first_name || "CRYPTO_KING";
  const level = 12;
  const xpProgress = 65; // Процент до следующего уровня

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 z-[60] backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 150 }}
            style={{
              paddingTop: 'max(1.5rem, var(--app-safe-area-top))',
              paddingBottom: 'max(2.75rem, calc(env(safe-area-inset-bottom, 0px) + 2rem))',
            }}
            className="absolute right-0 top-0 h-full w-full max-w-[380px] z-[70]
                       bg-gradient-to-b from-[#12141c] to-[#08090d] border-l border-white/10 px-8
                       flex flex-col gap-6 shadow-2xl"
          >
            {/* 1. ШАПКА: Юзернейм и Уровень */}
            <div className="relative pt-1">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 p-[2px] shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <div className="w-full h-full rounded-[22px] bg-[#0d0f14] flex items-center justify-center overflow-hidden">
                    {/* Сюда аватарку из ТГ */}
                    <span className="text-2xl font-black italic text-white">{username[0]}</span>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black italic uppercase text-white tracking-tighter leading-none">
                    {username}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Level {level}</span>
                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${xpProgress}%` }}
                        className="h-full bg-blue-500 shadow-[0_0_8px_#3b82f6]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. БАЛАНС: Жирная плашка */}
            <div className="p-6 rounded-[32px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 relative overflow-hidden group">
              <div className="absolute right-[-10%] top-[-20%] w-32 h-32 bg-blue-500/10 blur-[40px] group-hover:bg-blue-500/20 transition-all" />
              <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] mb-1 block">Total Shards</span>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-black italic text-white leading-none">14,250</span>
                <span className="text-blue-500 font-black italic mb-1">SHRDS</span>
              </div>
            </div>

            {/* 3. ДОСТИЖЕНИЯ: Сетка 2х2 */}
            <div className="space-y-4">
              <div className="flex justify-between items-end px-1">
                <h4 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Achievements</h4>
                <span className="text-[9px] font-bold text-blue-500/60 uppercase">View All</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Top 1%", title: "Shards Master", color: "blue" },
                  { label: "Win Streak", title: "7 Games", color: "purple" },
                  { label: "Explorer", title: "All Games", color: "cyan" },
                  { label: "LOCKED", title: "High Roller", color: "gray" }
                ].map((ach, i) => (
                  <div key={i} className={`p-4 rounded-3xl bg-white/5 border border-white/5 ${ach.color === 'gray' ? 'opacity-30' : ''}`}>
                    <span className={`block text-[8px] font-black italic uppercase text-${ach.color}-400 mb-1`}>{ach.label}</span>
                    <span className="text-[11px] text-white font-bold uppercase tracking-tight leading-none">{ach.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. ЗАМЕНА КАСТОМИЗАЦИИ: Daily Quests */}
            <div className="mt-auto pb-10">
              <div className="p-5 rounded-[32px] bg-blue-500/5 border border-blue-500/20">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em]">Daily Quest</h4>
                  <span className="text-[10px] font-black text-white/50">+50 SHRDS</span>
                </div>
                <p className="text-xs text-white/80 font-medium mb-3">Win 3 times in Coin Flip today</p>
                <div className="w-full h-2 bg-white/5 rounded-full border border-white/5 overflow-hidden">
                  <div className="w-2/3 h-full bg-blue-500" />
                </div>
                <div className="mt-2 text-right text-[9px] font-bold text-white/30">2/3 COMPLETED</div>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{ top: 'max(1.25rem, var(--app-safe-area-top))', right: '1.5rem' }}
              className="absolute text-white/20 hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest italic"
            >
              Close [x]
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProfileOverlay;