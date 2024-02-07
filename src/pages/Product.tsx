import { Articulos, Stock, ArticleOnCart } from "logic/types";
import {
  getStockTalle,
  getProductUrl,
  useDocumentTitle,
} from "../../logic/configs";
// import { mpIndividual } from "../../logic/mercadoPago";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import numeral from "numeral";
import { useEffect, useState } from "react";
import { SizeBox } from "../components/SizeBox";
import { Link, useParams } from "react-router-dom";
import { SkeletonProductPage } from "@/components/SkeletonProductPage";
import { UnorderList } from "@/components/UnorderLi";
import { notify, notifyError } from "../hooks/toast";
import { useCart } from "@/hooks/useCart";
import { SizeTable } from "@/components/SizeTable";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function Product() {
  const [product, setProduct] = useState<Articulos>();
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const [stockArray, setStockArray] = useState<Stock[]>([]);
  const [selectedSize, setSelectedSize] = useState(" ");
  const [selectedImage, setSelectedImage] = useState(product?.img);
  const { addToCart } = useCart();

  const handleImageClick = (image: string | undefined) => {
    setSelectedImage(image);
  };

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
  useDocumentTitle(product?.nombre || "Prove Store");
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
        setSelectedImage(product?.img);
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
          <header className=" lg:px-32 lg:mt-5">
            <Breadcrumb category={product?.category} nombre={product?.nombre} />
          </header>
          <div className="grid xl:flex my-6 xl:justify-between xl:pl-32  justify-center items-center">
            {/* Imagenes */}
            <div className="xl:w-3/5 my-6 mt-6 max-w-2xl grid grid-cols-1 xl:gap-x-8">
              <div className="aspect-h-4 xl:w-full overflow-hidden sm:rounded-xl xl:block">
                <img
                  src={selectedImage}
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center aspect-square rounded-sm"
                />
              </div>
              <footer className="flex gap-2 grid-cols-3 mt-2 ">
                <img
                  key={1}
                  src={product?.img}
                  alt={`Model wearing plain tee ${1}.`}
                  className="max-h-[60px] sm:max-h-[100px] w-auto aspect-square object-cover object-center brightness-50 rounded-sm"
                  onClick={() => handleImageClick(product?.img)}
                />
                {product?.photos &&
                  Object.values(product.photos).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`Model wearing plain tee ${index + 1}.`}
                      className="max-h-[60px] sm:max-h-[100px] w-auto aspect-square object-cover object-center brightness-50 rounded-sm"
                      onClick={() => handleImageClick(photo)}
                    />
                  ))}
              </footer>
            </div>

            {/* <!-- Product info --> */}
            <div className=" xl:mx-12 lg:w-full mt-6 max-w-2xl grid grid-cols-1 lg:grid lg:gap-x-2">
              <aside className="xl:w-4/5 xl:mr-4 ">
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
                      <Dialog>
                        <DialogTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
                          Guía de talles
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Talles y tamaños</DialogTitle>
                            <DialogDescription>
                              Las medidas son aproximadas y pueden variar.
                            </DialogDescription>
                          </DialogHeader>
                          <SizeTable />
                          <section className="grid grid-cols-2">
                            <img
                              className="mx-auto h-auto w-auto"
                              src="https://http2.mlstatic.com/storage/charts-middleware/size-chart-middle/CHEST_CIRCUMFERENCE_FROM_MALE-1.png"
                              alt="cintura"
                            />
                            <aside className="m-5">
                              <p className="text-l font-semibold">
                                Contorno del pecho
                              </p>
                              <p className="text-sm mt-2">
                                Comenzando por la axila, rodeá con un centímetro
                                la parte más ancha del tórax.
                              </p>
                            </aside>
                          </section>
                        </DialogContent>
                      </Dialog>
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
                      onClick={() => handleCartClick(product)}
                      // mpIndividual(product?.id, selectedSize)}
                    >
                      <Link className="h-full w-full" to={"/contactUS"}>
                        Comprar
                      </Link>
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

              <div className="py-10 xl:col-span-2 xl:col-start-1  xl:w-4/5  xl:pb-16 l xl:pt-6">
                {/* <!-- Description and details --> */}

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Descripción</AccordionTrigger>
                    <AccordionContent>{product?.descripcion}</AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Cuidados</AccordionTrigger>
                    <AccordionContent>
                      Lavar en agua fría. <br />
                      A mano del lado del revés. <br />
                      No usar lavandina. <br />
                      No secar a máquina. <br />
                      No planchar sobre la estampa.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Destacado</AccordionTrigger>
                    <AccordionContent>
                      <UnorderList product={product?.detalles} />
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900"></p>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-sm font-medium text-gray-900"></h3>

                  <div className="mt-4"></div>
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
