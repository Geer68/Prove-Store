import {
  NavigationMenu,
  NavigationMenuContent,
  // NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import proveLogo from "../imgs/PROVElogoN.png";
import { Link } from "./Link";
import cart from "../imgs/cart.svg";


export function NavigationMenuNoShad() {
  return (
    <nav className=" justify-between sticky top-0 bg-white z-10 sm:flex items-center p-2 border-b border-gray mb-2 mt-2">
      <div className="flex">
      <img src={proveLogo} alt="" className="w-10 h-7 m-3 ml-7" />
      <NavigationMenu>
        <NavigationMenuList>
        <Link className={navigationMenuTriggerStyle()} to="/">Inicio</Link>
          
          <NavigationMenuItem>
            <NavigationMenuTrigger>Productos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid p-3 md:w-[600px] lg:w-[auto] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <div className="flex gap-2">
                  <Link to="/articulos/buzos"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted items-center no-underline outline-none focus:shadow-md p-2"
                      href="/articulos/buzos"
                    >
                      Buzos
                    </Link>
                    <Link to="/articulos/remeras"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted items-center no-underline outline-none focus:shadow-md p-2"
                      href="/articulos/remeras"
                    >
                      Remeras
                    </Link>
                    <Link to="/articulos/shorts"
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted items-center no-underline outline-none focus:shadow-md p-2"
                      href="/articulos/shorts"
                    >
                      Shorts
                    </Link>
                  </div>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
              <Link className={navigationMenuTriggerStyle()} to="/articles/basic-colection">Basic Colection</Link>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Spring Soon
            </NavigationMenuLink>
            {/* <NavigationMenuContent>
              {/* Agrega aquí tu contenido si es necesario */}
            {/* </NavigationMenuContent> */} 
          </NavigationMenuItem>
          {/* <NavigationMenuItem> */}
            {/* Agrega aquí tu contenido si es necesario */}
          {/* </NavigationMenuItem> */}
        </NavigationMenuList>
      </NavigationMenu>
      </div>
      <Link to="/cart">
        <img src={cart} className="w-7 ml-7 mr-10" alt="" />
        </Link>
    </nav>
  );
}
