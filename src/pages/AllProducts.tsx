import { useEffect, useState } from "react";
import { ProductoCard } from "@/components/ProductoCard";
import { getarticles } from "../../logic/configs";
import { Articulos } from "logic/types";
import { useFilters } from "@/hooks/useFilters";
import { Select } from "@/components/Select";
import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  // DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/Input";
import { NoMatchesSearch } from "@/components/NoMatchesSearch";

export function AllProducts() {
  const { filters, filterProducts, searchFilter } = useFilters();
  const [articles, setArticles] = useState<Articulos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedArticles = await getarticles();
        setArticles(filterProducts(fetchedArticles));
      } catch (error) {
        console.error("Error al obtener los artículos:", error);
      }
    };

    fetchData();
  }, [filters]); // Asegúrate de actualizar los productos cuando cambian los filtros

  return (
    <>
      <header className="flex gap-2 pt-5 pb-0 p-4">
        <Input
          searchFilter={searchFilter}
          text="Buscar productos"
          name="search"
        />
        <Drawer>
          <DrawerTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
            F
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filtros</DrawerTitle>
              {/* <DrawerDescription>Aun no lo termino</DrawerDescription> */}
              <header className="flex gap-3 mt-4">
                <Button variant={"secondary"}>Limpiar Filtros</Button>
                <Button>Aplicar Filtros</Button>
              </header>
            </DrawerHeader>
            <section className="p-6">
              <Select
                text="Categoría"
                id="categoria"
                options={["Pantalones", "Remeras", "Shorts", "Sudaderas"]}
                defaultValue={"Todas"}
              />
              <Select
                text="Precios"
                id="precios"
                options={["Pantalones", "Remeras", "Shorts", "Sudaderas"]}
                defaultValue={"Sin precio"}
              />
              <Select
                text="Colección"
                id="collection"
                options={["ProveClub", "SYBH"]}
                defaultValue={"Todas"}
              />
            </section>
            <DrawerFooter>
              {/* <DrawerClose>Cancel</DrawerClose> */}
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </header>
      {console.log(articles)}
      {articles.length == 0 ? (
        <NoMatchesSearch />
      ) : (
        <ProductoCard until={99} articles={articles} />
      )}
    </>
  );
}
