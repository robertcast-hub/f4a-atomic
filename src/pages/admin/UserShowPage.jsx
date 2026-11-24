// PÁGINA ADMIN · Ficha de usuario = AdminPageTemplate + datos + DataTable (historial de compras)
import { Link, useParams } from 'react-router-dom';
import { userService, orderService } from '../../data/dataService';
import { formatCLP, formatDate } from '../../utils/format';
import { Badge } from '../../components/atoms/Badge';
import { Heading } from '../../components/atoms/Heading';
import { EmptyState } from '../../components/molecules/EmptyState';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const UserShowPage = () => {
  const { id } = useParams();
  const u = userService.getById(id);
  if (!u) return <EmptyState title="Usuario no encontrado" actionTo="/admin/usuarios" actionLabel="Volver" />;

  return (
    <AdminPageTemplate title={`${u.nombre} ${u.apellidos}`} subtitle={u.email} actions={<>
      <Link to={`/admin/usuarios/${u.id}/editar`} className="btn btn-sm btn-primary">Editar usuario</Link>
      <Link to="/admin/usuarios" className="btn btn-sm btn-ghost">Volver</Link>
    </>}>
      <div className="panel mb-4">
        <dl className="row mb-0 data-list">
          <dt className="col-sm-3">RUN</dt><dd className="col-sm-9">{u.run}</dd>
          <dt className="col-sm-3">Rol</dt><dd className="col-sm-9">{u.rol}</dd>
          <dt className="col-sm-3">Dirección</dt><dd className="col-sm-9">{[u.direccion, u.comuna, u.region].filter(Boolean).join(', ') || 'Sin dirección'}</dd>
        </dl>
      </div>
      <Heading level={2} size={5}>Historial de compras</Heading>
      <DataTable rows={orderService.getByUser(u.id)} emptyText="Este usuario aún no tiene compras." columns={[
        { key: 'id', header: 'Orden' },
        { key: 'fecha', header: 'Fecha', render: (o) => formatDate(o.fecha) },
        { key: 'estado', header: 'Estado', render: (o) => <Badge tone={o.estado === 'pagada' ? 'success' : 'danger'}>{o.estado}</Badge> },
        { key: 'total', header: 'Total', align: 'end', render: (o) => formatCLP(o.total) },
        { key: 'acc', header: '', align: 'end', render: (o) => <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-ghost">Ver boleta</Link> },
      ]} />
    </AdminPageTemplate>
  );
};
