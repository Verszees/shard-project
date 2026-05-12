import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { TonConnectUIProvider, THEME } from '@tonconnect/ui-react'
import './index.css'
import App from './App.jsx'
import { initTelegramWebApp } from './initTelegramWebApp.js'

initTelegramWebApp()

const manifestUrl = `${window.location.origin}/tonconnect-manifest.json`
const twaReturnUrl = import.meta.env.VITE_TWA_RETURN_URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TonConnectUIProvider
      manifestUrl={manifestUrl}
      uiPreferences={{ theme: THEME.DARK }}
      actionsConfiguration={twaReturnUrl ? { twaReturnUrl } : undefined}
    >
      <App />
    </TonConnectUIProvider>
  </StrictMode>,
)
