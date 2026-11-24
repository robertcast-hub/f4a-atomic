// TEMPLATE · StoreTemplate = Header + zona de contenido (Outlet) + Footer
// Define la estructura de todas las páginas de la tienda, sin contenido propio.
import { Outlet } from 'react-router-dom';
import { Header } from '../organisms/Header';
import { Footer } from '../organisms/Footer';

export const StoreTemplate = () => (
  <div className="store-shell">
    <a href="#contenido" className="skip-link">Saltar al contenido</a>
    <Header />
    <main id="contenido" className="store-shell__main">
      <Outlet />
    </main>
    <Footer />
  </div>
);
