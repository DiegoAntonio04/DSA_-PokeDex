import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import App from './PokeDex.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App  />
  </StrictMode>,
)
