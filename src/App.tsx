import React from "react";
import { HomePage } from "./pages/HomePage";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavigationBar } from "./mineComponents/NavigationBar";
import { Toaster } from "react-hot-toast";
import { Example } from "./pages/Prueba";

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
    path: "/prueba",
    Component: Example,
  }
];

function App() {
  return (
    <>
    <main>
      <BrowserRouter> 
      <Toaster/>
      <Example/>
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={<route.Component />}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </main>
    </>
  );
}


export default App
