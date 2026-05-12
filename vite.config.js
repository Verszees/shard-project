import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // Принудительно слушаем все сетевые интерфейсы
    port: 5173,
    strictPort: true,
    allowedHosts: true, // Разрешаем все хосты
    hmr: {
      clientPort: 443, // Указываем порт для работы через HTTPS туннель ngrok
    },
    cors: true // Разрешаем кросс-доменные запросы
  }
})