import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CartProvider } from './componentsNoShad/context.tsx'
import { NavigationBar } from './componentsNoShad/NavigationBar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CartProvider>
    <>
      <NavigationBar/>
      <App />
    </>
  </CartProvider>,
)
