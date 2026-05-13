import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

// Конфигурация паков
const PACKS = [
  { id: 'p1', shards: 850, ton: '0.84', usdt: '2.50', stars: 129 },
  { id: 'p2', shards: 4750, ton: '4.20', usdt: '12.00', stars: 599 },
  { id: 'p3', shards: 12000, ton: '9.90', usdt: '28.00', stars: 1249 },
];

const METHODS = [
  { id: 'ton', label: 'TON' },
  { id: 'usdt', label: 'USDT' },
  { id: 'stars', label: 'Stars' },
];

function formatShards(n) {
  return new Intl.NumberFormat('en-US').format(n);
}

const ShopOverlay = ({ onClose }) => {
  const [method, setMethod] = useState('ton');
  const [selectedId, setSelectedId] = useState(PACKS[1].id);
  const [promo, setPromo] = useState('');
  
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const tw = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

  // Расчет выбранного пака
  const selected = useMemo(
    () => PACKS.find((p) => p.id === selectedId) ?? PACKS[0],
    [selectedId]
  );

  const priceLabel = useMemo(() => {
    if (method === 'ton') return `${selected.ton} TON`;
    if (method === 'usdt') return `${selected.usdt} USDT`;
    return `${selected.stars} Stars`;
  }, [method, selected]);

  // Уведомления через Telegram API или браузер
  const notify = (message, title = 'Shop') => {
    if (tw?.showPopup) {
      tw.showPopup({ title, message, buttons: [{ type: 'ok' }] });
    } else {
      window.alert(`${title}\n\n${message}`);
    }
  };

  const handlePay = () => {
    if (method === 'ton') {
      if (!wallet) {
        void tonConnectUI.openModal();
        return;
      }
      notify(
        'Transaction request sent to your wallet. Shards will be added after confirmation.',
        'Payment'
      );
      // Здесь должна быть логика tonConnectUI.sendTransaction(...)
      return;
    }
    
    if (method === 'usdt') {
      if (!wallet) {
        void tonConnectUI.openModal();
        return;
      }
      notify('USDT payments are processed via smart-contract.', 'USDT Payment');
      return;
    }

    notify('Invoice system for Stars is being initialized...', 'Telegram Stars');
  };

  // Анимации
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.02 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050508] text-white flex flex-col overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* Background Glows / Декоративные свечения */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-15%] w-[80%] h-[45%] bg-blue-600/10 blur-[110px] rounded-full" />
        <div className="absolute bottom-[-15%] left-[-15%] w-[70%] h-[45%] bg-violet-600/6 blur-[100px] rounded-full" />
      </div>

      {/* Close Button - Смещена ниже, чтобы не перекрываться системными кнопками TG */}
      <motion.button
        variants={itemVariants}
        onClick={onClose}
        className="absolute right-6 top-24 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-2xl z-50 active:scale-90 transition-transform"
      >
        ×
      </motion.button>

      <div className="relative z-10 flex flex-col h-full w-full max-w-[430px] mx-auto px-6 pt-20 pb-32">
        
        {/* Заголовок */}
        <motion.header variants={itemVariants} className="mb-8">
          <h1 className="text-[44px] font-black italic uppercase tracking-tighter leading-none">Shop</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.25em] text-blue-400 mt-2">
            Buy TG Shards ($SHRD)
          </p>
        </motion.header>

        {/* Поле Промокода */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative flex items-center">
            <input
              type="text"
              value={promo}
              onChange={(e) => setPromo(e.target.value.toUpperCase())}
              placeholder="PROMO CODE"
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-5 text-[11px] font-bold tracking-widest placeholder:text-white/20 focus:border-blue-500/40 outline-none transition-all"
            />
            <button 
              onClick={() => promo && notify(`Checking code: ${promo}`, 'Promo')}
              className="absolute right-2.5 bg-blue-600 hover:bg-blue-500 text-[10px] font-black px-4 py-2 rounded-xl active:scale-95 transition-all"
            >
              APPLY
            </button>
          </div>
        </motion.div>

        {/* Выбор метода оплаты */}
        <motion.div variants={itemVariants} className="flex gap-2 mb-8">
          {METHODS.map((m) => (
            <button
              key={m.id}
              onClick={() => setMethod(m.id)}
              className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-wider border transition-all ${
                method === m.id
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.1)]'
                  : 'bg-white/5 border-white/10 text-white/50'
              }`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        {/* Список паков (Скроллируемая область) */}
        <motion.div variants={itemVariants} className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
          {PACKS.map((pack) => {
            const active = pack.id === selectedId;
            return (
              <button
                key={pack.id}
                onClick={() => setSelectedId(pack.id)}
                className={`w-full text-left rounded-[28px] border p-6 transition-all ${
                  active
                    ? 'border-blue-500 bg-blue-500/10 shadow-[0_0_30px_rgba(59,130,246,0.08)]'
                    : 'border-white/10 bg-white/[0.04] active:bg-white/[0.08]'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-black italic">
                      {formatShards(pack.shards)}
                      <span className="text-sm not-italic text-blue-400 ml-2">$SHRD</span>
                    </p>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">
                      {method === 'ton' && `${pack.ton} TON`}
                      {method === 'usdt' && `${pack.usdt} USDT`}
                      {method === 'stars' && `${pack.stars} Stars`}
                    </p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${active ? 'border-blue-400' : 'border-white/10'}`}>
                    {active && <div className="w-3 h-3 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa]" />}
                  </div>
                </div>
              </button>
            );
          })}
        </motion.div>

        {/* Нижняя кнопка (Вынесена за пределы скролла и поднята над навбаром) */}
        <motion.div variants={itemVariants} className="mt-8">
          <button
            onClick={handlePay}
            className="w-full py-5 rounded-[24px] bg-blue-600 hover:bg-blue-500 text-[15px] font-black uppercase tracking-widest text-white shadow-[0_12px_40px_rgba(37,99,235,0.25)] active:scale-[0.97] transition-all border border-white/10"
          >
            Pay {priceLabel}
          </button>
          <p className="text-[9px] text-center text-white/20 font-bold uppercase tracking-tighter mt-4">
            Encrypted Transaction via TON Network
          </p>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ShopOverlay;