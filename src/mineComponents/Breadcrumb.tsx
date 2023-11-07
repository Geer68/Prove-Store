import { Link } from "react-router-dom";


export function Breadcrumb({ catagory, nombre }: { catagory: string, nombre: string | undefined }): JSX.Element {
  return (
    <section className="ml-9 mt-5">
      <Link to="/">Productos</Link>
      <span> {'>'} </span>
      <Link to="/articles">{catagory}</Link>
      <span> {'>'} </span>
      <span>{nombre || ''}</span> 
    </section>
  );
}
