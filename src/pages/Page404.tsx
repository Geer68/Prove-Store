import { Link } from "react-router-dom";

export function Page404() {
  return (
    <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-lg font-semibold text-yellow-900">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Página no encontrada
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Lo siento, no encontramos la página que buscabas.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            to="/"
            className="rounded-md bg-yellow-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-800"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
}
