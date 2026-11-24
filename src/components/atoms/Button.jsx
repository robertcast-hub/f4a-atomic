// ÁTOMO · Button
// Botón reutilizable. Recibe la etiqueta (label) y la función onClick por props.
// Variantes: primary (azul), accent (verde), ghost (borde), danger, link.
import { Icon } from './Icon';

export const Button = ({
  label,
  onClick,
  variant = 'primary',
  type = 'button',
  size,
  icon,
  disabled = false,
  block = false,
  className = '',
  ...rest
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={['btn', `btn-${variant}`, size && `btn-${size}`, block && 'w-100', className].filter(Boolean).join(' ')}
    {...rest}
  >
    {icon && <Icon name={icon} size={size === 'sm' ? 16 : 18} />}
    {label && <span>{label}</span>}
  </button>
);
