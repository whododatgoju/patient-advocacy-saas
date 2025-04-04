import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import { registerServiceWorker } from './pwaUtils'

// Register service worker for PWA functionality
registerServiceWorker();

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)
