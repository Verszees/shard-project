import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Scene from './components/Scene';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Background from './components/Background';
import ProfileOverlay from './components/ProfileOverlay';
import HubOverlay from './components/Hub/HubOverlay';
import GamesOverlay from './components/Games/GamesOverlay';
import FriendsOverlay from './components/Friends/FriendsOverlay';
import InventoryOverlay from './components/Collection/InventoryOverlay'; // Импорт нового инвентаря

import CollectionCard from './components/Cards/CollectionCard';
import GameCard from './components/Cards/GameCard';
import TasksCard from './components/Cards/TasksCard';
import FriendsCard from './components/Cards/FriendsCard';
import HubCard from './components/Cards/HubCard';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);

  useEffect(() => {
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1100);
      return () => clearTimeout(contentTimer);
    }, 2500);
    return () => clearTimeout(loadTimer);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-transparent relative select-none antialiased bg-black overflow-x-hidden">
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .ios-blur { backdrop-filter: blur(25px) saturate(160%); -webkit-backdrop-filter: blur(25px) saturate(160%); }
      `}</style>

      <Background />

      <div className="relative z-10 w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          {/* Рендерим главный экран только если НЕ открыты другие полноэкранные разделы */}
          {!isHubOpen && !isGamesOpen && !isFriendsOpen && !isInventoryOpen ? (
            <motion.div
              key="main-screen"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {!isProfileOpen && (
                <>
                  <div
                    className="w-full relative z-50 shrink-0"
                    style={{ minHeight: 'var(--app-header-slot-min, calc(var(--app-safe-area-top) + 3rem))' }}
                  >
                    <AnimatePresence>
                      {/* Скрываем Header (Links/Connect) если открыт инвентарь */}
                      {showContent && !isInventoryOpen && (
                        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                          <Header />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="w-full h-[75vh] flex items-center justify-center relative z-[5] overflow-visible pointer-events-none">
                    <div className="w-full h-full pointer-events-auto">
                      <motion.div
                        className="w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                      >
                        <Scene
                          isLoading={isLoading}
                          onCrystalClick={() => setIsProfileOpen(true)}
                          isProfileOpen={isProfileOpen}
                          isHubOpen={false}
                        />
                      </motion.div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showContent && (
                      <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="px-5 w-full max-w-[430px] mt-[-15vh] pb-44 relative z-20"
                      >
                        <div className="space-y-3.5">
                          <CollectionCard
                            isInventoryOpen={isInventoryOpen}
                            setIsInventoryOpen={setIsInventoryOpen}
                          />
                          <GameCard onClick={() => setIsGamesOpen(true)} />
                          <div className="grid grid-cols-2 gap-3.5">
                            <TasksCard onClick={() => setIsHubOpen(true)} />
                            <FriendsCard onClick={() => setIsFriendsOpen(true)} />
                          </div>
                          <HubCard onClick={() => setIsHubOpen(true)} />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </>
              )}
            </motion.div>
          ) : isFriendsOpen ? (
            <motion.div
              key="friends-screen"
              className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-3xl"
              initial={{ opacity: 0, scale: 1.1, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <FriendsOverlay onClose={() => setIsFriendsOpen(false)} />
            </motion.div>
          ) : isHubOpen ? (
            <motion.div
              key="hub-screen"
              className="fixed inset-0 z-[100] overflow-y-auto pb-44 bg-black/70 backdrop-blur-xl"
              style={{ paddingTop: 'var(--app-safe-area-top)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="fixed inset-0 z-[-1] opacity-30 grayscale pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <Scene isLoading={false} isHubOpen={true} />
              </motion.div>
              <HubOverlay onClose={() => setIsHubOpen(false)} />
            </motion.div>
          ) : isGamesOpen ? (
            <motion.div
              key="games-screen"
              className="fixed inset-0 z-[100] overflow-y-auto pb-44 bg-black/70 backdrop-blur-xl"
              style={{ paddingTop: 'var(--app-safe-area-top)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <GamesOverlay />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* Инвентарь рендерится поверх всего */}
      <InventoryOverlay
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
      />

      {showContent && !isProfileOpen && !isInventoryOpen && (
        <Navbar
          onHubClick={() => { setIsHubOpen(true); setIsGamesOpen(false); setIsFriendsOpen(false); }}
          onHomeClick={() => { setIsHubOpen(false); setIsGamesOpen(false); setIsFriendsOpen(false); }}
          onGamesClick={() => { setIsGamesOpen(true); setIsHubOpen(false); setIsFriendsOpen(false); }}
          activeTab={isHubOpen ? 'hub' : isGamesOpen ? 'games' : isFriendsOpen ? 'friends' : 'home'}
          isInventoryOpen={isInventoryOpen}
        />
      )}

      <ProfileOverlay isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}