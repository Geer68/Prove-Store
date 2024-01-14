import { ArticleOnCart } from "logic/types";
import { createContext, useState } from "react";

export const CartContext = createContext({
  cart: [] as ArticleOnCart[],
  deleteFromCart: (product: ArticleOnCart) => {},
  addToCart: (product: ArticleOnCart) => {},
  quitarCantidad: (product: ArticleOnCart) => {},
  clearCart: () => {},
  getLocalStorageCarrito: () => {},
  totalArticlePrice: (): number => 0,
  showCantidad: (): number => 0,
});

export function CartProvider({ children }: { children: JSX.Element }) {
  const [cart, setCart] = useState<ArticleOnCart[]>([]);

  const addToCart = (productToAdd: ArticleOnCart) => {
    const existingProduct = cart.find(
      (item) =>
        item.item.id === productToAdd.item.id &&
        item.talle === productToAdd.talle
    );
    if (existingProduct) {
      const newCart = cart.map((item) => {
        if (
          item.item.id === existingProduct.item.id &&
          item.talle === existingProduct.talle
        ) {
          return {
            ...item,
            cantidad: item.cantidad + 1,
          };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(newCart));
      setCart(newCart);
    } else {
      setCart([...cart, productToAdd]);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const getLocalStorageCarrito = () => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setCart(JSON.parse(cart));
    }
  };
  const totalArticlePrice = () => {
    return cart.reduce(
      (total, item) => total + item.item.precio * item.cantidad,
      0
    );
  };
  const clearCart = () => {
    console.log("aa");
    setCart([]);
    localStorage.setItem("cart", JSON.stringify([]));
  };
  const deleteFromCart = (product: ArticleOnCart) => {
    const newCart = cart.filter(
      (item) => item.item.id !== product.item.id || item.talle !== product.talle
    );
    setCart(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };
  const quitarCantidad = (productToAdd: ArticleOnCart) => {
    const existingProduct = cart.find(
      (item) =>
        item.item.id === productToAdd.item.id &&
        item.talle === productToAdd.talle
    );
    if (existingProduct) {
      const newCart = cart.map((item) => {
        if (
          item.item.id === existingProduct.item.id &&
          item.talle === existingProduct.talle
        ) {
          return {
            ...item,
            cantidad: item.cantidad - 1,
          };
        }
        return item;
      });

      setCart(newCart);
    }
    if (existingProduct?.cantidad === 0) {
      deleteFromCart(productToAdd);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const showCantidad = () => {
    return cart.reduce((cant, item) => cant + item.cantidad, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        clearCart,
        deleteFromCart,
        totalArticlePrice,
        quitarCantidad,
        showCantidad,
        getLocalStorageCarrito,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
