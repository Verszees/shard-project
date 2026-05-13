import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

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
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const tw = typeof window !== 'undefined' ? window.Telegram?.WebApp : null;

  const selected = useMemo(
    () => PACKS.find((p) => p.id === selectedId) ?? PACKS[0],
    [selectedId],
  );

  const priceLabel = useMemo(() => {
    if (method === 'ton') return `${selected.ton} TON`;
    if (method === 'usdt') return `${selected.usdt} USDT`;
    return `${selected.stars} Stars`;
  }, [method, selected]);

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
        'TON payment will be confirmed by your bot after on-chain transfer. Wire your backend to TonConnect sendTransaction or a deposit address.',
        'Pay with TON',
      );
      return;
    }

    if (method === 'usdt') {
      if (!wallet) {
        void tonConnectUI.openModal();
        return;
      }
      notify(
        'USDT on TON (jetton) needs your bot to build the transfer and credit shards. Connect the same wallet, then complete checkout in your backend.',
        'Pay with USDT',
      );
      return;
    }

    const invoiceUrl = import.meta.env.VITE_SHOP_STARS_INVOICE_URL;
    if (invoiceUrl && typeof tw?.openInvoice === 'function') {
      tw.openInvoice(invoiceUrl, (status) => {
        if (status === 'paid') notify('Payment received. Shards will appear after your bot confirms.', 'Stars');
      });
      return;
    }
    notify(
      'Create an invoice with Bot API (createInvoiceLink) and set VITE_SHOP_STARS_INVOICE_URL to the invoice URL, or open invoices dynamically from your server per pack.',
      'Telegram Stars',
    );
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.08 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#050508] text-white flex flex-col overflow-hidden"
      style={{ paddingTop: 'var(--app-safe-area-top)' }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-15%] right-[-25%] w-[85%] h-[55%] bg-blue-600/12 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-20%] left-[-20%] w-[70%] h-[50%] bg-violet-600/8 blur-[90px] rounded-full" />
      </div>

      <motion.button
        variants={itemVariants}
        type="button"
        onClick={onClose}
        className="absolute right-5 top-[max(0.75rem,var(--app-safe-area-top))] w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-2xl leading-none z-50 active:scale-90 transition-transform"
        aria-label="Close"
      >
        ×
      </motion.button>

      <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-[430px] mx-auto px-5 pt-2 pb-8">
        <motion.header variants={itemVariants} className="mb-6 pr-12">
          <h1 className="text-[40px] font-black italic uppercase tracking-tighter leading-none text-white">Shop</h1>
          <p className="text-[11px] font-black uppercase tracking-[0.22em] text-blue-400 mt-2">
            Buy TG Shards ($SHRD)
          </p>
        </motion.header>

        <motion.div variants={itemVariants} className="flex gap-2 mb-6">
          {METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMethod(m.id)}
              className={`flex-1 py-3 rounded-2xl text-[11px] font-black uppercase tracking-wider border transition-all ${
                method === m.id
                  ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.12)]'
                  : 'bg-white/5 border-white/10 text-white/50 active:bg-white/10'
              }`}
            >
              {m.label}
            </button>
          ))}
        </motion.div>

        <motion.p variants={itemVariants} className="text-[10px] font-bold text-white/35 uppercase tracking-widest mb-3">
          Choose pack
        </motion.p>

        <motion.div variants={itemVariants} className="flex-1 min-h-0 overflow-y-auto space-y-3 pb-4 -mx-1 px-1">
          {PACKS.map((pack) => {
            const active = pack.id === selectedId;
            return (
              <button
                key={pack.id}
                type="button"
                onClick={() => setSelectedId(pack.id)}
                className={`w-full text-left rounded-[26px] border p-5 transition-all ${
                  active
                    ? 'border-blue-500/50 bg-blue-500/10 shadow-[0_0_24px_rgba(59,130,246,0.15)]'
                    : 'border-white/8 bg-white/[0.03] active:scale-[0.99]'
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div>
                    <p className="text-2xl font-black italic text-white leading-none">
                      {formatShards(pack.shards)}
                      <span className="text-sm not-italic font-black text-blue-400 ml-1.5">$SHRD</span>
                    </p>
                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-2">
                      {method === 'ton' && `${pack.ton} TON`}
                      {method === 'usdt' && `${pack.usdt} USDT (TON)`}
                      {method === 'stars' && `${pack.stars} Telegram Stars`}
                    </p>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 shrink-0 mt-1 ${
                      active ? 'border-blue-400 bg-blue-500' : 'border-white/20'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </motion.div>

        <motion.div variants={itemVariants} className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handlePay}
            className="w-full py-4 rounded-[22px] bg-gradient-to-r from-blue-600 to-blue-500 text-[13px] font-black uppercase tracking-wider text-white shadow-lg shadow-blue-900/40 active:scale-[0.98] transition-transform border border-white/10"
          >
            Pay {priceLabel}
          </button>
          <p className="text-[9px] text-center text-white/30 font-medium leading-relaxed px-2">
            TON / USDT use your connected wallet; Stars use Telegram invoices from your bot.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ShopOverlay;
