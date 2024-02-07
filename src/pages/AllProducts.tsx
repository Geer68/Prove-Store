import { ProductoCard } from "@/components/ProductoCard";
import { Input } from "@/components/ui/input";
import { DrawerFilters } from "@/components/DrawerFilters";
import { useFilters } from "@/hooks/useFilters";
import {
  getFilterProducts,
  getWidth,
  useDocumentTitle,
} from "../../logic/configs";
import { useEffect, useState } from "react";
import { Articulos } from "logic/types";
import { NoMatchesSearch } from "@/components/NoMatchesSearch";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { notifyError } from "@/hooks/toast";

export function AllProducts() {
  const { collection, category } = useParams();
  const { searchFilter } = useFilters();
  const [articles, setArticles] = useState<Articulos[]>([]);
  const {
    filteredProducts,
    collectionFilters,
    categoryFilter,
    filters,
    setFilteredProducts,
    clearFilters,
  } = useFilters();

  const hanndleCards = () => {
    if (filteredProducts !== null) {
      return <ProductoCard until={99} articles={filteredProducts} />;
    }
    return <NoMatchesSearch />;
  };
  useDocumentTitle("Prove Store");
  const handdleUrl = async () => {
    let updatedFilters = { ...filters };
    if (collection === "all" && category === undefined) {
      clearFilters();
      updatedFilters = {
        ...updatedFilters,
        collection: "Todas",
        category: "Todas",
      };
    }
    if (collection !== "all" || category !== undefined) {
      if (collection === "all") {
        updatedFilters = {
          ...updatedFilters,
          collection: "Todas",
        };
        collectionFilters("Todas");
      } else {
        updatedFilters = {
          ...updatedFilters,
          collection: collection || "Todas",
        };
        collectionFilters(updatedFilters.collection);
      }
      categoryFilter(category || "Todas");

      // Actualizar la copia local de los filtros
      updatedFilters = {
        ...updatedFilters,
        category: category || "Todas",
      };
    }

    const filteredProducts = await getFilterProducts(updatedFilters);
    setFilteredProducts(filteredProducts);

    if (filteredProducts == null) {
      notifyError("No existen coincidencias");
    } else {
      setFilteredProducts(filteredProducts);
    }
  };

  useEffect(() => {
    const fetchDataAndHandleUrl = async () => {
      await handdleUrl();

      if (filteredProducts != null) {
        setArticles(filteredProducts);
      } else {
        setArticles([]);
      }
    };

    fetchDataAndHandleUrl();
  }, [collection, category]);
  return (
    <>
      <header className="flex gap-2 pt-5 pb-0 items-center justify-center  p-4">
        <Input
          onChange={searchFilter}
          placeholder="Buscar productos"
          name="search"
          className="w-2/4"
        />
        <DrawerFilters />
      </header>
      {articles !== null ? (
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
