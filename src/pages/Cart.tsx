import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/mineComponents/context";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/mineComponents/CartProduct";
import numeral from "numeral";

export function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { cart, totalArticlePrice, showCantidad } = cartContext;
  

  useEffect(() => {
    setTotalPrice(totalArticlePrice());
  }, [cart]);

  return (
    <>
      <div className="grid items-center justify-center mt-10 sm:flex ">
        <aside className="rounded-lg border-2 border-gray-100 ">
          <header className=" border-b-2 border-gray-100 p-5">
            <h4 className="text-xl font-bold">Productos</h4>
          </header>
          <section className="p-5">
            {cart.map((item, index) => (
              <CartProduct key={index} product={item} />
            ))}
          </section>
        </aside>
        <aside className="rounded-lg border-2 border-gray-100 mt-5 ">
          <header className=" border-b-2 border-gray-100 p-5">
            <h4 className="text-xl font-bold">Resumen de compra</h4>
          </header>
          <section className="p-5">
            <div className="grid gap-2 mb-5">
              <p className="text-left font-medium text-yellow-800">Elegí la forma de envío</p>
              <div className="flex justify-between">
                <p>Productos (n)</p>
                <p>{showCantidad()}</p>
              </div>
              <div className="flex justify-between">
                <p>Envio</p>
                <p>?</p>
              </div>
              <p className="text-left font-medium text-yellow-800">Ingresa tu codigo de descuento</p>
            </div>
            <footer>
              <div className="flex justify-between mb-5">
                <p>Total</p>
                <p className="text-left font-medium text-yellow-800">{numeral(totalPrice).format("$0,0")}</p>
              </div>
              <Button>Continuar compra</Button>
            </footer>
          </section>
        </aside>
      </div>
    </>
  );
}
