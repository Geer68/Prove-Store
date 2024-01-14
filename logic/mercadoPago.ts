import { notifyENoSelectedTalle } from "../src/hooks/toast";
import { ArticleOnCart } from "../logic/types";
import axios from "axios";

export async function mpIndividual(
  productId: number | undefined,
  size: string
) {
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
  } catch (error) {
    console.error("Error creating order:", error);
  }
}

export async function mpVarios(products: ArticleOnCart[]): Promise<void> {
  if (!products) return;
  try {
    const response = await axios.post(
      "https://mp-node.vercel.app/create-fullOrder",
      {
        products: products,
      }
    );
    window.open(response.data, "_blank");
  } catch (error) {
    console.error("Error creating order:", error);
  }
}
