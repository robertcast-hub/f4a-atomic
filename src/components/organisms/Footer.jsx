// ORGANISMO · Footer = Logo + columnas de enlaces + medios de pago
import { Link } from 'react-router-dom';
import { Logo } from '../atoms/Logo';
import { PAYMENT_METHODS } from '../../utils/payment';

export const Footer = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="row g-4">
        <div className="col-12 col-md-4">
          <Logo withText={false} height={40} />
          <p className="small mt-3 mb-0">Claves digitales de videojuegos, licencias, suscripciones y tarjetas de regalo con entrega inmediata.</p>
        </div>
        <div className="col-6 col-md-2">
          <h2 className="site-footer__title">Tienda</h2>
          <ul className="list-unstyled small">
            <li><Link to="/productos">Productos</Link></li>
            <li><Link to="/categorias">Categorías</Link></li>
            <li><Link to="/ofertas">Ofertas</Link></li>
            <li><Link to="/blogs">Blog</Link></li>
          </ul>
        </div>
        <div className="col-6 col-md-3">
          <h2 className="site-footer__title">Información</h2>
          <ul className="list-unstyled small">
            <li><Link to="/nosotros">Nosotros</Link></li>
            <li><Link to="/contacto">Contacto</Link></li>
            <li><Link to="/faqs">Preguntas frecuentes</Link></li>
            <li><Link to="/terminos">Términos y condiciones</Link></li>
            <li><Link to="/privacidad">Política de privacidad</Link></li>
            <li><Link to="/sistema-diseno">Sistema de diseño</Link></li>
          </ul>
        </div>
        <div className="col-12 col-md-3">
          <h2 className="site-footer__title">Medios de pago</h2>
          <div className="d-flex flex-wrap gap-2">
            {PAYMENT_METHODS.map((m) => <img key={m.id} src={m.logo} alt={m.nombre} height="26" className="site-footer__pay" />)}
          </div>
        </div>
      </div>
      <p className="site-footer__copy">© {new Date().getFullYear()} F4A Tienda Digital</p>
    </div>
  </footer>
);
