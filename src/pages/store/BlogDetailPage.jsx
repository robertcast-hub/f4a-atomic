// PÁGINA · Artículo del blog = ArticleTemplate + Breadcrumb + Image + párrafos
import { useParams } from 'react-router-dom';
import { blogService } from '../../data/dataService';
import { formatDate } from '../../utils/format';
import { Image } from '../../components/atoms/Image';
import { Breadcrumb } from '../../components/molecules/Breadcrumb';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ArticleTemplate } from '../../components/templates/ArticleTemplate';

export const BlogDetailPage = () => {
  const { id } = useParams();
  const blog = blogService.getById(id);
  if (!blog) return <div className="container"><EmptyState title="Artículo no encontrado" actionTo="/blogs" actionLabel="Ver el blog" /></div>;

  return (
    <ArticleTemplate top={<Breadcrumb items={[{ label: 'Blog', to: '/blogs' }, { label: blog.titulo }]} />}
      title={blog.titulo} subtitle={`${formatDate(blog.fecha)} · ${blog.autor}`}>
      <Image src={blog.imagen} alt="" className="article__img" />
      {blog.contenido.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
    </ArticleTemplate>
  );
};
