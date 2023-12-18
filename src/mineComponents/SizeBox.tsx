export function SizeBox({
  talle,
  stock,
}: {
  talle: string;
  stock: number;
}) {

  return (
    <label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-not-allowed bg-gray-50 text-gray-200">
      <input
        type="radio"
        name="size-choice"
        value={talle}
        disabled
        className="sr-only"
        aria-labelledby="size-choice-0-label"
      />
      <span id="size-choice-0-label">{talle}</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
      >
        {stock == 0 ? (
          <svg
          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          stroke="currentColor"
        >
          <line
            x1="0"
            y1="100"
            x2="100"
            y2="0"
            vectorEffect="non-scaling-stroke"
          />
          </svg>
        ) : null}
        
        
      </span>
    </label>
  );
}
<label className="group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6 cursor-pointer bg-white text-gray-900 shadow-sm">
                        <input
                          type="radio"
                          name="size-choice"
                          value="XS"
                          className="sr-only"
                          aria-labelledby="size-choice-1-label"
                        />
                        <span id="size-choice-1-label">XS</span>
                        <span
                          className="pointer-events-none absolute -inset-px rounded-md"
                          aria-hidden="true"
                        ></span>
                      </label>