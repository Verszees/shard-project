/**
 * Отступ сверху под панель Telegram («Закрыть», меню) + чёлка/status bar.
 * ВАЖНО: в iOS WebView User-Agent часто БЕЗ слова "Telegram" — опираемся на WebApp.platform / initData.
 */
function isTelegramMiniApp() {
  const tw = window.Telegram?.WebApp;
  if (!tw) return false;
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/Telegram/i.test(ua)) return true;
  const p = String(tw.platform || '');
  if (p === 'ios' || p === 'android' || p === 'android_x') return true;
  if (p === 'tdesktop' || p === 'macos' || p === 'weba' || p === 'webk') return true;
  if (typeof tw.initData === 'string' && tw.initData.length > 0) return true;
  return false;
}

export function initTelegramWebApp() {
  const root = document.documentElement;
  const tw = window.Telegram?.WebApp;
  const inMiniApp = isTelegramMiniApp();

  const applyInsets = () => {
    if (!tw) {
      root.classList.remove('tg-mini-app');
      root.style.setProperty(
        '--app-safe-area-top',
        'max(12px, env(safe-area-inset-top, 0px))',
      );
      root.style.setProperty('--app-header-pad-top', 'var(--app-safe-area-top)');
      root.style.setProperty(
        '--app-header-slot-min',
        'calc(var(--app-safe-area-top) + 3rem)',
      );
      return;
    }

    tw.ready?.();
    if (inMiniApp) {
      root.classList.add('tg-mini-app');
      tw.expand?.();
    } else {
      root.classList.remove('tg-mini-app');
    }

    const content = Number(tw.contentSafeAreaInset?.top);
    const device = Number(tw.safeAreaInset?.top);
    let top = 0;
    if (Number.isFinite(content) && content > 0) top = content;
    if (Number.isFinite(device) && device > 0) top = Math.max(top, device);

    if (inMiniApp) {
      // Место под строку «Закрыть» + статус; API иногда отдаёт 0
      top = Math.max(top, 62);
    } else {
      top = Math.max(top, Number.isFinite(device) ? device : 0);
    }

    const safePad = Math.round(top + 16);
    const safePx = `${Math.max(safePad, 12)}px`;
    // Чуть ниже только верхние кнопки (Connect / Links), остальные экраны — по --app-safe-area-top
    const headerExtra = inMiniApp ? 14 : 8;
    const headerPx = `${Math.max(safePad + headerExtra, 12)}px`;
    root.style.setProperty('--app-safe-area-top', safePx);
    root.style.setProperty('--app-header-pad-top', headerPx);
    root.style.setProperty('--app-header-slot-min', `${Math.max(safePad + headerExtra + 52, 108)}px`);
  };

  applyInsets();

  if (tw?.onEvent) {
    const handler = () => applyInsets();
    tw.onEvent('contentSafeAreaChanged', handler);
    tw.onEvent('safeAreaChanged', handler);
    tw.onEvent('viewportChanged', handler);
  }

  requestAnimationFrame(applyInsets);
  setTimeout(applyInsets, 120);
  setTimeout(applyInsets, 400);
}
