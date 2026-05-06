import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { ToastProvider } from './context/toastContext.tsx'
import { ToastContainer } from './Containers/toastContainer.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <ToastContainer />
        <App />
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
)
