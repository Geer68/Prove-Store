import { useEffect, useState } from "react";
import { ProductoCard } from "@/components/ProductoCard";
import { getarticles } from "../../logic/configs";
import { Articulos } from "logic/types";
import { useFilters } from "@/hooks/useFilters";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Banner } from "@/components/Banner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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
          onChange={searchFilter}
          placeholder="Buscar productos"
          name="search"
        />
        <Drawer>
          <DrawerTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
            <Filter size={20} />
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
            <section className="p-6 grid gap-5">
              <div>
                <Label htmlFor="categorias">Categoría</Label>
                <Select>
                  <SelectTrigger
                    id="categorias"
                    className="w-full sm:w-[180px]"
                  >
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="remeras">Remeras</SelectItem>
                    <SelectItem value="buzos">Buzos</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="coleccion">Coleecion</Label>
                <Select>
                  <SelectTrigger id="coleccion" className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">SYBH</SelectItem>
                    <SelectItem value="dark">Good Energy</SelectItem>
                    <SelectItem value="system">Pr💔ve</SelectItem>
                    <SelectItem value="system">Prove Club</SelectItem>
                    <SelectItem value="system">Logo "Prove"</SelectItem>
                    <SelectItem value="system">Broken Heart</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Label htmlFor="picture" className="text-sm">
                Precios
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <aside className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="min">Desde</Label>
                  <Input id="min" type="number" />
                </aside>
                <aside className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="max">Hasta</Label>
                  <Input id="max" type="number" />
                </aside>
              </div>
            </section>
          </DrawerContent>
        </Drawer>
      </header>
      {articles.length == 0 ? (
        <Banner />
      ) : (
        <ProductoCard until={99} articles={articles} />
      )}
    </>
  );
}
