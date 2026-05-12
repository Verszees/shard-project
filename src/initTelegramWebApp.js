/**
 * Отступ сверху под панель Telegram («Закрыть», меню) + чёлка/status bar.
 * Пишет --app-safe-area-top и --app-header-* на :root для хедера и оверлеев.
 */
export function initTelegramWebApp() {
  const root = document.documentElement;
  const tw = window.Telegram?.WebApp;
  const inTelegramClient =
    typeof navigator !== 'undefined' && /Telegram/i.test(navigator.userAgent);

  const applyInsets = () => {
    if (!tw) {
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
    if (inTelegramClient) tw.expand?.();

    const content = Number(tw.contentSafeAreaInset?.top);
    const device = Number(tw.safeAreaInset?.top);
    let top = 0;
    if (Number.isFinite(content) && content > 0) top = content;
    if (Number.isFinite(device) && device > 0) top = Math.max(top, device);

    if (inTelegramClient) {
      // На iOS иногда приходит маленькое значение — всё равно оставляем место под шапку мини‑апа
      top = Math.max(top, 56);
    } else {
      top = Math.max(top, Number.isFinite(device) ? device : 0);
    }

    const pad = Math.round(top + 14);
    const padPx = `${Math.max(pad, 12)}px`;
    root.style.setProperty('--app-safe-area-top', padPx);
    root.style.setProperty('--app-header-pad-top', padPx);
    root.style.setProperty('--app-header-slot-min', `${Math.max(pad + 50, 96)}px`);
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
