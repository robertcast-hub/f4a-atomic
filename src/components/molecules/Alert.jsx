// MOLÉCULA · Alert = Icon + mensaje + botón cerrar (opcional)
// Renderizado condicional: si no hay mensaje, no se dibuja nada.
import { Icon } from '../atoms/Icon';

const ICONS = { success: 'check', danger: 'alert', warning: 'alert', info: 'alert' };

export const Alert = ({ message, variant = 'info', onClose }) => {
  if (!message) return null;
  return (
    <div className={`alert alert-${variant} alert-f4a`} role="alert">
      <Icon name={ICONS[variant] ?? 'alert'} />
      <span className="flex-grow-1">{message}</span>
      {onClose && <button type="button" className="btn-close" aria-label="Cerrar mensaje" onClick={onClose} />}
    </div>
  );
};

export const ErrorMessage = ({ error, onClose }) => <Alert message={error} variant="danger" onClose={onClose} />;
