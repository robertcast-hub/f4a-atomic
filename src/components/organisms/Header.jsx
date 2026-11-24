// ORGANISMO · Header = Logo + SearchBar + acciones de sesión + botón de carrito + navegación
// El menú móvil y el desplegable de categorías se controlan con estado de React.
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { categoryService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { Logo } from '../atoms/Logo';
import { Icon } from '../atoms/Icon';
import { SearchBar } from '../molecules/SearchBar';

const LINKS_ANTES = [{ to: '/', label: 'Inicio', end: true }, { to: '/productos', label: 'Productos' }];
const LINKS_DESPUES = [
  { to: '/ofertas', label: 'Ofertas' }, { to: '/nosotros', label: 'Nosotros' },
  { to: '/blogs', label: 'Blog' }, { to: '/contacto', label: 'Contacto' },
];

export const Header = () => {
  const { count, total } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [term, setTerm] = useState('');
  const categories = categoryService.getAll();

  const close = () => {
    setMenuOpen(false);
    setCatOpen(false);
  };

  const handleSearch = (value) => {
    const q = value.trim();
    navigate(q ? `/productos?q=${encodeURIComponent(q)}` : '/productos');
    setTerm('');
    close();
  };

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  const navItem = (l) => (
    <li key={l.to}><NavLink to={l.to} end={l.end} className="main-nav__link" onClick={close}>{l.label}</NavLink></li>
  );

  return (
    <header className="site-header">
      <div className="container site-header__top">
        <Logo onClick={close} />
        <div className="site-header__search"><SearchBar id="header-search" value={term} onChange={setTerm} onSubmit={handleSearch} /></div>
        <div className="site-header__actions">
          {user ? (
            <>
              {isAdmin && <Link to="/admin" className="btn btn-sm btn-ghost-light" onClick={close}>Panel</Link>}
              <span className="small d-none d-md-inline">Hola, {user.nombre}</span>
              <button type="button" className="btn btn-sm btn-ghost-light" onClick={handleLogout}>Salir</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-sm btn-ghost-light" onClick={close}>Iniciar sesión</Link>
              <Link to="/registro" className="btn btn-sm btn-light d-none d-sm-inline-flex" onClick={close}>Crear cuenta</Link>
            </>
          )}
          <Link to="/carrito" className="cart-button" onClick={close} aria-label={`Carrito ${formatCLP(total)}, ${count} productos`}>
            <Icon name="cart" />
            <span className="d-none d-sm-inline">Carrito {formatCLP(total)}</span>
            {count > 0 && <span className="cart-button__count" data-testid="cart-count">{count}</span>}
          </Link>
          <button type="button" className="menu-toggle d-lg-none" aria-controls="main-nav" aria-expanded={menuOpen}
            aria-label="Abrir menú" onClick={() => setMenuOpen((o) => !o)}>
            <Icon name={menuOpen ? 'close' : 'menu'} />
          </button>
        </div>
      </div>
      <nav className="main-nav" aria-label="Principal">
        <ul id="main-nav" className={`container main-nav__list ${menuOpen ? 'is-open' : ''}`}>
          {LINKS_ANTES.map(navItem)}
          <li className="main-nav__dropdown">
            <button type="button" className="main-nav__link" aria-expanded={catOpen} onClick={() => setCatOpen((o) => !o)}>
              Categorías <Icon name="chevron" size={16} />
            </button>
            {catOpen && (
              <ul className="main-nav__menu">
                <li><Link to="/categorias" onClick={close}>Todas las categorías</Link></li>
                {categories.map((c) => <li key={c.id}><Link to={`/categorias/${c.id}`} onClick={close}>{c.nombre}</Link></li>)}
              </ul>
            )}
          </li>
          {LINKS_DESPUES.map(navItem)}
        </ul>
      </nav>
    </header>
  );
};
