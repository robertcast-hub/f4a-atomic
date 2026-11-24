// PÁGINA · Preguntas frecuentes = ArticleTemplate + FaqAccordion
import { ArticleTemplate } from '../../components/templates/ArticleTemplate';
import { FaqAccordion } from '../../components/organisms/FaqAccordion';

const FAQS = [
  { q: '¿Cómo recibo mi producto?', a: 'La clave llega a tu correo apenas se confirma el pago.' },
  { q: '¿Qué medios de pago aceptan?', a: 'Webpay Plus, Visa, Mastercard, PayPal y Mercado Pago.' },
  { q: '¿Qué pasa si una clave no funciona?', a: 'Escríbenos con el código de orden y la reemplazamos o te devolvemos el dinero.' },
];

export const FaqPage = () => (
  <ArticleTemplate title="Preguntas frecuentes"><FaqAccordion items={FAQS} /></ArticleTemplate>
);
