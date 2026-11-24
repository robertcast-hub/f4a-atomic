// ÁTOMO · Price
// Muestra un monto en pesos chilenos. `struck` lo tacha (precio anterior).
import { formatCLP } from '../../utils/format';

export const Price = ({ value, struck = false, size = 'md', className = '' }) =>
  struck ? (
    <del className={`price price--old ${className}`.trim()}>{formatCLP(value)}</del>
  ) : (
    <span className={`price price--${size} ${className}`.trim()}>{formatCLP(value)}</span>
  );
