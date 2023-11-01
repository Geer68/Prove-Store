import { useEffect, useState, ComponentType } from "react";
import { EVENTS } from "../../api/configs";
import { match } from "path-to-regexp";
import { Page404 } from "@/pages/Page404";

interface Route {
  path: string;
  Component: ComponentType<{ routeParams: Record<string, string> }>;
}

interface RouterProps {
  routes: Route[];
  defaultComponent?: ComponentType<{ routeParams: Record<string, string> }>;
}

export function Router({ routes = [], defaultComponent: DefaultComponent = Page404 }: RouterProps) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener(EVENTS.pushtate, onLocationChange);
    window.addEventListener("popstate", onLocationChange);
    return () => {
      window.removeEventListener(EVENTS.pushtate, onLocationChange);
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  let routeParams = {};

  const Page = routes.find(({ path }) => {
    if (path === currentPath) return true;
    const matcherUrl = match(path, { decode: decodeURIComponent });
    const matched = matcherUrl(currentPath);
    if (!matched) return false;
    routeParams = matched.params;
    return true;
  })?.Component;

  return Page ? <Page routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />;
}
