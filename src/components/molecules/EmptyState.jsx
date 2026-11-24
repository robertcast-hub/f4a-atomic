// MOLÉCULA · EmptyState = Icon + Heading + texto + enlace de acción
import { Link } from 'react-router-dom';
import { Icon } from '../atoms/Icon';
import { Heading } from '../atoms/Heading';

export const EmptyState = ({ title, text, actionTo, actionLabel, icon = 'box' }) => (
  <div className="empty-state">
    <span className="empty-state__icon"><Icon name={icon} size={28} /></span>
    <Heading level={2} size={4}>{title}</Heading>
    {text && <p className="text-muted-f4a mb-3">{text}</p>}
    {actionTo && <Link to={actionTo} className="btn btn-primary">{actionLabel}</Link>}
  </div>
);
