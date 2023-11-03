import { ArticleOnCart } from "logic/types";
import { createContext, useState } from "react";

export const CartContext = createContext({
    cart: [] as ArticleOnCart[],
    deleteFromCart: (product: ArticleOnCart) => { },
    addToCart: (product: ArticleOnCart) => { },
    addCantidad: (product: ArticleOnCart) => { },
    quitarCantidad: (product: ArticleOnCart) => { },
    clearCart: () => { },
    totalArticlePrice: (): number => 0,
    showCantidad: (): number => 0
})

export function CartProvider({ children }: { children: JSX.Element }) {
    const [cart, setCart] = useState<ArticleOnCart[]>([])

    const addToCart = (productToAdd: ArticleOnCart) => {
        const existingProduct = cart.find(
            (item) => item.item.id === productToAdd.item.id && item.talle === productToAdd.talle
        );
        if (existingProduct) {
            const newCart = cart.map((item) => {
                if (item.item.id === existingProduct.item.id && item.talle === existingProduct.talle) {
                    return {
                        ...item,
                        cantidad: item.cantidad + 1
                    };
                }
                return item;
            });

            setCart(newCart);
        } else {
            setCart([...cart, productToAdd]);
        }
    };

    const totalArticlePrice = () => {
        return cart.reduce((total, item) => total + item.item.precio * item.cantidad, 0);
    }
    const clearCart = () => {
        setCart([])
    }
    const deleteFromCart = (product: ArticleOnCart) => {
        const newCart = cart.filter(
            (item) =>
                item.item.id !== product.item.id || item.talle !== product.talle
        );
        setCart(newCart);
    };
    const addCantidad = (product: ArticleOnCart) => {
        //
    }
    const quitarCantidad = (product: ArticleOnCart) => {
        //
    }
    const showCantidad = () => {
        return cart.reduce((cant, item) => cant + item.cantidad, 0);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, clearCart, deleteFromCart, totalArticlePrice, addCantidad, quitarCantidad, showCantidad }}>{children}</CartContext.Provider>
    )
}

