import { getProductUrl, getStockTalle } from "../../logic/configs";
import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "../mineComponents/Breadcrumb";
import { Articulos, Stock, ArticleOnCart } from "logic/types";
import { CartContext } from "../mineComponents/context";
import numeral from "numeral";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function Product() {
  const [product, setProduct] = useState<Articulos | null>();
  const [stock, setStock] = useState<Stock>({ talle: "", stock: 0 });
  const [loading, setLoading] = useState(true);
  const cartContext = useContext(CartContext);
  const { query } = useParams();

  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { addToCart } = cartContext;

  const notify = (itemToAdd: ArticleOnCart) => {
    toast.success(`Añadido ${itemToAdd.item.nombre}`, {
      style: {
        border: "1px solid #252525",
        padding: "16px",
        color: "#252525",
      },
      iconTheme: {
        primary: "#252525",
        secondary: "#FFFAEE",
      },
    });
  };

  const notifyError = () => {
    if (!stock.talle) {
      toast.error("No seleccionaste un talle");
    } else if (!stock.stock) {
      toast.error("No tenemos este talle :c");
    }
  };
  const handleCartClick = (producto: Articulos | null | undefined) => {
    if (producto && stock.talle && stock.stock > 0) {
      const itemToAdd: ArticleOnCart = {
        item: producto,
        cantidad: 1,
        talle: stock.talle,
      };
      addToCart(itemToAdd);
      notify(itemToAdd);
    } else if (stock.stock == 0) {
      notifyError();
    }
  };

  const handleTalleClick = async (talle: string) => {
    try {
      const res: Stock = await getStockTalle(talle, product?.id || 0);
      setStock({ talle, stock: res.stock });
    } catch (error) {
      setStock({ talle, stock: 0 });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProduct: Articulos = await getProductUrl(query);
        setProduct(fetchedProduct);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Breadcrumb catagory="Buzos" nombre={product?.nombre}></Breadcrumb>
      {window.innerWidth < 768 ? (
        <header className="grid  items-center gap-5 mr-10 ml-10 mt-">
          <h1 className="font-bold text-2xl">{product?.nombre}</h1>
          <p className="font-medium text-2xl">
            {numeral(product?.precio).format("$0,0")}
          </p>
        </header>
      ) : (
        <></>
      )}
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <article className="grid justify-center items-center gap-7 mr-10 mt-5 ml-10 sm:flex sm:gap-4 sm:mx-20 sm:ml-20 sm:mt-10">
          <img src={product?.img} alt="" className="rounded-lg w-96" />
          <aside>
            <footer className="grid gap-3">
              <p className="text-sm bg-gray-100 p-3 rounded-lg max-w-md font-medium">
                {product?.descripcion}
              </p>
              <div className="flex font-medium gap-4">
                <p>Talle</p>
                <p className="font-bold text-md text-yellow-800">{stock?.talle}</p>
                <section className="flex gap-1 text-gray-400">
                  <p>{stock?.stock}</p>
                  <p>disponibles</p>
                </section>
              </div>
              <section className="grid gap-3 justify-start">
                <div className="flex gap-2  p-2 rounded-lg">
                  <Button
                    variant={stock.talle === "S" ? "default" : "ghost"}
                    onClick={() => handleTalleClick("S")}
                  >
                    S
                  </Button>
                  <Button
                    variant={stock.talle === "M" ? "default" : "ghost"}
                    onClick={() => handleTalleClick("M")}
                  >
                    M
                  </Button>
                  <Button
                    variant={stock.talle === "L" ? "default" : "ghost"}
                    onClick={() => handleTalleClick("L")}
                  >
                    L
                  </Button>
                  <Button
                    variant={stock.talle === "XL" ? "default" : "ghost"}
                    onClick={() => handleTalleClick("XL")}
                  >
                    XL
                  </Button>
                  <Button
                    variant={stock.talle === "XXL" ? "default" : "ghost"}
                    onClick={() => handleTalleClick("XXL")}
                  >
                    XXL
                  </Button>
                </div>
                <button className="text-left font-medium text-yellow-800">Guía de talles</button>
              </section>
              <div className="grid gap-3">
                <Button>Comprar</Button>
                <Button
                  variant={"secondary"}
                  onClick={() => handleCartClick(product)}
                >
                  Agregar al carrito
                </Button>
              </div>
            </footer>
          </aside>
        </article>
      )}
    </>
  );
}
