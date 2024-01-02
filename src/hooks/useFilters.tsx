import { useContext } from "react";
import { FiltersContext } from "@/mineComponents/filters";

export function useFilters() {
    const {filters, setFilters} = useContext(FiltersContext);

    const filterProducts = products => {
        return products.filter(product => {
            return (
                
            )
        })
    }
}
