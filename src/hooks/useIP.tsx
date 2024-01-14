import { useContext } from "react";
import { IpContext } from "@/contexts/ip";

export function useIP() {
  const { ip, setNewIP } = useContext(IpContext);
  return { ip, setNewIP };
}
