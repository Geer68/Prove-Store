import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { useFilters } from "@/hooks/useFilters";
import { clearFilters, getFilterProducts } from "../../logic/configs";
import { useState } from "react";
import toast from "react-hot-toast";
import { notifyError } from "@/hooks/toast";

export function DrawerFilters() {
  const [values, setValues] = useState({
    minPrice: 0,
    maxPrice: 0,
    search: "",
    category: "Todas",
    collection: "Todas",
  });
  const {
    filters,
    setFilteredProducts,
    categoryFilter,
    minPriceFilter,
    maxPriceFilter,
    collectionFilters,
  } = useFilters();

  const handdleApplyClick = async () => {
    if (
      filters.category == "" &&
      filters.collection == "" &&
      filters.minPrice == 0 &&
      filters.maxPrice == 0 &&
      filters.search == ""
    ) {
      notifyError("No hay filtros para aplicar");
      return;
    }
    setValues(filters);
    const filteredProducts = await getFilterProducts(filters);
    setFilteredProducts(filteredProducts);
    if (filteredProducts == null) {
      notifyError("No existen coincidencias");
    } else {
      toast.success("Filtros aplicados");
      setFilteredProducts(filteredProducts);
    }
  };

  const handdleClearClick = async () => {
    setValues({
      minPrice: 0,
      maxPrice: 0,
      search: "",
      category: "Todas",
      collection: "Todas",
    });
    const allProducts = await clearFilters();
    console.log(allProducts);
    if (allProducts !== undefined) {
      setFilteredProducts(allProducts);
    }
  };
  return (
    <Dialog>
      <DialogTrigger className="text-sm font-medium text-yellow-900 hover:text-yellow-800">
        <Filter size={20} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
          <DialogDescription>
            Encontrá esos productos que deseas
          </DialogDescription>
        </DialogHeader>
        <section className="pt-5 grid gap-5">
          <div>
            <Label htmlFor="categorias">Categoría</Label>
            <Select onValueChange={(e) => categoryFilter(e)}>
              <SelectTrigger id="categorias" className="w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="Remeras">Remeras</SelectItem>
                <SelectItem value="Buzos">Buzos</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="coleccion">Coleción</Label>
            <Select onValueChange={(e) => collectionFilters(e)}>
              <SelectTrigger id="coleccion" className="w-full">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas">Todas</SelectItem>
                <SelectItem value="SYBH">SYBH</SelectItem>
                <SelectItem value="Good Energy">Good Energy</SelectItem>
                <SelectItem value="Pr<3ve">Pr💔ve</SelectItem>
                <SelectItem value="ProveClub">ProveClub</SelectItem>
                <SelectItem value={`Logo "Prove"`}>Logo "Prove"</SelectItem>
                <SelectItem value="Broken Heart">Broken Heart</SelectItem>
                <SelectItem value="WorldWide">World-Wide</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Label htmlFor="picture" className="text-sm">
            Precios
          </Label>
          <div className="grid grid-cols-2 gap-4">
            <aside className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="min">Desde</Label>
              <Input
                id="min"
                type="number"
                defaultValue={values.minPrice}
                onChange={minPriceFilter}
              />
            </aside>
            <aside className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="max">Hasta</Label>
              <Input
                id="max"
                type="number"
                defaultValue={values.maxPrice}
                onChange={maxPriceFilter}
              />
            </aside>
          </div>
        </section>
        <footer className=" flex gap-3 justify-end p-6">
          <Button variant={"secondary"} onClick={handdleClearClick}>
            Limpiar Filtros
          </Button>
          <Button onClick={handdleApplyClick}>Aplicar Filtros</Button>
        </footer>
      </DialogContent>
    </Dialog>
  );
}
