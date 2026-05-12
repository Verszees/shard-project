import process from 'node:process';

/**
 * Serves /tonconnect-manifest.json with url/iconUrl matching the current host (dev + ngrok).
 * At build time emits dist/tonconnect-manifest.json using VITE_APP_ORIGIN, Netlify URL, or a placeholder.
 */
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
          iconUrl: `${origin}/favicon.svg`,
        });

        res.setHeader('Content-Type', 'application/json; charset=utf-8');
        res.statusCode = 200;
        res.end(body);
      });
    },
    generateBundle() {
      const fromNetlify = typeof process.env.URL === 'string' ? process.env.URL : '';
      const fromEnv = (env.VITE_APP_ORIGIN || '').trim();
      const base = (fromEnv || fromNetlify || 'https://example.com').replace(/\/$/, '');

      this.emitFile({
        type: 'asset',
        fileName: 'tonconnect-manifest.json',
        source: JSON.stringify({
          url: base,
          name,
          iconUrl: `${base}/favicon.svg`,
        }),
      });
    },
  };
}
