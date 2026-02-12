import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/authContext.tsx'
import { CartProvider } from './context/cartContext.tsx'
import { CheckoutProvider } from './context/checkoutContext.tsx'

createRoot(document.getElementById('root')!).render(
  
  <StrictMode>
    <AuthProvider>
      <CartProvider>
        <CheckoutProvider>
          <App />
        </CheckoutProvider>
        
      </CartProvider>
    
    
    </AuthProvider>
  </StrictMode>
  ,
)
