// ORGANISMO · AdminSidebar = Logo + menú de 7 secciones + botones Ver tienda / Cerrar sesión
// En móvil el menú se despliega con estado local.
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '../atoms/Icon';

const ADMIN_ITEMS = [
  { to: '/admin', label: 'Dashboard', icon: 'home', end: true },
  { to: '/admin/ordenes', label: 'Órdenes', icon: 'receipt' },
  { to: '/admin/productos', label: 'Productos', icon: 'box' },
  { to: '/admin/categorias', label: 'Categorías', icon: 'tag' },
  { to: '/admin/usuarios', label: 'Usuarios', icon: 'users' },
  { to: '/admin/reportes', label: 'Reportes', icon: 'chart' },
  { to: '/admin/perfil', label: 'Perfil', icon: 'user' },
];

export const AdminSidebar = ({ onLogout }) => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__head">
        <Link to="/admin" className="logo" onClick={close}>
          <img src="/imagenes/logo.webp" alt="F4A" height="30" />
          <span className="logo__text">Administración</span>
        </Link>
        <button type="button" className="btn btn-sm btn-ghost-light d-lg-none" aria-expanded={open}
          aria-controls="admin-menu" onClick={() => setOpen((o) => !o)}>
          {open ? 'Cerrar' : 'Menú'}
        </button>
      </div>
      <nav id="admin-menu" className={`admin-sidebar__nav ${open ? 'is-open' : ''}`} aria-label="Administración">
        <ul>
          {ADMIN_ITEMS.map((i) => (
            <li key={i.to}>
              <NavLink to={i.to} end={i.end} onClick={close}><Icon name={i.icon} size={18} />{i.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="admin-sidebar__actions">
          <Link to="/" className="btn btn-sm btn-ghost-light"><Icon name="store" size={16} /> Ver tienda</Link>
          <button type="button" className="btn btn-sm btn-danger" onClick={onLogout}><Icon name="logout" size={16} /> Cerrar sesión</button>
        </div>
      </nav>
    </aside>
  );
};
