// ÁTOMO · Spinner
// Indicador de carga. `decorative` lo oculta de lectores de pantalla cuando el texto de al lado ya explica la espera.
export const Spinner = ({ label = 'Cargando', decorative = false }) =>
  decorative
    ? <span className="spinner-border spinner-f4a" aria-hidden="true" />
    : <span className="spinner-border spinner-f4a" role="status" aria-label={label} />;
