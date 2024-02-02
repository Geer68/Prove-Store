import { useEffect, useState } from "react";
import { getWidth, getarticles } from "../../logic/configs";
import { ProductoCard } from "../components/ProductoCard";
import { Link } from "react-router-dom";
import { Articulos } from "../../logic/types";
import portada1 from "../imgs/ambos.jpg";
import Skeleton from "react-loading-skeleton";
import { Input } from "@/components/ui/input";
import { CarouselH } from "@/components/Carousel";
import { CategoryCard } from "@/components/CategoryCard";
import videoHome from "../imgs/video.mp4";

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

  const filterProducts = (query: string) => {
    const fillteredArticles = articles.filter(
      (product) => product.coleccion === query
    );
    return fillteredArticles;
  };

  return (
    <>
      <section className="grid gap-4  justify-items-center w-full relative">
        <img
          src="https://provestoree.com/wp-content/uploads/2024/02/IMG_3318.jpg"
          alt="Portada 1"
          className=" w-full brightness-50 sm:aspect-video sm:object-cover sm:max-h-96"
        />
        <div className="absolute  grid top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white items-center justify-center">
          <h1 className="text-7xl sm:text-7xl lg:text-9xl font-tinos mb-6">
            PRØVE
          </h1>
          <h3 className="uppercase font-bold">PRØVE World-Wide drop</h3>
          <Link
            to="/products"
            className="mt-6 border-b sm:text-xl border-white w-24 sm:w-auto flex text-center justify-between items-center mx-auto"
          >
            Comprar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link>
        </div>
      </section>
      <CarouselH />
      <section className="text-center grid gap-4 mt-10">
        {/* <h3 className="text-xl font-light sm:text-xl lg:text-2xl ">
          Ultimos productos
        </h3> */}
        <h2 className="text-2xl sm:text-3xl font-medium">
          Confort, frescura y versatilidad.
        </h2>
        <Link
          to="/products"
          className="mt-3 border-b sm:text-xl border-black w-24 sm:w-auto flex text-center justify-between items-center mx-auto"
        >
          Ver Más
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
          </svg>
        </Link>
      </section>
      {filterProducts("WorldWide").length > 0 ? (
        <ProductoCard
          articles={filterProducts("WorldWide")}
          until={getWidth()}
        />
      ) : (
        <div className="grid grid-cols-2 gap-4 gap-y-3 p-6 lg:grid-cols-4">
          {[...Array(getWidth())].map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              className="max-w-96 aspect-square rounded-lg lg:max-w-64"
            />
          ))}
        </div>
      )}
      <section className="grid gap-4 mt-10 justify-items-center w-full relative">
        <video
          src={videoHome}
          className="w-full brightness-75 sm:aspect-video sm:object-cover sm:max-h-96"
          autoPlay
          muted
          loop
        ></video>
        <div className="absolute  grid top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white items-center justify-center">
          <h1 className="text-7xl sm:text-7xl lg:text-9xl font-tinos mb-6 mix-blend-difference">
            PRØVE
          </h1>
          <h3 className="uppercase font-bold mix-blend-difference">
            PRØVE live to win drop
          </h3>
          {/* <h3 className="text-sm font-light sm:text-lg lg:text-2xl max-w-4xl ">
            La colección de shorts 'LTW' se inspira en la esencia del
            baloncesto, fusionando moda urbana y deportiva para ofrecer máxima
            comodidad sin sacrificar el estilo.
          </h3> */}
          {/* <Link
            to="/products"
            className="mt-6 border-b sm:text-xl border-white w-24 sm:w-auto flex text-center justify-between items-center mx-auto"
          >
            Comprar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link> */}
        </div>
      </section>
      <section className="text-center grid gap-4 mt-10">
        {/* <h3 className="text-xl font-light sm:text-xl lg:text-2xl ">
          Ultimos productos
        </h3> */}
        <h2 className="text-2xl sm:text-3xl font-medium">
          Comodidad, estilo, minimalismo.
        </h2>
        <Link
          to="/products"
          className="mt-3 border-b sm:text-xl border-black w-24 sm:w-auto flex text-center justify-between items-center mx-auto"
        >
          Ver Más
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
          </svg>
        </Link>
      </section>
      {articles.length > 0 ? (
        <ProductoCard articles={articles} until={getWidth()} />
      ) : (
        <div className="grid grid-cols-2 gap-4 gap-y-3 p-6 lg:grid-cols-4">
          {[...Array(getWidth())].map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              className="max-w-96 aspect-square rounded-lg lg:max-w-64"
            />
          ))}
        </div>
      )}
      <section className="text-center grid gap-4 mt-16 mb-10">
        <h2 className="text-2xl sm:text-3xl font-medium">
          Nuestras colecciones
        </h2>
        <CategoryCard cantidad={getWidth()} productos={articles} />
      </section>

      <section className="grid gap-4 mt-10 sm:px-12 bg-black ">
        <div className="sm:flex sm:justify-between p-4 lg:px-32">
          <div className="col-md-8 col-lg-16 mt-10">
            <div className="mb-4 uppercase text-white">Newsletter</div>
            <h3 className="text-3xl text-white font-bold">
              Suscribite a nuestro newsletter
            </h3>
            <p className="text-white text-sm mt-5">
              ¿Querés recibir nuestras ofertas? ¡Suscribite y comenzá a
              disfrutarlas!
            </p>
            <Input className="my-10" type="email" placeholder="Email"></Input>
          </div>
          <img
            className="h-auto"
            src="//acdn.mitiendanube.com/stores/219/431/themes/rio/img-481748057-1677606488-ae94298c91ca1734f47cfcc6647fba2f1677606489.gif?263846464"
            data-src="//acdn.mitiendanube.com/stores/219/431/themes/rio/img-481748057-1677606488-ae94298c91ca1734f47cfcc6647fba2f1677606489.gif?263846464"
            alt="Gif de King of the Kongo"
          ></img>
        </div>
      </section>
      <section className="grid gap-4 mt-10 justify-items-center w-full relative">
        <img
          src={portada1}
          alt="Portada 1"
          className=" w-full brightness-50 sm:aspect-video sm:object-cover sm:max-h-96"
        />
        <div className="absolute  grid top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white items-center justify-center">
          <h1 className="text-7xl sm:text-7xl lg:text-8xl font-tinos mb-6">
            PRØVE
          </h1>
          <h3 className="uppercase font-bold">
            We are not a brand, we are a family
          </h3>
          {/* <h3 className="text-sm font-light sm:text-lg lg:text-2xl max-w-4xl ">
            La colección de shorts 'LTW' se inspira en la esencia del
            baloncesto, fusionando moda urbana y deportiva para ofrecer máxima
            comodidad sin sacrificar el estilo.
          </h3> */}
          <Link
            to="/products"
            className="mt-6 border-b sm:text-xl border-white w-24 sm:w-auto flex text-center justify-between items-center mx-auto"
          >
            Comprar
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M13 7h-6l4 5l-4 5h6l4 -5z"></path>
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
