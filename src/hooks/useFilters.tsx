import { useContext } from "react";
import { FiltersContext } from "@/contexts/filters";
import { Articulos } from "logic/types";

export function useFilters() {
  const { filters, setFilter, changeFilters, searchFilter } =
    useContext(FiltersContext);

  const filterProducts = (products: Articulos[]) => {
    if (filters.search !== "") {
      return products.filter((product) => {
        return product.nombre
          .toLowerCase()
          .includes(filters.search.toLowerCase());
      });
    } else {
      return products;
    }
  };

  return { filters, filterProducts, setFilter, changeFilters, searchFilter };
}
