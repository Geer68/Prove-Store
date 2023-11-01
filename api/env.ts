export const apiKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVuZm56cnJ5dWp5bWZsZWRreWJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwODE5MjUsImV4cCI6MjAxMDY1NzkyNX0.iBxVkKrW9QA_8aCN8nU8Irygi2sOnIYgVeCFm-nLhJA'


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