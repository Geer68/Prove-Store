import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

export function useCart() {
  const {
    cart,
    addToCart,
    clearCart,
    deleteFromCart,
    totalArticlePrice,
    quitarCantidad,
    showCantidad,
    getLocalStorageCarrito,
  } = useContext(CartContext);

  return {
    cart,
    addToCart,
    clearCart,
    deleteFromCart,
    totalArticlePrice,
    quitarCantidad,
    showCantidad,
    getLocalStorageCarrito: getLocalStorageCarrito,
  };
}
