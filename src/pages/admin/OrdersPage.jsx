// PÁGINA ADMIN · Órdenes = AdminPageTemplate + Select (filtro) + DataTable
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { formatCLP, formatDate } from '../../utils/format';
import { getPaymentMethod } from '../../utils/payment';
import { Badge } from '../../components/atoms/Badge';
import { Select } from '../../components/atoms/Select';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const OrdersPage = () => {
  const [estado, setEstado] = useState('');
  const orders = orderService.getAll().filter((o) => !estado || o.estado === estado).sort((a, b) => b.fecha.localeCompare(a.fecha));

  return (
    <AdminPageTemplate title="Órdenes y boletas"
      actions={<Select aria-label="Filtrar por estado" value={estado} onChange={(e) => setEstado(e.target.value)} placeholder="Todos los estados"
        options={[{ value: 'pagada', label: 'Pagadas' }, { value: 'rechazada', label: 'Rechazadas' }]} className="form-select-sm" />}>
      <DataTable rows={orders} emptyText="No hay órdenes con ese estado." columns={[
        { key: 'id', header: 'Código', render: (o) => <span className="text-nowrap">{o.id}</span> },
        { key: 'fecha', header: 'Fecha', render: (o) => formatDate(o.fecha) },
        { key: 'cliente', header: 'Cliente', render: (o) => `${o.cliente.nombre} ${o.cliente.apellidos}` },
        { key: 'pago', header: 'Medio de pago', render: (o) => getPaymentMethod(o.pago?.metodo)?.nombre ?? '—' },
        { key: 'estado', header: 'Estado', render: (o) => <Badge tone={o.estado === 'pagada' ? 'success' : 'danger'}>{o.estado}</Badge> },
        { key: 'total', header: 'Total', align: 'end', render: (o) => formatCLP(o.total) },
        { key: 'acc', header: '', align: 'end', render: (o) => <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-ghost">Ver boleta</Link> },
      ]} />
    </AdminPageTemplate>
  );
};
