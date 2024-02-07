import React, { useEffect, useState, useContext } from "react";
import proveLogo from "../imgs/PROVElogoN.png";
import eWW from "../imgs/enzoWW.jpg";
import { Link } from "react-router-dom";
import { CartContext } from "@/contexts/cart";
import { Disclosure } from "@headlessui/react";
import {
  Bars3Icon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function NavigationBar() {
  const [cantCart, setCantidad] = useState(0);
  const cartContext = useContext(CartContext);
  if (cartContext === null) {
    throw new Error("Error al obtener el contexto del carrito");
  }
  const { cart, showCantidad, deleteFromCart } = cartContext;

  const navigation = [
    { name: "World-Wide", to: "WorldWide", current: false },
    { name: "Basic-Collection", to: "Pr<3ve", current: false },
    { name: "SHOP NOW", to: "all", current: false },
  ];

  useEffect(() => {
    setCantidad(showCantidad());
  }, [cart, showCantidad, deleteFromCart]);

  return (
    <Disclosure as="nav" className="bg-white sticky top-0 z-10">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/">
                    <img src={proveLogo} alt="" className="h-7 m-3" />{" "}
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block items-center justify-center">
                  <div className="flex space-x-4 items-center justify-center h-full">
                    <NavigationMenu>
                      <NavigationMenuList>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>
                            World-Wide
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <img
                                    src={eWW}
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline brightness-90 outline-none focus:shadow-md aspect-square object-cover"
                                    alt=""
                                  />
                                </NavigationMenuLink>
                              </li>
                              <ListItem
                                to="/products/WorldWide/Remeras"
                                title="Remeras"
                              >
                                Remeras Oversize
                              </ListItem>
                              <ListItem
                                to="/products/WorldWide/Shorts"
                                title="Shorts"
                              >
                                Confort y estilo
                              </ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <NavigationMenuTrigger>
                            Basic-Collection
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                              <li className="row-span-3">
                                <NavigationMenuLink asChild>
                                  <img
                                    src="https://provestoree.com/wp-content/uploads/2023/05/Buzo-Prove-negro.jpg"
                                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted no-underline brightness-90 outline-none focus:shadow-md aspect-square object-cover"
                                    alt=""
                                  />
                                </NavigationMenuLink>
                              </li>
                              <ListItem
                                to="/products/all/Remeras"
                                title="Remeras"
                              >
                                La escencia de la elegancia
                              </ListItem>
                              <ListItem
                                to="/products/all/Shorts"
                                title="Shorts"
                              >
                                Comodidad y estilo
                              </ListItem>
                              <ListItem to="/products/all/Buzos" title="Buzos">
                                Minimalista y distintivo
                              </ListItem>
                            </ul>
                          </NavigationMenuContent>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                          <Link
                            to="/products/all"
                            className={navigationMenuTriggerStyle()}
                          >
                            SHOP NOW
                          </Link>
                        </NavigationMenuItem>
                      </NavigationMenuList>
                    </NavigationMenu>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link to={"/cart"} className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="ml-2 text-sm font-medium text-gray-900 group-hover:text-gray-800">
                    {cantCart}
                  </span>
                  <span className="sr-only">items in cart, view bag</span>
                </Link>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-5 pt-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={`products/${item.to}`}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-900 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";
