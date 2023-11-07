import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ArticleOnCart } from "logic/types";
import { CartContext } from "./context";
import numeral from "numeral";

export function CartProduct({
  product,
}: {
  product: ArticleOnCart;
}): JSX.Element {
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { deleteFromCart, quitarCantidad, addToCart } = cartContext;

  const talle = product.talle || "";
  const clickDeleteArticle = (product: ArticleOnCart) => {
    deleteFromCart(product);
    
  };

  return (
    <article className="grid gap-3 mb-6 justify-between items-center">
      <footer>
        <h3 className="font-medium">
          {product.item.nombre} - Talle: {talle}
        </h3>
        <p className="text-sm text-gray-400 font-medium">
          {numeral(product.item.precio).format("$0,0")}
        </p>
      </footer>
      <aside className="flex gap-6 items-center">
        <img
          className="rounded-lg max-w-[60px] max-h-[60px]"
          src={product.item.img}
          alt="img"
        ></img>
        <aside className="flex gap-4 rounded-lg border-2 border-gray-100 items-center h-10">
          <Button variant={"ghost"} onClick={() => quitarCantidad(product)}>-</Button>
          <p>{product.cantidad}</p>
          <Button variant={"ghost"} onClick={() => addToCart(product)}>+</Button>
        </aside>
        <Button
          onClick={() => {
            clickDeleteArticle(product);
          }}
          variant={"outline"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 7l16 0"></path>
            <path d="M10 11l0 6"></path>
            <path d="M14 11l0 6"></path>
            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
          </svg>
        </Button>
      </aside>
    </article>
  );
}
