import React, { useEffect, useContext } from "react";
import { HomePage } from "./pages/HomePage";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { CartContext } from "@/contexts/cart";
import { AllProducts } from "./pages/AllProducts";
import { Page404 } from "./pages/Page404";
import ContactSection from "./pages/ContactSection";
import { Footer } from "./components/Footer";
import Navbar from "./components/NavBar";
type Route = {
  path: string;
  Component: React.ComponentType<any>;
};

const routes: Route[] = [
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/product/:query",
    Component: Product,
  },
  {
    path: "/cart",
    Component: Cart,
  },
  {
    path: "/products/:collection/:category?",
    Component: AllProducts,
  },
  {
    path: "*",
    Component: Page404,
  },
  {
    path: "/contactUS",
    Component: ContactSection,
  },
];

function App() {
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { getLocalStorageCarrito } = cartContext;
  useEffect(() => {
    getLocalStorageCarrito();
  }, []);
  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Navbar />
        <Routes>
          <Route path="*" element={<Page404 />} />
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
