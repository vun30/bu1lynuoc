import React, { StrictMode } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './utils/registerServiceWorker'

if (!React.version) {
  Object.defineProperty(React, 'version', {
    configurable: true,
    value: '19.0.0',
  })
}

// Register service worker for Firebase Cloud Messaging
registerServiceWorker().catch((error) => {
  console.error('Failed to register service worker:', error);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
