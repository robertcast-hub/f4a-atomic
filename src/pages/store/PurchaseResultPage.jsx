// PÁGINA · Resultado de compra = FocusTemplate + OrderReceipt. `success` decide el contenido.
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { orderService } from '../../data/dataService';
import { Heading } from '../../components/atoms/Heading';
import { Icon } from '../../components/atoms/Icon';
import { Button } from '../../components/atoms/Button';
import { Alert } from '../../components/molecules/Alert';
import { EmptyState } from '../../components/molecules/EmptyState';
import { FocusTemplate } from '../../components/templates/FocusTemplate';
import { OrderReceipt } from '../../components/organisms/OrderReceipt';

export const PurchaseResultPage = ({ success }) => {
  const { orderId } = useParams();
  const order = orderService.getById(orderId);
  const [aviso, setAviso] = useState('');

  if (!order) return <div className="container"><EmptyState title="No encontramos la orden" actionTo="/" actionLabel="Volver al inicio" /></div>;

  return (
    <FocusTemplate width="lg" tone={success ? 'ok' : 'error'}>
      <div className="result-head">
        <span className={`result-head__icon ${success ? 'is-ok' : 'is-error'}`}><Icon name={success ? 'check' : 'alert'} size={26} /></span>
        <Heading level={1} size={3} className="mb-0">
          {success ? `Se ha realizado la compra n.º ${order.id}` : `No se pudo realizar el pago n.º ${order.id}`}
        </Heading>
      </div>
      {success ? (
        <p>Enviamos las claves y la boleta a <strong>{order.cliente.email}</strong>.</p>
      ) : (
        <>
          <p>
            {order.pago?.motivo ?? 'El medio de pago rechazó la transacción.'}. Tu carrito sigue guardado,
            así que puedes intentarlo de nuevo con el mismo u otro medio de pago.
          </p>
          <Link to="/checkout" state={{ cliente: order.cliente }} className="btn btn-primary mb-3">Volver a realizar el pago</Link>
        </>
      )}
      <OrderReceipt order={order} />
      {success && (
        <div className="d-flex flex-wrap gap-2 justify-content-center mt-4 no-print">
          <Button variant="danger" icon="receipt" label="Imprimir boleta en PDF" onClick={() => window.print()} />
          <Button variant="accent" label="Enviar boleta por email" onClick={() => setAviso(`Boleta enviada a ${order.cliente.email}.`)} />
        </div>
      )}
      <div className="mt-3"><Alert message={aviso} variant="success" onClose={() => setAviso('')} /></div>
    </FocusTemplate>
  );
};
