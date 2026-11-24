// ORGANISMO · OrderReceipt = datos de la orden + medio de pago + CustomerForm (lectura) + OrderItemsTable
import { Badge } from '../atoms/Badge';
import { Heading } from '../atoms/Heading';
import { CustomerForm } from './CustomerForm';
import { OrderItemsTable } from './OrderItemsTable';
import { formatDate } from '../../utils/format';
import { describePayment } from '../../utils/payment';

export const OrderReceipt = ({ order }) => (
  <div className="receipt">
    <dl className="receipt__meta">
      <div><dt>Código de orden</dt><dd>{order.id}</dd></div>
      <div><dt>Fecha</dt><dd>{formatDate(order.fecha)}</dd></div>
      <div><dt>Estado</dt><dd>
        <Badge tone={order.estado === 'pagada' ? 'success' : 'danger'}>{order.estado === 'pagada' ? 'Pagada' : 'Rechazada'}</Badge>
      </dd></div>
    </dl>
    <p className="small mb-3" data-testid="payment-info">
      Medio de pago: <strong>{describePayment(order.pago)}</strong>
      {order.pago?.motivo && <> · Motivo del rechazo: <strong className="text-danger">{order.pago.motivo}</strong></>}
    </p>
    <CustomerForm data={order.cliente} onChange={() => {}} readOnly />
    <Heading level={2} size={5} className="mt-4">Detalle de la compra</Heading>
    <OrderItemsTable items={order.items} total={order.total} />
  </div>
);
