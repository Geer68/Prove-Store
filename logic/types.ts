export const urls = {
  getProducts: "https://mp-node.vercel.app/get-allProducts",
  correoRapidAPI: "https://correo-argentino1.p.rapidapi.com/calcularPrecio",
  checkCupon: "https://mp-node.vercel.app/check-cupon",
  getFilteredProducts: "https://mp-node.vercel.app/filter-products",
  clearFilters: "https://mp-node.vercel.app/clear-filters",
};
export type Articulos = {
  id: number;
  category: string;
  url: string;
  nombre: string;
  precio: number;
  img: string;
  descripcion: string;
  detalles: string;
  coleccion: string;
  photos: {
    photo1: string;
    photo2?: string;
  };
};
export type ArticleOnCart = {
  item: Articulos;
  cantidad: number;
  talle: string;
};
export type Stock = {
  id: number;
  talle: string;
  stock: number;
};
export interface IpInfo {
  ip: string;
  city: string; //Departamento
  postal: string; //CP
  region: string; //Provincia
  region_code: string; //AR
  country_name: string; //Argentina
}

export interface Cupon {
  type: number;
  discount: number;
}
