import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// Bootstrap 5 se aplica de forma global a toda la aplicación
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
