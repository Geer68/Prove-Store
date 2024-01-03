import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { IpProvider } from "./contexts/ip.tsx";
import { CartProvider } from "./contexts/cart.tsx";
import { FiltersProvider } from "./contexts/filters.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <IpProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </IpProvider>
  </CartProvider>
);
