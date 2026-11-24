// MOLÉCULA · BlogCard = Image + fecha + Heading + resumen + enlace
import { Link } from 'react-router-dom';
import { Image } from '../atoms/Image';
import { Heading } from '../atoms/Heading';
import { formatDate } from '../../utils/format';

export const BlogCard = ({ blog }) => (
  <article className="blog-card">
    <Image src={blog.imagen} alt="" className="blog-card__img" />
    <div className="blog-card__body">
      <p className="small text-muted-f4a mb-1">{formatDate(blog.fecha)} · {blog.autor}</p>
      <Heading level={2} size={4}>{blog.titulo}</Heading>
      <p>{blog.resumen}</p>
      <Link to={`/blogs/${blog.id}`} className="btn btn-ghost btn-sm">Leer artículo</Link>
    </div>
  </article>
);
