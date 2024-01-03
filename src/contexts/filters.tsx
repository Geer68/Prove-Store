import { createContext, useState } from "react";

type FilterProps = {
  collection: string;
  maxPrice: number;
  minPrice: number;
  search: string;
  category: string;
};

const initialFilterState: FilterProps = {
  collection: "",
  maxPrice: 0,
  minPrice: 0,
  search: "",
  category: "",
};

export const FiltersContext = createContext({
  filters: initialFilterState,
  searchFilter: (e: React.ChangeEvent<HTMLInputElement>) => {},
  setFilter: (newFilter: FilterProps) => {},
  changeFilters: (newFilters: FilterProps) => {},
});
export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilter] = useState<FilterProps>(initialFilterState);

  const changeFilters = (newFilters: FilterProps) => {
    console.log(newFilters);
    setFilter(newFilters);
  };

  const searchFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFilter({ ...filters, search: value });
  };

  return (
    <FiltersContext.Provider
      value={{ filters, changeFilters, setFilter, searchFilter }}
    >
      {children}
    </FiltersContext.Provider>
  );
}
