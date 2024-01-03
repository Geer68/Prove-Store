import { getIpClient } from "../../logic/configs";
import { IpInfo } from "../../logic/types";
import { createContext, useState } from "react";

export const IpContext = createContext({
  ip: {
    city: "", //Departamento
    postal: "", //CP
    region: "", //Provincia
    region_code: "", //AR
    country_name: "", //Argentina
  },
  setNewIP: () => {},
});

export function IpProvider({ children }: { children: JSX.Element }) {
  const [ip, setIp] = useState<IpInfo>({
    ip: "",
    city: "", //Departamento
    postal: "", //CP
    region: "", //Provincia
    region_code: "", //AR
    country_name: "", //Argentina
  });

  const setNewIP = () => {
    getIpClient().then((ip) => {
      console.log(ip);
      setIp(ip);
    });
  };

  return (
    <IpContext.Provider value={{ ip, setNewIP }}>{children}</IpContext.Provider>
  );
}
