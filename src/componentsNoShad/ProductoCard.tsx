import { Link } from 'react-router-dom';
import { Articulos } from '../../api/env';

export function ProductoCard({ articles, until }: { articles: Articulos[], until: number }): JSX.Element {

  const articlesToShow = articles.slice(0, until);
    return (
      <section className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-6'>
        {articlesToShow.map((article) => (
          <Link to={`/product/${article.url}`} key={article.id}>
            <article key={article.id} className='pb-3'>
              <img src={article.img} alt={article.nombre} className=' min-w-[100px]' />
              <section className=' grid gap-1 product-info p-2 pl-0'>
                <p className='font-light text-md'>{article.nombre}</p>
                <p className='text-sm font-medium mb-2'>${article.precio}</p>
              </section>
            </article>
          </Link>
        ))}
      </section>
    );
}
