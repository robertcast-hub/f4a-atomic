// MOLÉCULA · PriceTag = Price (final) + Price tachado + Badge de descuento
import { Price } from '../atoms/Price';
import { Badge } from '../atoms/Badge';
import { discountPercent } from '../../utils/format';

export const PriceTag = ({ precio, precioOferta, size = 'md' }) => {
  const descuento = discountPercent(precio, precioOferta);
  if (!descuento) return <Price value={precio} size={size} />;
  return (
    <span className="price-tag">
      <Price value={precioOferta} size={size} />
      <Price value={precio} struck />
      <Badge tone="danger">-{descuento}%</Badge>
    </span>
  );
};
