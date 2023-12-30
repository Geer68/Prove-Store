import React, { useEffect, useContext } from "react";
import { HomePage } from "./pages/HomePage";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { NavigationBar } from "./mineComponents/NavigationBar";
import { CartContext } from '@/mineComponents/context'
import { AllProducts } from "./pages/AllProducts";
import { Page404 } from "./pages/Page404";
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
    path: "/products",
    Component: AllProducts,
  },
  {
    path: "*",
    Component: Page404,
  }
];

function App() {
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { getLocalStorageCarrito } = cartContext;
  useEffect(() => {
    getLocalStorageCarrito();
  }, [])
  return (
    <>
      <BrowserRouter> 
      <Toaster/>
      <NavigationBar/>
        <Routes>
          <Route path="*"
            element={<Page404 />}
          />
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}


export default App
