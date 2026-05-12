import process from 'node:process';

/** Absolute icon URL for TON Connect / Telegram Wallet (HTTPS, publicly reachable). */
function resolveIconUrl(originOrBase, env) {
  const override = (env.VITE_TONCONNECT_ICON_URL || '').trim();
  if (override) return override;
  const base = originOrBase.replace(/\/$/, '');
  return `${base}/TONawatarka.jpg`;
}

export function tonconnectManifestPlugin() {
  const name = 'Shard Project';
  /** @type {Record<string, string>} */
  let env = {};

  return {
    name: 'tonconnect-manifest',
    configResolved(config) {
      env = config.env || {};
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split('?')[0];
        if (path !== '/tonconnect-manifest.json') return next();

        const host = req.headers.host || 'localhost:5173';
        const xf = req.headers['x-forwarded-proto'];
        const proto = Array.isArray(xf) ? xf[0] : xf || 'http';
        const origin = `${proto}://${host}`.replace(/\/$/, '');

        const body = JSON.stringify({
          url: origin,
          name,
          iconUrl: resolveIconUrl(origin, env),
        });

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.statusCode = 200;
        res.end(body);
      });
    },
    generateBundle() {
      const fromNetlify = typeof process.env.URL === 'string' ? process.env.URL : '';
      const fromEnv = (env.VITE_APP_ORIGIN || '').trim();
      const base = (fromEnv || fromNetlify || 'https://example.com').replace(/\/$/, '');

      if (base === 'https://example.com') {
        this.warn(
          '[tonconnect-manifest] Set VITE_APP_ORIGIN to your real HTTPS mini app origin, ' +
            'otherwise iconUrl in tonconnect-manifest.json points at example.com and the wallet avatar will break.',
        );
      }

      this.emitFile({
        type: 'asset',
        fileName: 'tonconnect-manifest.json',
        source: JSON.stringify({
          url: base,
          name,
          iconUrl: resolveIconUrl(base, env),
        }),
      });
    },
  };
}