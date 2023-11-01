import { NavigationMenuNoShad } from "../componentsNoShad/NavigarionMenuNoShad";
import { NavigationMenuMobile } from "@/componentsNoShad/NavigationMenuMobile";
import { useEffect, useState } from "react";
import { getarticles } from "../../api/configs";
import { ProductoCard } from "../../src/componentsNoShad/ProductoCard";
import { Articulos } from "../../api/env";

export function HomePage() {
  const [articles, setArticles] = useState<Articulos[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await getarticles();
        setArticles(fetchedArticles);
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    fetchData(); 
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <nav>
        {windowWidth < 576 ? (
          <NavigationMenuMobile></NavigationMenuMobile>
        ) : (
          <NavigationMenuNoShad></NavigationMenuNoShad>
        )}
      </nav>
      <section className="grid gap-4 justify-items-center p-10 w-full relative">
        <img src="https://provestoree.com/wp-content/uploads/2023/09/IMG_9709.jpg" alt="" className="rounded-lg w-full brightness-75" />
        <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-2xl sm:text-6xl text-white font-tinos">PRØVE</h1>
      </section>
      {articles.length > 0 ? (
        <ProductoCard articles={articles} />
      ) : (
        <p>Cargando artículos...</p>
      )}
    </div>
  );
}
