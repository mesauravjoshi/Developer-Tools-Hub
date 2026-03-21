// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'
import { Provider } from 'react-redux'
import { store } from './components/Store/Store'
import { AuthProvider } from './Context/AuthContext'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
  // </StrictMode>
)