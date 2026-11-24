// PÁGINA ADMIN · Dashboard = AdminPageTemplate + 4 StatCard + accesos
import { Link } from 'react-router-dom';
import { reportService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { Icon } from '../../components/atoms/Icon';
import { StatCard } from '../../components/molecules/StatCard';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

const ACCESOS = [
  { to: '/admin/ordenes', titulo: 'Órdenes', texto: 'Revisa las compras y sus boletas.', icon: 'receipt' },
  { to: '/admin/productos', titulo: 'Productos', texto: 'Agrega, edita o elimina productos.', icon: 'box' },
  { to: '/admin/categorias', titulo: 'Categorías', texto: 'Organiza el catálogo.', icon: 'tag' },
  { to: '/admin/usuarios', titulo: 'Usuarios', texto: 'Gestiona cuentas y roles.', icon: 'users' },
  { to: '/admin/reportes', titulo: 'Reportes', texto: 'Ventas por categoría y productos top.', icon: 'chart' },
  { to: '/admin/perfil', titulo: 'Perfil', texto: 'Tus datos de administrador.', icon: 'user' },
];

export const DashboardPage = () => {
  const r = reportService.summary();
  return (
    <AdminPageTemplate title="Dashboard" subtitle="Resumen de la actividad de la tienda">
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-xl-3"><StatCard label="Compras" value={r.ordenesPagadas} detail={`${r.ordenesRechazadas} rechazadas`} icon="cart" /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Ingresos" value={formatCLP(r.ingresos)} icon="chart" tone="green" /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Productos" value={r.totalProductos} detail={`${r.productosCriticos} con stock crítico`} icon="box" tone="amber" /></div>
        <div className="col-sm-6 col-xl-3"><StatCard label="Usuarios" value={r.totalUsuarios} icon="users" tone="ink" /></div>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        {ACCESOS.map((a) => (
          <div className="col" key={a.to}>
            <Link to={a.to} className="admin-tile">
              <Icon name={a.icon} />
              <span><span className="admin-tile__title">{a.titulo}</span><span className="admin-tile__text">{a.texto}</span></span>
            </Link>
          </div>
        ))}
      </div>
    </AdminPageTemplate>
  );
};
