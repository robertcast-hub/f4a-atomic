// TEMPLATE · FocusTemplate = panel centrado de ancho acotado
// Para tareas que piden concentración: login, registro, checkout y resultado de compra.
export const FocusTemplate = ({ width = 'md', tone, children }) => (
  <div className={`container focus focus--${width}`}>
    <div className={`focus__panel ${tone ? `focus__panel--${tone}` : ''}`}>{children}</div>
  </div>
);
