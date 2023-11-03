import {NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import proveLogo from "../imgs/PROVElogoN.png";
import cart from "../imgs/cart.svg";


export function NavigationBar() {
  return (

    <nav className="justify-between flex sticky top-0 bg-white z-10 items-center  border-b border-gray mt-1 ">
      <button className="md:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round" className="ml-7 mr-7">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M4 6l16 0"></path>
          <path d="M4 12l16 0"></path>
          <path d="M4 18l16 0"></path>
        </svg>
      </button>
      <div className="flex">
        <Link to="/"><img src={proveLogo} alt="" className="h-7 m-3 ml-7" /></Link>
        <NavigationMenu className="hidden md:flex">
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
                      >
                        Buzos
                      </Link>
                      <Link to="/articulos/remeras"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted items-center no-underline outline-none focus:shadow-md p-2"
                      >
                        Remeras
                      </Link>
                      <Link to="/articulos/shorts"
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted items-center no-underline outline-none focus:shadow-md p-2"
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
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <Link to="/cart">
        <img src={cart} className="w-7 ml-7 mr-10" alt="" />
      </Link>
    </nav>
  );
}
