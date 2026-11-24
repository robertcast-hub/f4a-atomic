// TEMPLATE · ArticleTemplate = columna de lectura (máx. ~70 caracteres por línea)
// Para Nosotros, Preguntas frecuentes, textos legales y artículos del blog.
import { PageTitle } from '../molecules/PageTitle';

export const ArticleTemplate = ({ title, subtitle, top, children }) => (
  <article className="container article">
    {top}
    {title && <PageTitle title={title} subtitle={subtitle} />}
    <div className="article__body">{children}</div>
  </article>
);
