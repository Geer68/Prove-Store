import toast from "react-hot-toast";
import { urls, Articulos, Stock, IpInfo, Cupon } from "./types";
import axios from "axios";

const { VITE_API_KEY: apiKey } = import.meta.env;

export async function getarticles(): Promise<Articulos[]> {
  const response = await axios.get(urls.getArticulos, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  });

  if (!response.data) {
    throw new Error("Error al obtener los datos");
  }

  const articles: Array<Articulos> = response.data.map((item: Articulos) => ({
    id: item.id,
    category: item.category,
    url: item.url,
    precio: item.precio,
    img: item.img,
    nombre: item.nombre,
    descripcion: item.descripcion,
    detalles: item.detalles,
  }));

  return articles;
}
export function completeUrlProduct(url: string | undefined): string {
  return `https://unfnzrryujymfledkybt.supabase.co/rest/v1/products?url=eq.${url}&select=*`;
}

export async function getProductUrl(
  url: string | undefined
): Promise<Articulos> {
  const modUrl = completeUrlProduct(url);
  const response = await axios.get(modUrl, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      apikey: `${apiKey}`,
    },
  });

  if (!response.data || response.data.length === 0) {
    throw new Error("Error al obtener los datos");
  }

  return response.data[0];
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
export async function checkCupon(cuponInput: string): Promise<Cupon | null> {
  const response = await axios.post("https://mp-node.vercel.app/check-cupon", {
    cupon: cuponInput,
  });
  if (response.data.error) {
    toast.error("Cupon no valido");
    return null;
  }
  const cupon = {
    type: response.data.type,
    discount: response.data.m_porcent || response.data.m_neto,
  };
  return cupon;
}
