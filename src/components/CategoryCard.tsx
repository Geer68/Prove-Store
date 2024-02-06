import { Articulos } from "logic/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function CategoryCard({
  cantidad,
  productos,
}: {
  cantidad: number;
  productos: Articulos[];
}) {
  const [collections, setCollections] = useState<
    { img: string; collection: string }[]
  >([]);

  const restar = () => {
    if (cantidad >= 6) {
      return 4;
    }
    return 2;
  };
  useEffect(() => {
    // Extracting collections with images
    const uniqueCollections = Array.from(
      new Set(productos.map((article) => article.coleccion))
    );

    const collectionsData = uniqueCollections.map((collection) => {
      const firstArticleInCollection = productos.find(
        (product) => product.coleccion === collection
      );

      return {
        img: firstArticleInCollection?.img || "",
        collection: collection,
      };
    });

    // Obtener una copia aleatoria del array (collectionsData)
    const shuffledCollections = collectionsData
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value);

    // Tomar una cantidad limitada
    const limitedCollections = shuffledCollections.slice(
      0,
      cantidad - restar()
    );

    setCollections(limitedCollections);
  }, [productos, cantidad]);

  return (
    <div className="grid mt-6 p-4 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {collections.map((collection, index) => (
        <Link to={`/products/${collection.collection}`} key={index}>
          <div className="relative group overflow-hidden bg-gray-200 aspect-w-7 aspect-h-8 rounded-lg ">
            <img
              src={collection.img}
              alt={collection.collection}
              className="w-full h-full object-cover object-center transition-transform transform hover:scale-110 group-hover:scale-105 brightness-50"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="text-white uppercase text-2xl font-tinos text-center bg-opacity-50 p-2">
                {collection.collection}
              </h3>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
