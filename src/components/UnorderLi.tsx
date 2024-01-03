export function UnorderList({ product }: { product: string | undefined }) {
  if (!product) {
    return null;
  }
  const liList = product.split(";\r\n").filter((li) => li.trim() !== "");
  return (
    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
      {liList.map((li) => (
        <li key={li}>
          <span className="text-gray-600">{li}</span>
        </li>
      ))}
    </ul>
  );
}
