import { Articulos } from '../../api/env';
import { Link } from './Link';

export function ProductoCard({ articles }: { articles: Articulos[] }): JSX.Element {
    return (
      <section className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 p-10'>
        {articles.map((article) => (
          <Link to={`/product/${article.url}`} key={article.id}>
            <article key={article.id} className='pb-3 border-2 rounded-lg border-gray-100'>
              <img src={article.img} alt={article.nombre} className='rounded-t-lg min-w-[100px]' />
              <section className='product-info p-3'>
                <p className='font-medium'>{article.nombre}</p>
                <p className='text-sm text-gray-400 font-medium mb-2'>${article.precio}</p>
              </section>
            </article>
          </Link>
        ))}
      </section>
    );
}
