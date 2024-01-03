export function Input({
  text,
  name,
  searchFilter,
}: {
  text: string;
  name: string;
  searchFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="relative z-0 w-full mb-5 group">
      <input
        onChange={(e) => searchFilter(e)}
        type="text"
        id={name}
        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-yellow-900 focus:outline-none focus:ring-0 focus:border-yellow-950 peer"
        placeholder=" "
        required
      />
      <label
        htmlFor={name}
        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-yellow-950 peer-focus:dark:text-yellow-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {text}
      </label>
    </div>
  );
}
