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
import InventoryOverlay from './components/Collection/InventoryOverlay'; // Імпорт нового інвентаря

import CollectionCard from './components/Cards/CollectionCard';
import GameCard from './components/Cards/GameCard';
import ShopCard from './components/Cards/ShopCard';
import ShopOverlay from './components/Shop/ShopOverlay';
import FriendsCard from './components/Cards/FriendsCard';
import HubCard from './components/Cards/HubCard';

export default function App() {
  const [appReady, setAppReady] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHubOpen, setIsHubOpen] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isFriendsOpen, setIsFriendsOpen] = useState(false);
  const [isInventoryOpen, setIsInventoryOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAppReady(true), 720);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen text-white font-sans selection:bg-transparent relative select-none antialiased bg-[#050508] overflow-x-hidden">
      <style>{`
        ::-webkit-scrollbar { width: 0px; background: transparent; }
        .ios-blur { backdrop-filter: blur(25px) saturate(160%); -webkit-backdrop-filter: blur(25px) saturate(160%); }
      `}</style>

      <Background />

      <AnimatePresence>
        {!appReady && (
          <motion.div
            key="boot-splash"
            className="fixed inset-0 z-[500] bg-black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </AnimatePresence>

      <div className="relative z-10 w-full flex flex-col items-center min-h-[100dvh]">
        <AnimatePresence mode="wait">
          {/* Рендерим головний екран тільки якщо НЕ відкрити інші повноекранні розділи */}
          {!isHubOpen && !isGamesOpen && !isFriendsOpen && !isShopOpen ? (
            <motion.div
              key="main-screen"
              className="w-full flex flex-col flex-1 min-h-0 items-stretch"
              initial={{ opacity: 0 }}
              animate={{ opacity: appReady ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              {!isProfileOpen && (
                <>
                  <div
                    className="w-full relative z-50 shrink-0"
                    style={{ minHeight: 'var(--app-header-slot-min, calc(var(--app-safe-area-top) + 3rem))' }}
                  >
                    <AnimatePresence>
                      {appReady && !isInventoryOpen && (
                        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
                          <Header />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {appReady && (
                    <div className="w-full max-w-[430px] mx-auto flex flex-1 flex-col min-h-0 px-5 overflow-x-hidden overflow-y-visible">
                      {/* Кристал вне скролла карточок — верх не різається overflow */}
                      <div className="relative z-[25] flex shrink-0 justify-center overflow-visible pt-2 pb-1 min-h-[min(200px,22vh)]">
                        <div className="w-[min(78vw,268px)] h-[min(200px,28vh)] max-h-[220px] overflow-visible">
                          <Scene
                            compact
                            isLoading={false}
                            onCrystalClick={() => setIsProfileOpen(true)}
                            isProfileOpen={isProfileOpen}
                            isHubOpen={false}
                          />
                        </div>
                      </div>
                      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden pb-[max(14.5rem,calc(env(safe-area-inset-bottom,0px)+12.25rem))]">
                        <motion.div
                          initial={{ opacity: 0, y: 28 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
                          className="space-y-3.5"
                        >
                          <CollectionCard
                            isInventoryOpen={isInventoryOpen}
                            setIsInventoryOpen={setIsInventoryOpen}
                          />
                          <GameCard onClick={() => setIsGamesOpen(true)} />
                          <div className="grid grid-cols-2 gap-3.5">
                            <ShopCard onClick={() => setIsShopOpen(true)} />
                            <FriendsCard onClick={() => setIsFriendsOpen(true)} />
                          </div>
                          <HubCard onClick={() => setIsHubOpen(true)} />
                        </motion.div>
                      </div>
                    </div>
                  )}
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
          ) : isShopOpen ? (
            <motion.div
              key="shop-screen"
              className="fixed inset-0 z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
            >
              <ShopOverlay onClose={() => setIsShopOpen(false)} />
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

      {/* Інвентар рендерується поверх всього */}
      <InventoryOverlay
        isOpen={isInventoryOpen}
        onClose={() => setIsInventoryOpen(false)}
      />

      {appReady && !isProfileOpen && !isInventoryOpen && (
        <Navbar
          onHubClick={() => { setIsHubOpen(true); setIsGamesOpen(false); setIsFriendsOpen(false); setIsShopOpen(false); }}
          onHomeClick={() => { setIsHubOpen(false); setIsGamesOpen(false); setIsFriendsOpen(false); setIsShopOpen(false); }}
          onGamesClick={() => { setIsGamesOpen(true); setIsHubOpen(false); setIsFriendsOpen(false); setIsShopOpen(false); }}
          activeTab={isHubOpen ? 'hub' : isGamesOpen ? 'games' : isFriendsOpen ? 'friends' : 'home'}
          isInventoryOpen={isInventoryOpen}
        />
      )}

      <ProfileOverlay isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />
    </div>
  );
}
