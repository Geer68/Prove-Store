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
        <div className="bg-white">
          <div>
            <header className="px-6 xl:px-32">
              <Breadcrumb
                category={product?.category}
                nombre={product?.nombre}
              />
            </header>

            {/* <!-- Image gallery --> */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src={product?.photos.photo1}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product?.photos.photo2 || product?.photos.photo1}
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full aspect-video object-cover object-center brightness-50"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src={product?.photos.photo2 || product?.img}
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full aspect-video object-cover object-center brightness-50"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <div className="zoomist-image lg:h-full lg:w-full lg:aspect-video lg:object-cover lg:object-center">
                  <img
                    src={product?.img}
                    alt="Model wearing plain white basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
            </div>

            {/* <!-- Product info --> */}
            <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
              <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
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
                    <h3 className="text-sm font-medium text-gray-900">Talle</h3>
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
                                Junta los pies. Después, medí la parte más ancha
                                de tu cadera.
                              </p>
                            </aside>
                          </section>
                        </DrawerFooter>
                      </DrawerContent>
                    </Drawer>
                  </div>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a size</legend>
                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
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

              <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
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
