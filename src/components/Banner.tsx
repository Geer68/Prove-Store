import numeral from "numeral";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Banner() {
  const [close, setClose] = useState(false);
  const handdleClose = () => {
    setClose(true);
  };
  return (
    <div
      className={
        close
          ? "hidden"
          : `relative isolate flex items-center gap-x-6 overflow-hidden px-3 py-2.5 sm:px-3.5 sm:before:flex-1  bg-yellow-900`
      }
    >
      <div
        className="absolute left-[max(-7rem,calc(50%-52rem))] top-1/2 -z-10 -translate-y-1/2 transform-gpu "
        aria-hidden="true"
      ></div>

      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="text-sm font-normal leading-6 text-white">
          <strong className="font-semibold">Envios gratis</strong>
          <svg
            viewBox="0 0 2 2"
            className="mx-2 inline h-0.5 w-0.5 fill-current"
            aria-hidden="true"
          >
            <circle cx="1" cy="1" r="1" />
          </svg>
          A partir de {numeral(21000).format("$0,0")}
        </p>
        <Link
          to={"/products"}
          className="hidden sm:flex flex-none rounded-full bg-gray-900 px-3.5 py-1 text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900"
        >
          Comprá ahora<span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <button
          type="button"
          className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
          onClick={handdleClose}
        >
          <span className="sr-only">Dismiss</span>
          <svg
            className="h-5 w-5 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
