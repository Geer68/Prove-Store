import { Articulos } from "logic/types";
import { createContext, useState } from "react";

export type FilterProps = {
  collection: string;
  maxPrice: number;
  minPrice: number;
  search: string;
  category: string;
};

const initialFilterState = {
  collection: "Todas",
  maxPrice: 0,
  minPrice: 0,
  search: "",
  category: "Todas",
};

export const FiltersContext = createContext({
  filters: initialFilterState,
  filteredProducts: [] as Articulos[] | null,
  setFilteredProducts: (products: Articulos[] | null) => {},
  searchFilter: (e: React.ChangeEvent<HTMLInputElement>) => {},
  setFilter: (newFilter: FilterProps) => {},
  changeFilters: (newFilters: FilterProps) => {},
  categoryFilter: (e: string) => {},
  minPriceFilter: (e: React.ChangeEvent<HTMLInputElement>) => {},
  maxPriceFilter: (e: React.ChangeEvent<HTMLInputElement>) => {},
  collectionFilters: (e: string) => {},
  clearFilters: () => {},
});
export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilter] = useState<FilterProps>(initialFilterState);
  const [filteredProducts, setFilteredProducts] = useState<Articulos[] | null>(
    []
  );
  const clearFilters = async () => {
    setFilter(initialFilterState);
  };
  const changeFilters = (newFilters: FilterProps) => {
    setFilter(newFilters);
  };

  const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter({ ...filters, search: value });
  };

  const categoryFilter = (e: string) => {
    setFilter({ ...filters, category: e });
  };

  const collectionFilters = (e: string) => {
    setFilter({ ...filters, collection: e });
  };

  const minPriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter({ ...filters, minPrice: parseInt(value) });
  };

  const maxPriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter({ ...filters, maxPrice: parseInt(value) });
  };

  return (
    <FiltersContext.Provider
      value={{
        filters,
        filteredProducts,
        setFilteredProducts,
        changeFilters,
        setFilter,
        searchFilter,
        categoryFilter,
        collectionFilters,
        minPriceFilter,
        maxPriceFilter,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
