// PÁGINA · Términos / Privacidad = ArticleTemplate + texto
import { ArticleTemplate } from '../../components/templates/ArticleTemplate';

export const LegalPage = ({ title }) => (
  <ArticleTemplate title={title}>
    <p>Este documento describe las condiciones de uso de F4A Tienda Digital. Al comprar en el sitio aceptas que los productos son digitales y se entregan por correo electrónico.</p>
    <p>Para dudas sobre este documento escribe a soporte@f4a.cl.</p>
  </ArticleTemplate>
);
