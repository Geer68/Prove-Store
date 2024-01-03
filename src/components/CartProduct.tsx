import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { ArticleOnCart } from "logic/types";
import { CartContext } from "../contexts/cart";
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
        <small
          className="text-red-800"
          onClick={() => clickDeleteArticle(product)}
        >
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
  );
}
