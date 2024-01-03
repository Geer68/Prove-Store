import { useEffect, useState, useContext } from "react";
import { CartContext } from "@/contexts/cart";
import { Button } from "@/components/ui/button";
import { CartProduct } from "@/components/CartProduct";
import { IpContext } from "../contexts/ip";
import numeral from "numeral";
import { getPriceDelivery, checkCupon } from "../../logic/configs";
import toast from "react-hot-toast";
import { Cupon } from "logic/types";

export function Cart() {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [deliveryPrice, setDeliveryPrice] = useState<number>(0);
  const [apliedCupon, setApliedCupon] = useState<Cupon>();
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { cart, totalArticlePrice } = cartContext;

  const ipContext = useContext(IpContext);
  if (!ipContext) {
    throw new Error("Error al obtener el contexto del IP");
  }
  const checkLocation = async () => {
    try {
      const price = await getPriceDelivery();
      if (price) {
        setDeliveryPrice(price);
      }
    } catch (error) {
      toast.error("Hubo un error al consultar el precio");
    }
  };

  const handleCuponClick = async () => {
    const cupon = document.getElementById("cuponInput") as HTMLInputElement;
    console.log(cupon.value);
    if (cupon.value.length === 0) {
      toast.error("No ingresaste un cupón");
      return;
    }
    const response = await checkCupon(String(cupon.value).toUpperCase());
    if (!response) {
      toast.error("Cupon no valido");
      return;
    }
    setApliedCupon(response);
    apliedCupon?.type === 1 && setTotalPrice(totalPrice - apliedCupon?.m_neto);
    apliedCupon?.type === 2 &&
      setTotalPrice(totalPrice * (1 - (apliedCupon?.m_porcent || 0) / 100));
  };

  useEffect(() => {
    checkLocation();
    setTotalPrice(totalArticlePrice() + deliveryPrice);
  }, [cart, deliveryPrice, totalArticlePrice]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex flex-col w-full p-8 text-gray-800 bg-white md:w-4/5 lg:w-4/5">
          <div className="flex-1">
            <table className="w-full text-sm lg:text-base" cellSpacing={0}>
              <thead>
                <tr className="h-12 uppercase">
                  <th className="hidden md:table-cell"></th>
                  <th className="text-left">Productos</th>
                  <th className="lg:text-right text-left pl-5 lg:pl-0">
                    <span className="lg:hidden" title="Quantity">
                      CANT
                    </span>
                    <span className="hidden lg:inline">Quantity</span>
                  </th>
                  <th className="hidden text-right md:table-cell">
                    Precio por unidad
                  </th>
                  <th className="text-right">Precio total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <CartProduct key={index} product={item} />
                ))}
              </tbody>
            </table>
            <hr className="pb-6 mt-6" />
            <div className="my-4 mt-6 -mx-2 lg:flex">
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <h1 className="ml-2 font-bold uppercase">Cupón</h1>
                </div>
                <div className="p-4 mb-4">
                  <div className="justify-center md:flex">
                    <div className="flex items-center w-full h-13 pl-3 bg-white border rounded-full">
                      <input
                        type="cupon"
                        name="code"
                        id="cuponInput"
                        placeholder="I <3 PROVE"
                        className="w-full outline-none appearance-none focus:outline-none active:outline-none"
                      />
                      <button
                        onClick={() => handleCuponClick()}
                        className="text-sm flex items-center px-3 py-1 text-white bg-gray-800 rounded-full outline-none md:px-4 hover:bg-gray-700 focus:outline-none active:outline-none"
                      >
                        <svg
                          aria-hidden="true"
                          data-prefix="fas"
                          data-icon="gift"
                          className="w-8"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M32 448c0 17.7 14.3 32 32 32h160V320H32v128zm256 32h160c17.7 0 32-14.3 32-32V320H288v160zm192-320h-42.1c6.2-12.1 10.1-25.5 10.1-40 0-48.5-39.5-88-88-88-41.6 0-68.5 21.3-103 68.3-34.5-47-61.4-68.3-103-68.3-48.5 0-88 39.5-88 88 0 14.5 3.8 27.9 10.1 40H32c-17.7 0-32 14.3-32 32v80c0 8.8 7.2 16 16 16h480c8.8 0 16-7.2 16-16v-80c0-17.7-14.3-32-32-32zm-326.1 0c-22.1 0-40-17.9-40-40s17.9-40 40-40c19.9 0 34.6 3.3 86.1 80h-86.1zm206.1 0h-86.1c51.4-76.5 65.7-80 86.1-80 22.1 0 40 17.9 40 40s-17.9 40-40 40z"
                          />
                        </svg>
                        <span className="font-medium">Aplicar cupón</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:px-2 lg:w-1/2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <h1 className="ml-2 font-bold uppercase">Tu orden</h1>
                </div>
                <div className="p-4">
                  <p className="mb-6 ">
                    Los costos de envios son calculados de manera aproximada
                    segun tu ubicacion actual
                  </p>
                  <div className="flex justify-between border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Subtotal
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <p>
                        {numeral(totalPrice - deliveryPrice).format("$0,0")}
                      </p>
                    </div>
                  </div>
                  {/* <div className="flex justify-between pt-4 border-b">
                    <div className="flex lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-gray-800">
                      <button type="submit" className="mr-2 mt-1 lg:mt-2">
                        <svg
                          aria-hidden="true"
                          data-prefix="far"
                          data-icon="trash-alt"
                          className="w-4 text-red-600 hover:text-red-800"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                        >
                          <path
                            fill="currentColor"
                            d="M268 416h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12zM432 80h-82.41l-34-56.7A48 48 0 00274.41 0H173.59a48 48 0 00-41.16 23.3L98.41 80H16A16 16 0 000 96v16a16 16 0 0016 16h16v336a48 48 0 0048 48h288a48 48 0 0048-48V128h16a16 16 0 0016-16V96a16 16 0 00-16-16zM171.84 50.91A6 6 0 01177 48h94a6 6 0 015.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0012-12V188a12 12 0 00-12-12h-24a12 12 0 00-12 12v216a12 12 0 0012 12z"
                          />
                        </svg>
                      </button>
                      Cupon "90off"
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-green-700">
                      -133,944.77€
                    </div>
                  </div> */}
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Envio
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <p>
                        {deliveryPrice == 0
                          ? "¡Gratis!"
                          : numeral(deliveryPrice).format("$0,0")}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between pt-4 border-b">
                    <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                      Total
                    </div>
                    <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                      <p>{numeral(totalPrice).format("$0,0")}</p>
                    </div>
                  </div>

                  <Button className="w-full h-12 mt-10 text-lg">
                    Ir a pagar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
