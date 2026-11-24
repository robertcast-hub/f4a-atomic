// TEMPLATE · CatalogTemplate = [barra superior] + título + [filtros] + contenido
// Estructura de las páginas de listado: productos, categorías, ofertas y blog.
import { PageTitle } from '../molecules/PageTitle';

export const CatalogTemplate = ({ title, subtitle, top, toolbar, children }) => (
  <div className="container">
    {top && <div className="mb-3">{top}</div>}
    <PageTitle title={title} subtitle={subtitle} />
    {toolbar && <div className="mb-4">{toolbar}</div>}
    {children}
  </div>
);
