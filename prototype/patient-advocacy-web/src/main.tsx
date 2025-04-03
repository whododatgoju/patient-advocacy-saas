import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import './debug-styles.css'
import App from './App.tsx'
// import TestApp from './TestApp.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
