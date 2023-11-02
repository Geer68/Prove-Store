
export const urls = {
    getArticulos: 'https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?select=*',
}

export type Articulos = {
    id: number;
    tipo: string;
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
    talle: string;
    stock: number;
}
//https://provestoree.com/wp-content/uploads/2022/09/cancha.jpg cancha
//https://provestoree.com/wp-content/uploads/2023/09/IMG_9709.jpg caminando