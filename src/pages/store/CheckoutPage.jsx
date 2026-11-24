// PÁGINA · Checkout = FocusTemplate + OrderItemsTable + (CustomerForm + PaymentMethodSelector | PaymentGateway)
// Dos pasos controlados con el estado `step`:
//  1. 'datos': cliente, dirección y medio de pago (si hay sesión o viene de un rechazo, se completan solos).
//  2. 'pago' : pasarela simulada. Su resultado decide si la orden queda pagada o rechazada.
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService, precioFinal } from '../../data/dataService';
import { validateCustomer, hasErrors } from '../../utils/validators';
import { formatCLP } from '../../utils/format';
import { Heading } from '../../components/atoms/Heading';
import { Badge } from '../../components/atoms/Badge';
import { Button } from '../../components/atoms/Button';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ErrorMessage } from '../../components/molecules/Alert';
import { FocusTemplate } from '../../components/templates/FocusTemplate';
import { OrderItemsTable } from '../../components/organisms/OrderItemsTable';
import { CustomerForm } from '../../components/organisms/CustomerForm';
import { PaymentMethodSelector } from '../../components/organisms/PaymentMethodSelector';
import { PaymentGateway } from '../../components/organisms/PaymentGateway';

const emptyCustomer = { nombre: '', apellidos: '', email: '', calle: '', departamento: '', region: '', comuna: '', indicaciones: '' };

export const CheckoutPage = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [cliente, setCliente] = useState(() =>
    location.state?.cliente
      ? { ...emptyCustomer, ...location.state.cliente }
      : user
        ? { ...emptyCustomer, nombre: user.nombre, apellidos: user.apellidos, email: user.email,
            calle: user.direccion ?? '', region: user.region ?? '', comuna: user.comuna ?? '' }
        : emptyCustomer,
  );
  const [errors, setErrors] = useState({});
  const [metodo, setMetodo] = useState('');
  const [step, setStep] = useState('datos');

  if (!cart.length) {
    return <div className="container"><EmptyState icon="cart" title="No hay productos para pagar" actionTo="/productos" actionLabel="Ir al catálogo" /></div>;
  }

  const items = cart.map((p) => ({ id: p.id, nombre: p.nombre, imagen: p.imagen, precioUnitario: precioFinal(p), cantidad: p.quantity }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validateCustomer(cliente);
    if (!metodo) found.metodo = 'Selecciona un medio de pago.';
    setErrors(found);
    if (hasErrors(found)) return;
    setStep('pago');
  };

  const handlePaymentResult = (pago) => {
    const order = orderService.checkout({ cliente, cart, usuarioId: user?.id ?? null, pago });
    if (order.estado === 'pagada') {
      clearCart();
      navigate(`/compra/exito/${order.id}`);
    } else {
      navigate(`/compra/error/${order.id}`);
    }
  };

  return (
    <FocusTemplate width="lg">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-2 mb-3">
        <div>
          <Heading level={1} size={3} className="mb-1">Finalizar compra</Heading>
          <p className="small text-muted-f4a mb-0">Paso {step === 'datos' ? '1 de 2: tus datos y el medio de pago' : '2 de 2: pago'}</p>
        </div>
        <Badge tone="brand" className="fs-6">Total a pagar: {formatCLP(total)}</Badge>
      </div>
      <OrderItemsTable items={items} />
      {step === 'pago' ? (
        <div className="mt-4">
          <PaymentGateway methodId={metodo} total={total} email={cliente.email} onResult={handlePaymentResult} onCancel={() => setStep('datos')} />
        </div>
      ) : (
        <form noValidate onSubmit={handleSubmit} className="mt-4">
          <ErrorMessage error={hasErrors(errors) ? 'Revisa los campos marcados en rojo.' : ''} />
          <CustomerForm data={cliente} errors={errors} onChange={setCliente} />
          <PaymentMethodSelector value={metodo} onChange={setMetodo} error={errors.metodo} />
          <div className="text-end mt-4">
            <Button type="submit" size="lg" icon="card" label={`Pagar ahora ${formatCLP(total)}`} />
          </div>
        </form>
      )}
    </FocusTemplate>
  );
};
