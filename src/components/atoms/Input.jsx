// ÁTOMO · Input
// Campo de texto con el estilo de Bootstrap. `invalid` lo marca en rojo.
export const Input = ({ invalid = false, className = '', ...rest }) => (
  <input className={`form-control ${invalid ? 'is-invalid' : ''} ${className}`.trim()} aria-invalid={invalid} {...rest} />
);
