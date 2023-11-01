import React from "react";
import { HomePage } from "./pages/HomePage";
import { Product } from "./pages/Product";
import { Router } from "../src/componentsNoShad/Router";
import { Cart } from "./pages/Cart";

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
  }
];

function App() {
  return (
    <main>
      <Router routes={routes} />
    </main>
  );
}


export default App
