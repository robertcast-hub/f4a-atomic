// PÁGINA ADMIN · Boleta = AdminPageTemplate + OrderReceipt
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { Button } from '../../components/atoms/Button';
import { EmptyState } from '../../components/molecules/EmptyState';
import { OrderReceipt } from '../../components/organisms/OrderReceipt';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const OrderDetailPage = () => {
  const { id } = useParams();
  const order = orderService.getById(id);
  if (!order) return <EmptyState title="Orden no encontrada" actionTo="/admin/ordenes" actionLabel="Volver a órdenes" />;
  return (
    <AdminPageTemplate title={`Boleta ${order.id}`} actions={<>
      <Button variant="ghost" size="sm" icon="receipt" label="Imprimir" className="no-print" onClick={() => window.print()} />
      <Link to="/admin/ordenes" className="btn btn-sm btn-ghost no-print">Volver</Link>
    </>}>
      <div className="panel"><OrderReceipt order={order} /></div>
    </AdminPageTemplate>
  );
};
