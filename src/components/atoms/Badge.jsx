// ÁTOMO · Badge
// Etiqueta pequeña de estado. Tonos: neutral, success, danger, warning, info, brand.
export const Badge = ({ children, tone = 'neutral', className = '' }) => (
  <span className={`badge-f4a badge-f4a--${tone} ${className}`.trim()}>{children}</span>
);
