import { createContext, useState } from "react";

type FilterProps = {
  order: null | false | true;
  collection: string;
  maxPrice: number;
  minPrice: number;
  search: string;
  category: string;
};

type FiltersContextProps = {
  filters: FilterProps;
  changeFilters: (newFilters: FilterProps) => void;
};

const initialFilterState: FilterProps = {
  order: null,
  collection: "",
  maxPrice: 0,
  minPrice: 0,
  search: "",
  category: "",
};

export const FiltersContext = createContext<FiltersContextProps | undefined>(
  undefined
);
export function FiltersProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilter] = useState<FilterProps>(initialFilterState);

  const changeFilters = (newFilters: FilterProps) => {
    console.log(newFilters);
    setFilter(newFilters);
  };

  return (
    <FiltersContext.Provider value={{ filters, changeFilters }}>
      {children}
    </FiltersContext.Provider>
  );
}
