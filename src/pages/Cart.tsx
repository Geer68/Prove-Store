import { NavigationMenuNoShad } from "../componentsNoShad/NavigarionMenuNoShad";
import { NavigationMenuMobile } from "@/componentsNoShad/NavigationMenuMobile";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/componentsNoShad/context";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/componentsNoShad/CartProduct";

export function Cart() {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { cart, totalArticlePrice } = cartContext;
  

  useEffect(() => {
    setTotalPrice(totalArticlePrice());
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [cart]);

  return (
    <div>
      <nav>
        {windowWidth < 576 ? (
          <NavigationMenuMobile></NavigationMenuMobile>
        ) : (
          <NavigationMenuNoShad></NavigationMenuNoShad>
        )}
      </nav>
      <div className="flex justify-between p-10">
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
        <aside className="rounded-lg border-2 border-gray-100 ">
          <header className=" border-b-2 border-gray-100 p-5">
            <h4 className="text-xl font-bold">Resumen de compra</h4>
          </header>
          <section className="p-5">
            <div>
              <p>Elegí la forma de envío</p>
              <div className="flex justify-between">
                <p>Productos (n)</p>
                <p>$200</p>
              </div>
              <div className="flex justify-between">
                <p>Envio</p>
                <p>$200</p>
              </div>
              <p>Ingresa tu codigo de descuento</p>
            </div>
            <footer>
              <div className="flex justify-between">
                <p>Total</p>
                <p>${totalPrice}</p>
              </div>
              <Button>Continuar compra</Button>
            </footer>
          </section>
        </aside>
      </div>
    </div>
  );
}
