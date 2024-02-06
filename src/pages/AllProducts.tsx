import { ProductoCard } from "@/components/ProductoCard";
import { Input } from "@/components/ui/input";
import { DrawerFilters } from "@/components/DrawerFilters";
import { useFilters } from "@/hooks/useFilters";
import { getWidth, getarticles } from "../../logic/configs";
import { useEffect, useState } from "react";
import { Articulos } from "logic/types";
import { NoMatchesSearch } from "@/components/NoMatchesSearch";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";

export function AllProducts() {
  const { query } = useParams();

  const { searchFilter } = useFilters();
  const [articles, setArticles] = useState<Articulos[]>([]);
  const { filteredProducts } = useFilters();
  const fetchData = async () => {
    try {
      const fetchedArticles = await getarticles();
      setArticles(fetchedArticles);
    } catch (error) {
      console.error("Error al obtener los artículos:", error);
    }
  };

  const hanndleCards = () => {
    if (filteredProducts !== null) {
      return <ProductoCard until={99} articles={articles} />;
    }
    return <NoMatchesSearch />;
  };

  useEffect(() => {
    if (filteredProducts?.length == 0) {
      fetchData();
    } else if (filteredProducts != null) {
      setArticles(filteredProducts);
    }
    if (filteredProducts == null) {
      setArticles([]);
    }
    console.log(query);
  }, [filteredProducts]);
  return (
    <>
      <header className="flex gap-2 pt-5 pb-0 p-4">
        <Input
          onChange={searchFilter}
          placeholder="Buscar productos"
          name="search"
        />
        <DrawerFilters />
      </header>
      {articles.length > 0 ? (
        hanndleCards()
      ) : (
        <div className="grid grid-cols-2 gap-4 gap-y-3 p-6 lg:grid-cols-4">
          {[...Array(getWidth() + 2)].map((_, index) => (
            <Skeleton
              key={index}
              count={1}
              className="max-w-96 aspect-square rounded-lg lg:max-w-64"
            />
          ))}
        </div>
      )}
      {}
    </>
  );
}
