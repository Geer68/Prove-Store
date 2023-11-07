import { useEffect, useState } from "react";
import { getarticles } from "../../logic/configs";
import { ProductoCard } from "../mineComponents/ProductoCard";
import { Link } from "react-router-dom";
import { Articulos } from "../../logic/types";
import portada1 from "../imgs/ambos.jpg";
import portada2 from "../imgs/chica.jpg";

export function HomePage() {
  const [articles, setArticles] = useState<Articulos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await getarticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };


    fetchData();
  }, []);

  return (
    <>
      <section className="grid gap-4 justify-items-center w-full relative">
        <img src={portada1} alt="" className="w-full brightness-50" />
        <div className="absolute w-4/6 grid top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white items-center justify-center">
          <h1 className="text-4xl sm:text-6xl font-tinos mb-6">PRØVE</h1>
          <h3 className="text-sm font-light sm:text-5xl max-w-4xl">La colección de shorts 'LTW' se inspira en la esencia del baloncesto, fusionando moda urbana y deportiva para ofrecer máxima comodidad sin sacrificar el estilo.</h3>
          <Link to="/articles" className="mt-6 border-b border-white w-24 flex text-center justify-between items-center mx-auto">
            Comprar
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link>
        </div>
      </section>
      <section className="text-center grid gap-4 mt-10">
        <h3 className="text-md font-light sm:text-5xl max-w-4xl">Ultimos productos</h3>
        <h2 className="text-xl sm:text-5xl max-w-4xl font-medium">Comodidad, estilo, minimalismo.</h2>
        <Link to="/articles" className="mt-3 border-b border-black w-24 flex text-center justify-between items-center mx-auto">
            Ver Más
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link>
      </section>
      {articles.length > 0 ? (
        <ProductoCard articles={articles} until={4} />
      ) : (
        <p>Cargando artículos...</p>
      )}
      <section className="grid gap-4 mt-10 p-4 bg-orange-100">
        <img src={portada2} alt="" className="aspect-square object-cover" />
        <h3 className="text-xl sm:text-5xl max-w-4xl font-medium">Diseñada para comodidad y estilo en outfits únicos.</h3>
        <Link to="/articles" className="mt-3 border-b border-black w-24 flex text-center justify-between">
            Ver Más
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link>
      </section>
    </>
  );
}
