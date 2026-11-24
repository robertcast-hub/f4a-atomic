// MOLÉCULA · QuantitySelector = botón − + valor + botón +
import { Icon } from '../atoms/Icon';

export const QuantitySelector = ({ value, onChange, min = 1, max = 99, label = 'Cantidad' }) => (
  <div className="qty" role="group" aria-label={label}>
    <button type="button" aria-label="Disminuir cantidad" disabled={value <= min} onClick={() => onChange(value - 1)}>
      <Icon name="minus" size={16} />
    </button>
    <span data-testid="quantity-value" aria-live="polite">{value}</span>
    <button type="button" aria-label="Aumentar cantidad" disabled={value >= max} onClick={() => onChange(value + 1)}>
      <Icon name="plus" size={16} />
    </button>
  </div>
);
