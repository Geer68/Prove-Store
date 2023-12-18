export const urls = {
    getArticulos: 'https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?select=*',
}
export type Articulos = {
    id: number;
    category: string;
    url: string;
    nombre: string;
    precio: number;
    img: string;
    descripcion: string;
} 
export type ArticleOnCart = {
    item: Articulos,
    cantidad: number
    talle: string
}
export type Stock = {
    id: number;
    talle: string;
    stock: number;
}
export interface IpInfo {
    ip: string;
    postal: string;
    region: string;
    region_code: string;
    country_name: string;
  }