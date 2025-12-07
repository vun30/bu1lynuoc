import React, { StrictMode } from 'react'
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './utils/registerServiceWorker'

// React 19 removes the runtime `version` field in production builds,
// but some third-party utilities (e.g. rc-util) still rely on it.
// Manually backfill the property to prevent runtime crashes in the
// production bundle when those utilities read `React.version`.
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
