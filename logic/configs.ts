import { urls, Articulos, Stock, IpInfo, Cupon } from "./types";
import axios from "axios";
import { notifyENoSelectedTalle } from "../src/hooks/toast";

const { VITE_API_KEY: apiKey } = import.meta.env;

export async function getarticles(): Promise<Articulos[]> {
  return fetch(urls.getArticulos, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener los datos");
      }
      return res.json();
    })
    .then((data) => {
      const articles: Array<Articulos> = data.map((item: Articulos) => {
        return {
          id: item.id,
          category: item.category,
          url: item.url,
          precio: item.precio,
          img: item.img,
          nombre: item.nombre,
          descripcion: item.descripcion,
          detalles: item.detalles,
        };
      });
      return articles;
    })
    .catch((err) => {
      throw err;
    });
}
export const EVENTS = {
  pushtate: "pushState",
  popstate: "popState",
};
export function completeUrlProduct(url: string | undefined): string {
  const completedUrl = `https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?url=eq.${url}&select=*`;
  return completedUrl;
}
export async function getProductUrl(
  url: string | undefined
): Promise<Articulos> {
  const modUrl = completeUrlProduct(url);
  return fetch(modUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Error al obtener los datos");
      }
      return res.json();
    })
    .then((data) => {
      return data[0] || null;
    })
    .catch((err) => {
      throw err;
    });
}
export function completeUrlStock(id: number): string {
  return `https://unfnzrryujymfledkybt.supabase.co/rest/v1/stocks?id=eq.${id}&select=*`;
}
export async function getStockTalle(id: number): Promise<Stock[] | null> {
  if (!id) return null;
  const modUrl = completeUrlStock(id);

  const response = await axios.get(modUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  });
  return response.data || null;
}

export async function getIpClient(): Promise<IpInfo> {
  const response = await axios.get(
    "https://api.ipdata.co?api-key=1521df7b16703b3f460842fe2d91e14724870609a090b14f624d75f4"
  );
  return response.data;
}

export async function getPriceDelivery(): Promise<number> {
  const ip: IpInfo = await getIpClient();
  if (ip.postal == "5539") {
    return 0;
  }
  const options = {
    method: "GET",
    url: "https://correo-argentino1.p.rapidapi.com/calcularPrecio",
    params: {
      cpOrigen: "5500",
      cpDestino: ip.postal,
      provinciaOrigen: `AR-${ip.region_code}`,
      provinciaDestino: "AR-S",
      peso: "1",
      //TODO: Agregar parámetro del peso
    },
    headers: {
      "X-RapidAPI-Key": "0a15cf21dfmsh68ac299117c9b9fp14954fjsn42453f3565a2",
      "X-RapidAPI-Host": "correo-argentino1.p.rapidapi.com",
    },
  };
  const response = await axios.request(options);
  return response.data?.paqarClasico?.aDomicilio || 0;
}

export async function checkCupon(cuponInput: string): Promise<Cupon> {
  const options = {
    method: "GET",
    url: `https://unfnzrryujymfledkybt.supabase.co/rest/v1/cupones?cupon=eq.${cuponInput}&select=*`,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  };
  const response = await axios.request(options);
  return response.data[0] || null;
}

export async function mp(productId: number | undefined, size: string) {
  console.log(productId, size);
  if (!productId) return;
  if (size === " ") {
    notifyENoSelectedTalle();
    return;
  }
  try {
    const response = await axios.post(
      "https://mp-node.vercel.app/create-order",
      {
        productId: productId,
        size: size,
      }
    );
    window.open(response.data, "_blank");
    console.log(response);
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
