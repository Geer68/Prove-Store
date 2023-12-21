import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ArticleOnCart } from "logic/types";
import { CartContext } from "./context";
import { Link } from "react-router-dom";
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
    <tr className="items-center">
      <td className="hidden pb-4 md:table-cell">
      <Link to={`/product/${product.item.url}`} key={product.item.id}>
          <img
            className="w-20 rounded"
            alt="Thumbnail"
            src={product.item.img}
          />
       </Link>
      </td>
      <td>
        <Link to={`/product/${product.item.url}`} key={product.item.id}>
          <p className="mb-2">
            {product.item.nombre} [{talle}]
          </p>
        </Link>
        <small onClick={() => clickDeleteArticle(product)}>
          Borrar artículo
        </small>
      </td>
      <td className="justify-center md:justify-end md:flex mt-6">
        <div className="w-20 h-10">
          <div className="relative flex flex-row w-full h-8">
            <aside className="flex gap-2 rounded-lg border-2 border-gray-100 items-center h-10">
              <Button variant={"ghost"} onClick={() => quitarCantidad(product)}>
                -
              </Button>
              <p>{product.cantidad}</p>
              <Button variant={"ghost"} onClick={() => addToCart(product)}>
                +
              </Button>
            </aside>
          </div>
        </div>
      </td>
      <td className="hidden text-right md:table-cell">
        <span className="text-sm lg:text-base font-medium">
          {numeral(product.item.precio).format("$0,0")}
        </span>
      </td>
      <td className="text-right">
        <span className="text-sm lg:text-base font-medium">
          {numeral(product.item.precio * product.cantidad).format("$0,0")}
        </span>
      </td>
    </tr>
    // <article className="grid gap-3 mb-6 justify-between items-center">
    //   <footer>
    //     <h3 className="font-medium">
    //       {product.item.nombre} - Talle: {talle}
    //     </h3>
    //     <p className="text-sm text-gray-400 font-medium">
    //       {numeral(product.item.precio).format("$0,0")}
    //     </p>
    //   </footer>
    //   <aside className="flex gap-6 items-center">
    //     <img
    //       className="rounded-lg max-w-[60px] max-h-[60px]"
    //       src={product.item.img}
    //       alt="img"
    //     ></img>
    //     <aside className="flex gap-4 rounded-lg border-2 border-gray-100 items-center h-10">
    //       <Button variant={"ghost"} onClick={() => quitarCantidad(product)}>-</Button>
    //       <p>{product.cantidad}</p>
    //       <Button variant={"ghost"} onClick={() => addToCart(product)}>+</Button>
    //     </aside>
    //   </aside>
    // </article>
    //{/* <Button
    //   onClick={() => {
    //     clickDeleteArticle(product);
    //   }}
    //   variant={"outline"}
    // >
    //   <svg
    //     xmlns="http://www.w3.org/2000/svg"
    //     width="24"
    //     height="24"
    //     viewBox="0 0 24 24"
    //     strokeWidth="2"
    //     stroke="currentColor"
    //     fill="none"
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //   >
    //     <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    //     <path d="M4 7l16 0"></path>
    //     <path d="M10 11l0 6"></path>
    //     <path d="M14 11l0 6"></path>
    //     <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
    //     <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
    //   </svg>
    // </Button> */}
  );
}
