import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

function renderApp() {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

const isHome = window.location.pathname === '/'

if (isHome) {
  const start = () => {
    window.removeEventListener('pointerdown', start)
    window.removeEventListener('keydown', start)
    renderApp()
  }

  window.addEventListener('pointerdown', start, { once: true })
  window.addEventListener('keydown', start, { once: true })
  window.setTimeout(start, 2500)
} else {
  renderApp()
}
