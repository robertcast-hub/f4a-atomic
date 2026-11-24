// ÁTOMO · Logo
import { Link } from 'react-router-dom';

export const Logo = ({ to = '/', height = 34, withText = true, onClick }) => (
  <Link to={to} className="logo" onClick={onClick} aria-label="F4A Tienda Digital, ir al inicio">
    <img src="/imagenes/logo.webp" alt="" height={height} />
    {withText && <span className="logo__text">Tienda Digital</span>}
  </Link>
);
