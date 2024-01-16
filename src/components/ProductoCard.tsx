import { Link } from "react-router-dom";
import { Articulos } from "../../logic/types";
import numeral from "numeral";

export function ProductoCard({
  articles,
  until,
}: {
  articles: Articulos[] | null;
  until: number;
}) {
  if (articles == null) {
    return null;
  }
  const articlesToShow = articles.slice(0, until);
  return (
    <div className="grid mt-6 p-4 grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {articlesToShow.map((product) => (
        <Link key={product.id} to={`/product/${product.url}`} className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={product.img}
              alt={product.nombre}
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{product.nombre}</h3>
          <p className="mt-1 text-lg font-medium text-gray-900">
            {numeral(product.precio).format("$0,0")}
          </p>
        </Link>
      ))}
    </div>
  );
}
