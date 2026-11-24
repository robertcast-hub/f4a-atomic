// PÁGINA · Inicio = StoreTemplate (vía rutas) + HeroBanner + CategoryGrid + 2 ProductGrid
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { Heading } from '../../components/atoms/Heading';
import { HeroBanner } from '../../components/organisms/HeroBanner';
import { CategoryGrid } from '../../components/organisms/CategoryGrid';
import { ProductGrid } from '../../components/organisms/ProductGrid';

const SLIDES = [
  { kicker: 'Reserva digital', titulo: 'GTA VI llega a Vice City', texto: 'Asegura tu clave hoy y recíbela el día del lanzamiento.', cta: 'Reservar ahora', to: '/producto/P003',
    imagenes: ['/imagenes/gta5.webp', '/imagenes/gta6.webp', '/imagenes/wow.webp'] },
  { kicker: 'Hasta 40% menos', titulo: 'Ofertas de la semana', texto: 'Juegos, licencias y suscripciones con precio rebajado.', cta: 'Ver ofertas', to: '/ofertas',
    imagenes: ['/imagenes/FFVIIR.webp', '/imagenes/bannerMarines.webp', '/imagenes/OIP.webp'] },
  { kicker: 'Activación inmediata', titulo: 'Licencias originales', texto: 'Windows, Office y Power BI con la clave en tu correo.', cta: 'Ver software', to: '/categorias/software',
    imagenes: ['/imagenes/OIP.webp', '/imagenes/excel.webp', '/imagenes/power.webp'] },
];

export const HomePage = () => {
  const [featured] = useState(() => productService.getFeatured());
  const [offers] = useState(() => productService.getOffers().slice(0, 4));
  const [categories] = useState(() => categoryService.getAll());

  return (
    <div className="container">
      <HeroBanner slides={SLIDES} />
      <section className="section">
        <Heading level={2} size={3}>Categorías</Heading>
        <CategoryGrid categories={categories} />
      </section>
      <section className="section">
        <div className="section__head">
          <Heading level={2} size={3}>En oferta</Heading>
          <Link to="/ofertas">Ver todas las ofertas</Link>
        </div>
        <ProductGrid products={offers} />
      </section>
      <section className="section">
        <Heading level={2} size={3}>Destacados</Heading>
        <ProductGrid products={featured} />
      </section>
    </div>
  );
};
