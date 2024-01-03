export const urls = {
  getArticulos:
    "https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?select=*",
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
  cupon: string;
  m_porcent: number;
  m_neto: number;
  restantes: number;
  type: number;
}
