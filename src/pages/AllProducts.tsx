import { ProductoCard } from "@/components/ProductoCard";
import { Input } from "@/components/ui/input";
import { DrawerFilters } from "@/components/DrawerFilters";
import { useFilters } from "@/hooks/useFilters";
import { getarticles } from "../../logic/configs";
import { useEffect, useState } from "react";
import { Articulos } from "logic/types";
import { NoMatchesSearch } from "@/components/NoMatchesSearch";

export function AllProducts() {
  const { searchFilter } = useFilters();
  const [articles, setArticles] = useState<Articulos[] | null>([]);
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
      setArticles(null);
    }
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
      {hanndleCards()}
    </>
  );
}
