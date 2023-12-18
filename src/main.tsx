import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { CartProvider, IpProvider } from "./mineComponents/context.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <CartProvider>
    <IpProvider>
      <App />
    </IpProvider>
  </CartProvider>
);
