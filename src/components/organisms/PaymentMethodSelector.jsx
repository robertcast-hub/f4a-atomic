// ORGANISMO · PaymentMethodSelector = Heading + 5 PaymentOption + error condicional
import { Heading } from '../atoms/Heading';
import { PaymentOption } from '../molecules/PaymentOption';
import { PAYMENT_METHODS } from '../../utils/payment';

export const PaymentMethodSelector = ({ value, onChange, error }) => (
  <div className="mt-4">
    <Heading level={2} size={5}>Medio de pago</Heading>
    <div className="row row-cols-1 row-cols-md-2 g-2" role="radiogroup" aria-label="Medio de pago">
      {PAYMENT_METHODS.map((m) => (
        <div className="col" key={m.id}>
          <PaymentOption method={m} checked={value === m.id} onSelect={onChange} />
        </div>
      ))}
    </div>
    {error && <div className="text-danger small mt-2" role="alert">{error}</div>}
  </div>
);
