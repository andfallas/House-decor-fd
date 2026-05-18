import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { FavoritesProvider } from './context/FavoritesContext'
import { SelectedFabricsProvider } from './context/SelectedFabricsContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <FavoritesProvider>
        <SelectedFabricsProvider>
          <App />
        </SelectedFabricsProvider>
      </FavoritesProvider>
    </BrowserRouter>
  </StrictMode>,
)
