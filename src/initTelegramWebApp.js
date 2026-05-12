/**
 * Выставляет отступы под шапку Telegram / safe area и вызывает WebApp.ready().
 * Без этого fixed-хедер и 3D-сцена залезают под кнопку «Закрыть» и статус-бар.
 */
export function initTelegramWebApp() {
  const root = document.documentElement;
  const tw = window.Telegram?.WebApp;
  const inTelegramClient = typeof navigator !== 'undefined' && /Telegram/i.test(navigator.userAgent);

  const applyInsets = () => {
    if (!tw) {
      root.style.setProperty('--app-header-pad-top', 'max(12px, env(safe-area-inset-top, 0px))');
      root.style.setProperty('--app-header-slot-min', 'calc(var(--app-header-pad-top) + 3rem)');
      return;
    }

    tw.ready?.();
    if (inTelegramClient) tw.expand?.();

    let top = Number(tw.contentSafeAreaInset?.top);
    const deviceTop = Number(tw.safeAreaInset?.top);

    if (!Number.isFinite(top) || top < 1) {
      if (inTelegramClient) {
        top = Number.isFinite(deviceTop) && deviceTop > 0 ? Math.max(deviceTop, 44) : 52;
      } else {
        top = Number.isFinite(deviceTop) && deviceTop > 0 ? deviceTop : 0;
      }
    }

    const pad = Math.round(top + 8);
    root.style.setProperty('--app-header-pad-top', `${Math.max(pad, 12)}px`);
    root.style.setProperty('--app-header-slot-min', `${Math.max(pad + 50, 88)}px`);
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
}
