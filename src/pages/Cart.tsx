import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/mineComponents/context";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/mineComponents/CartProduct";
import { IpContext } from "../mineComponents/context";
import numeral from "numeral";
import { getPriceDelivery } from "../../logic/configs";
import toast from "react-hot-toast";
import { Cartn } from "../pages/Cartn"

export function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { cart, totalArticlePrice, showCantidad } = cartContext;

  const ipContext = useContext(IpContext);
  if (!ipContext) {
    throw new Error("Error al obtener el contexto del IP");
  }
  // const { ip, setNewIP } = ipContext;
  const checkLocation = async () => {
    try{
      const price = await getPriceDelivery();
      console.log(price);
      if(price) {
        setDeliveryPrice(price);
      }
    } catch (error) {
      toast.error("Hubo un error al consultar el precio");
    }
    
  };

  useEffect(() => {
    setTotalPrice(totalArticlePrice()+deliveryPrice);
  }, [cart, deliveryPrice, totalArticlePrice]);

  return (
    <Cartn />
    // <>
    //   <div className="grid items-center justify-center mt-10 sm:flex ">
    //     <aside className="rounded-lg border-2 border-gray-100 ">
    //       <header className=" border-b-2 border-gray-100 p-5">
    //         <h4 className="text-xl font-bold">Productos</h4>
    //       </header>
    //       <section className="p-5">
    //         {cart.map((item, index) => (
    //           <CartProduct key={index} product={item} />
    //         ))}
    //       </section>
    //     </aside>
    //     <aside className="rounded-lg border-2 border-gray-100 mt-5 ">
    //       <header className="grid items-left justify-start border-b-2 border-gray-100 p-5">
    //         <h4 className="text-xl font-bold">Resumen de compra</h4>
    //       </header>
    //       <section className="p-5">
    //         <div className="grid gap-2 mb-5">
    //           <p className="text-left font-medium text-yellow-800">
    //             Elegí la forma de envío
    //           </p>
    //           <div className="flex justify-between">
    //             <p>Productos (n)</p>
    //             <p>{showCantidad()}</p>
    //           </div>
    //           <div className="flex justify-between">
    //             <p>Envio</p>
    //             <p>{numeral(deliveryPrice).format("$0,0")}</p>
    //           </div>
    //           <p className="text-left font-medium text-yellow-800">
    //             Ingresa tu codigo de descuento
    //           </p>
    //         </div>
    //         <footer className="grid gap-2">
    //           <div className="flex justify-between mb-5">
    //             <p>Total</p>
    //             <p className="text-left font-medium text-yellow-800">
    //               {numeral(totalPrice).format("$0,0")}
    //             </p>
    //           </div>
    //           <Button variant={"outline"} className={deliveryPrice==0 ? "block" : "hidden"} onClick={checkLocation}>
    //             Calcular costo de envio
    //           </Button>
    //           <Button>Continuar compra</Button>
    //         </footer>
    //       </section>
    //     </aside>
    //   </div>
    // </>
  );
}
