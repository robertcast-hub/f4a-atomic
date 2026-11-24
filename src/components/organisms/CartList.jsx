// ORGANISMO · CartList = una fila por producto (Image + nombre + QuantitySelector + subtotal + eliminar)
import { Image } from '../atoms/Image';
import { Button } from '../atoms/Button';
import { QuantitySelector } from '../molecules/QuantitySelector';
import { precioFinal } from '../../data/dataService';
import { formatCLP } from '../../utils/format';

export const CartList = ({ items, onQuantityChange, onRemove }) => (
  <ul className="cart-list">
    {items.map((item) => (
      <li key={item.id} className="cart-row">
        <Image src={item.imagen} alt="" className="cart-row__img" />
        <div className="cart-row__info">
          <p className="fw-semibold mb-1">{item.nombre}</p>
          <span className="small text-muted-f4a">{formatCLP(precioFinal(item))} c/u</span>
        </div>
        <QuantitySelector value={item.quantity} min={0} max={Number(item.stock) || 99}
          label={`Cantidad de ${item.nombre}`} onChange={(q) => onQuantityChange(item.id, q)} />
        <span className="cart-row__subtotal">{formatCLP(precioFinal(item) * item.quantity)}</span>
        <Button variant="danger-ghost" size="sm" icon="trash" label="Eliminar" onClick={() => onRemove(item.id)} />
      </li>
    ))}
  </ul>
);
