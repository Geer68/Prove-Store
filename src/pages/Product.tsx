import { Articulos, Stock, ArticleOnCart } from "logic/types";
import { getStockTalle, getProductUrl } from "../../logic/configs";
import { mpIndividual } from "../../logic/mercadoPago";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { SizeBox } from "../components/SizeBox";
import { useParams } from "react-router-dom";
import { SkeletonProductPage } from "@/components/SkeletonProductPage";
import { UnorderList } from "@/components/UnorderLi";
import { notify, notifyError } from "../hooks/toast";
import { useCart } from "@/hooks/useCart";
import { SizeTable } from "@/components/SizeTable";

export function Product() {
  const [product, setProduct] = useState<Articulos>();
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const [stockArray, setStockArray] = useState<Stock[]>([]);
  const [selectedSize, setSelectedSize] = useState(" ");
  const { addToCart } = useCart();

  const handleTalleClick = (size: string) => {
    setSelectedSize(size);
  };
  const handleCartClick = (producto: Articulos | undefined) => {
    if (producto && selectedSize !== " ") {
      const itemToAdd: ArticleOnCart = {
        item: producto,
        cantidad: 1,
        talle: selectedSize,
      };
      addToCart(itemToAdd);
      notify(itemToAdd.item.nombre);
    } else if (selectedSize == " ") {
      notifyError("No seleccionaste un talle");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const fetchedProduct: Articulos = await getProductUrl(query);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
        setLoading(true);
      }
    };
    fetchData();
    if (!product?.id) return;
    getStockTalle(product?.id)
      .then((stockArrayResponse: Stock[] | null) => {
        if (stockArrayResponse) {
          setStockArray(stockArrayResponse);
        } else {
          console.error("No se encontró stock para el producto");
        }
      })
      .then(() => setLoading(false))
      .catch((error) => {
        console.error(error);
      });
  }, [product?.id, query]);
  return (
    <>
      {!loading ? (
        <div className="bg-white px-6">
          <header className=" lg:px-32">
            <Breadcrumb category={product?.category} nombre={product?.nombre} />
          </header>
          <div className="grid lg:flex  lg:justify-between lg:pl-24">
            {/* Imagenes */}
            <div className="lg:w-2/5  mt-6 max-w-2xl grid grid-cols-1  lg:gap-x-8">
              <div className="aspect-h-4 lg:w-full overflow-hidden sm:rounded-lg lg:block">
                <img
                  src={product?.img}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center aspect-square rounded-lg"
                />
              </div>
              <footer className="flex gap-2 grid-cols-3 mt-2 ">
                {product?.photos &&
                  Object.values(product.photos).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Model wearing plain tee ${index + 1}.`}
                      className="max-h-[100px] w-auto aspect-square object-cover object-center brightness-50 rounded-lg"
                    />
                  ))}
              </footer>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto lg:mx-4 lg:w-full mt-6 max-w-2xl grid grid-cols-1 lg:grid  lg:gap-x-2">
              <aside className="lg:w-2/3 lg:mr-4 ">
                <div className="lg:col-span-2 lg:pr-8">
                  <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {product?.nombre}
                  </h1>
                </div>

                {/* <!-- Options --> */}
                <div className="mt-4 lg:row-span-3 lg:mt-0">
                  <h2 className="sr-only">Product information</h2>
                  <p className="text-3xl tracking-tight text-gray-900">
                    {numeral(product?.precio).format("$0,0")}
                  </p>

                  {/* <!-- Sizes --> */}
                  <div className="mt-10">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900">
                        Talle
                      </h3>
                      <Drawer>
                        <DrawerTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
                          Guía de talles
                        </DrawerTrigger>
                        <DrawerContent>
                          <SizeTable />
                          <DrawerFooter>
                            <section className="grid grid-cols-2">
                              <img
                                className="mx-auto h-auto w-auto"
                                src="https://http2.mlstatic.com/storage/charts-middleware/size-chart-middle/WAIST_CIRCUMFERENCE_FROM_MALE-1.png"
                                alt="cintura"
                              />
                              <aside className="m-5">
                                <p className="text-l font-semibold">
                                  Contorno de la cintura
                                </p>
                                <p className="text-sm mt-2">
                                  Juntá los pies. Después, medí la parte más
                                  estrecha de tu cuerpo entre el pecho y la
                                  cadera.
                                </p>
                              </aside>
                            </section>
                            <section className="grid grid-cols-2">
                              <img
                                className="mx-auto h-auto w-auto"
                                src="https://http2.mlstatic.com/storage/charts-middleware/size-chart-middle/HIP_CIRCUMFERENCE_FROM_MALE-1.png"
                                alt="cintura"
                              />
                              <aside className="m-5">
                                <p className="text-l font-semibold">
                                  Contorno de la cadera
                                </p>
                                <p className="text-sm mt-2">
                                  Junta los pies. Después, medí la parte más
                                  ancha de tu cadera.
                                </p>
                              </aside>
                            </section>
                          </DrawerFooter>
                        </DrawerContent>
                      </Drawer>
                    </div>

                    <fieldset className="mt-4">
                      <legend className="sr-only">Choose a size</legend>
                      <div className="grid grid-cols-5 gap-4 sm:grid-cols-8 lg:grid-cols-5">
                        {stockArray.length > 0 ? (
                          stockArray.map((letra) => (
                            <SizeBox
                              onSelect={handleTalleClick}
                              selectedSize={selectedSize}
                              key={letra.talle}
                              talle={letra.talle}
                              stock={letra.stock}
                            />
                          ))
                        ) : (
                          <p>Cargando artículos...</p>
                        )}
                      </div>
                    </fieldset>
                  </div>
                  <div className="grid gap-4 pt-10">
                    <Button
                      onClick={() => mpIndividual(product?.id, selectedSize)}
                    >
                      Comprar
                    </Button>
                    <Button
                      variant={"secondary"}
                      onClick={() => handleCartClick(product)}
                    >
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </aside>

              <div className="py-10 lg:col-span-2 lg:col-start-1  lg:w-2/3  lg:pb-16 l lg:pt-6">
                {/* <!-- Description and details --> */}
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product?.descripcion}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900">
                    Destacado
                  </h3>

                  <div className="mt-4">
                    <UnorderList product={product?.detalles} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <SkeletonProductPage />
      )}
    </>
  );
}
