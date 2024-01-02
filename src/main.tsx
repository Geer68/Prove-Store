import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider, IpProvider } from "./mineComponents/context.tsx";
import { FiltersProvider } from "./mineComponents/filters.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <IpProvider>
      <FiltersProvider>
        <App />
      </FiltersProvider>
    </IpProvider>
  </CartProvider>
);
