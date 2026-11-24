// TEMPLATE · AdminPageTemplate = título + acciones + mensajes + contenido
// Estructura común de todas las páginas del panel administrativo.
import { PageTitle } from '../molecules/PageTitle';

export const AdminPageTemplate = ({ title, subtitle, actions, alerts, children }) => (
  <div className="admin-page">
    <PageTitle title={title} subtitle={subtitle}>{actions}</PageTitle>
    {alerts}
    {children}
  </div>
);
