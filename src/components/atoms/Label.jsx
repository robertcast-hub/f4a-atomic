// ÁTOMO · Label
// Etiqueta de formulario. `required` agrega el asterisco rojo.
export const Label = ({ htmlFor, children, required = false, className = 'form-label' }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
    {required && <span className="text-danger ms-1" aria-hidden="true">*</span>}
  </label>
);
