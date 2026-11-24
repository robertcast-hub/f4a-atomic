// MOLÉCULA · StatCard = Icon + etiqueta + valor + detalle
import { Icon } from '../atoms/Icon';

export const StatCard = ({ label, value, detail, icon = 'chart', tone = 'blue' }) => (
  <div className={`stat-card stat-card--${tone}`}>
    <span className="stat-card__icon"><Icon name={icon} /></span>
    <div>
      <p className="stat-card__label">{label}</p>
      <p className="stat-card__value" data-testid={`stat-${label}`}>{value}</p>
      {detail && <p className="stat-card__detail">{detail}</p>}
    </div>
  </div>
);
