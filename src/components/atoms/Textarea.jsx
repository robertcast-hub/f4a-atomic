// ÁTOMO · Textarea
export const Textarea = ({ invalid = false, rows = 3, className = '', ...rest }) => (
  <textarea rows={rows} className={`form-control ${invalid ? 'is-invalid' : ''} ${className}`.trim()} aria-invalid={invalid} {...rest} />
);
