import { Articulos, Stock, ArticleOnCart } from "logic/types";
import { getStockTalle, getProductUrl, mp } from "../../logic/configs";
import { Breadcrumb } from "../components/Breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import numeral from "numeral";
import { useEffect, useState, useContext } from "react";
import { SizeBox } from "../components/SizeBox";
import { CartContext } from "../contexts/cart";
import { useParams } from "react-router-dom";
import { SkeletonProductPage } from "@/components/SkeletonProductPage";
import { UnorderList } from "@/components/UnorderLi";
import { notify, notifyENoSelectedTalle } from "../hooks/toast";
export function Product() {
  const [product, setProduct] = useState<Articulos>();
  const [loading, setLoading] = useState(true);
  const { query } = useParams();
  const [stockArray, setStockArray] = useState<Stock[]>([]);
  const [selectedSize, setSelectedSize] = useState(" ");
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { addToCart } = cartContext;
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
      notifyENoSelectedTalle();
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
    console.log(product?.detalles);
  }, [product?.id, query]);
  return (
    <>
      {!loading ? (
        <div className="bg-white">
          <div>
            <Breadcrumb category={product?.category} nombre={product?.nombre} />

            {/* <!-- Image gallery --> */}
            <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
              <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                  alt="Two each of gray, white, and black shirts laying flat."
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                    alt="Model wearing plain black basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                    alt="Model wearing plain gray basic tee."
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              </div>
              <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
                <img
                  src={product?.img}
                  alt="Model wearing plain white basic tee."
                  className="h-full w-full object-cover object-center"
                />
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

                {/* <!-- Colors --> */}
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset className="mt-4">
                    <legend className="sr-only">Choose a color</legend>
                    <div className="flex items-center space-x-3">
                      {/* <!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                --> */}
                      <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-gray-900">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Black"
                          className="sr-only"
                          aria-labelledby="color-choice-2-label"
                        />
                        <span id="color-choice-2-label" className="sr-only">
                          Black
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-slate-900 rounded-full border border-black border-opacity-10"
                        ></span>
                      </label>
                      {/* <!--
                  Active and Checked: "ring ring-offset-1"
                  Not Active and Checked: "ring-2"
                --> */}
                      <label className="ring-1 ring-yellow-950 ring-offset-1 relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ">
                        <input
                          type="radio"
                          name="color-choice"
                          value="Black"
                          className="sr-only"
                          aria-labelledby="color-choice-2-label"
                        />
                        <span id="color-choice-2-label" className="sr-only">
                          Black
                        </span>
                        <span
                          aria-hidden="true"
                          className="h-8 w-8 bg-orange-900 rounded-full border border-black border-opacity-10"
                        ></span>
                      </label>
                    </div>
                  </fieldset>
                </div>

                {/* <!-- Sizes --> */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Talle</h3>
                    <Drawer>
                      <DrawerTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
                        Guía de talles
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle>Fotito de talles</DrawerTitle>
                          <DrawerDescription>
                            Aun no lo termino
                          </DrawerDescription>
                        </DrawerHeader>
                        <DrawerFooter>
                          {/* <DrawerClose>Cancel</DrawerClose> */}
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
                  <Button onClick={() => mp(product?.id, selectedSize)}>
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
