// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { Provider } from 'react-redux'
import { store } from '@/store/Store'
import { AuthProvider } from './Context/AuthContext'
import { ThemeProvider } from "@/Context/ThemeContext";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </ThemeProvider>
  // </StrictMode>
)