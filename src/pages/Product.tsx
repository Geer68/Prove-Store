import { getProductUrl, getStockTalle } from "../../logic/configs";
import { useEffect, useState, useContext } from "react";
import { Button } from "@/components/ui/button"
import { Breadcrumb } from "../mineComponents/Breadcrumb";
import { Articulos, Stock, ArticleOnCart } from "logic/types";
import { CartContext } from "../mineComponents/context";
import toast from 'react-hot-toast';
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
        border: '1px solid #252525',
        padding: '16px',
        color: '#252525',
      },
      iconTheme: {
        primary: '#252525',
        secondary: '#FFFAEE',
      },
    });
  }

  const notifyError = () => {
    if (!stock.talle) {
      toast.error("No seleccionaste un talle")
    } else if (!stock.stock) {
      toast.error("No tenemos este talle :c")

    }
  }
  const handleCartClick = (producto: Articulos | null | undefined) => {
    if (producto && stock.talle && stock.stock > 0) {
      const itemToAdd: ArticleOnCart = {
        item: producto,
        cantidad: 1,
        talle: stock.talle
      }
      addToCart(itemToAdd);
      notify(itemToAdd);
    } else if (stock.stock == 0) {
      notifyError()
    }
  }


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
          {loading ? (
            <div>Cargando...</div>
          ) : (
            <main className="grid justify-center items-center gap-7 m-10 sm:flex sm:gap-4 sm:mx-20 sm:ml-20 sm:mt-10">
              <aside>
                <img src={product?.img} alt="" className="rounded-lg w-96" />
              </aside>
              <aside>
                <article className='grid gap-3 p-5 border-2 rounded-lg  border-gray-100'>
                  <h1 className="font-bold text-2xl">{product?.nombre}</h1>
                  <p className="font-medium text-gray-400">${product?.precio}</p>
                  <p className="text-sm bg-gray-100 p-3 rounded-lg max-w-md font-medium">{product?.descripcion}</p>
                  <div className="flex gap-4">
                    <p>Talle</p>
                    <p className="font-bold text-purple-700">{stock?.talle}</p>
                    <section className="flex gap-1">
                      <p>{stock?.stock}</p>
                      <p>disponibles</p>
                    </section>
                  </div>
                  <section className="grid gap-3 justify-start">
                    <div className="flex gap-2 bg-gray-100 p-2 rounded-lg">
                      {/* hacer componente */}
                      <button onClick={() => handleTalleClick('S')} className={`rounded ${stock.talle === 'S' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>S</button>
                      <button onClick={() => handleTalleClick('M')} className={`rounded ${stock.talle === 'M' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>M</button>
                      <button onClick={() => handleTalleClick('L')} className={`rounded ${stock.talle === 'L' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>L</button>
                      <button onClick={() => handleTalleClick('XL')} className={`rounded ${stock.talle === 'XL' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>XL</button>
                      <button onClick={() => handleTalleClick('XXL')} className={`rounded ${stock.talle === 'XXL' ? 'bg-white' : 'none'} pl-3 pr-3 p-1 hover-bg-white focus-bg-white`}>XXL</button>
                    </div>
                    <button className="text-left">Guía de talles</button>
                  </section>
                  <div className="grid gap-3">
                    <Button>Comprar</Button>
                    <Button variant={"secondary"} onClick={() => handleCartClick(product)}>Agregar al carrito</Button>
                  </div>
                </article>
              </aside>
            </main>
          )}
    </>
  );
}
