import { useContext } from "react";
import { FiltersContext } from "@/contexts/filters";

export function useFilters() {
  const {
    filters,
    filteredProducts,
    setFilteredProducts,
    setFilter,
    changeFilters,
    searchFilter,
    collectionFilters,
    categoryFilter,
    minPriceFilter,
    maxPriceFilter,
    clearFilters,
  } = useContext(FiltersContext);

  return {
    filters,
    filteredProducts,
    setFilteredProducts,
    setFilter,
    changeFilters,
    searchFilter,
    categoryFilter,
    collectionFilters,
    minPriceFilter,
    maxPriceFilter,
    clearFilters,
  };
}
