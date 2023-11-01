import { apiKey, urls, Articulos, Stock} from "./env";

export async function getarticles(): Promise<Articulos[]>{
    return fetch(urls.getArticulos, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            apikey: `${apiKey}`,
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al obtener los datos");
        }
        return res.json();
    })
    .then(data => {
        const articles: Array<Articulos> = data.map((item: Articulos) => {
            return {
                id: item.id,
                tipo: item.tipo,
                url: item.url,
                precio: item.precio,
                img: item.img,
                nombre: item.nombre,
                descripcion: item.descripcion
            };
        });
        return articles;
    })
    .catch(err => {
        console.log(err);
        throw err; 
    });
}
export const EVENTS = {
    pushtate: 'pushState',
    popstate: 'popState'
}
export function completeUrlProduct(url: string): string  {
    const completedUrl =`https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?url=eq.${url}&select=*`
    return completedUrl;
}
export async function getProductUrl(url: string): Promise<Articulos>  {
    const modUrl = completeUrlProduct(url);
    return fetch(modUrl, {
        headers: {
            Authorization: `Bearer ${apiKey}`,
            apikey: `${apiKey}`,
        },
    })
    .then(res => {
        if (!res.ok) {
            throw new Error("Error al obtener los datos");
        }
        return res.json();
    })
    .then(data => {
        return data[0] || null;
    })
    .catch(err => {
        console.log(err);
        throw err; 
    });
}
export function completeUrlStock(talle: string, id: number): string  {
    const completedUrl =`https://unfnzrryujymfledkybt.supabase.co/rest/v1/stocks?id=eq.${id}&talle=eq.${talle}&select=stock`
    return completedUrl;
}
export async function getStockTalle(talle: string, id: number): Promise<Stock> {
    const modUrl = completeUrlStock(talle, id);
    return fetch(modUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        apikey: `${apiKey}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Error al obtener los datos");
        }
        return res.json();
      })
      .then(data => {
        return data[0] || { talle,stock: 0 }; // Devuelve el primer elemento o null si no hay datos
      })
      .catch(err => {
        console.log(err);
        throw err;
      });
  }
  

