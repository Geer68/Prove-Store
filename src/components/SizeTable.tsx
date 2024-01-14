export function SizeTable() {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Talle
            </th>
            <th scope="col" className="px-6 py-3">
              Contorno de la cintura
            </th>
            <th scope="col" className="px-6 py-3">
              Contorno de la cadera
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              S
            </th>
            <td className="px-6 py-4">62 - 66 cm</td>
            <td className="px-6 py-4">88 - 92 cm</td>
          </tr>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              M
            </th>
            <td className="px-6 py-4">87 - 91 cm</td>
            <td className="px-6 py-4">92 - 96 cm</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              L
            </th>
            <td className="px-6 py-4">91 - 99 cm</td>
            <td className="px-6 py-4">96 - 104 cm</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              XL
            </th>
            <td className="px-6 py-4">99 - 107 cm</td>
            <td className="px-6 py-4">104 - 112 cm</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              XXL
            </th>
            <td className="px-6 py-4">107 - 115 cm</td>
            <td className="px-6 py-4">112 - 120 cm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
