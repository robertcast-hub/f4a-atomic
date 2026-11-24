// PÁGINA · Nosotros = ArticleTemplate + texto
import { Heading } from '../../components/atoms/Heading';
import { ArticleTemplate } from '../../components/templates/ArticleTemplate';

export const AboutPage = () => (
  <ArticleTemplate title="Nosotros">
    <p className="lead">
      F4A Tienda Digital vende claves de videojuegos, licencias de software, suscripciones y tarjetas de regalo,
      con entrega inmediata en tu correo.
    </p>
    <Heading level={2} size={4}>Misión</Heading>
    <p>Ofrecer productos digitales originales al mejor precio, con una compra simple y segura.</p>
    <Heading level={2} size={4}>Visión</Heading>
    <p>Ser la tienda digital de referencia en Chile para jugadores y profesionales.</p>
  </ArticleTemplate>
);
