// ÁTOMO · Icon
// Íconos SVG en línea (trazos de 24×24). Heredan el color del texto con currentColor.
import { PATHS } from './iconPaths';

export const Icon = ({ name, size = 20, title, className = '' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`.trim()}
    role={title ? 'img' : undefined}
    aria-hidden={title ? undefined : true}
    aria-label={title}
    focusable="false"
  >
    <path d={PATHS[name] ?? PATHS.alert} />
  </svg>
);
