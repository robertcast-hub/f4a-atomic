// ÁTOMO · Select
// Lista desplegable. `options` acepta textos o { value, label }. `placeholder` agrega la opción vacía.
export const Select = ({ options = [], placeholder, invalid = false, className = '', ...rest }) => (
  <select className={`form-select ${invalid ? 'is-invalid' : ''} ${className}`.trim()} aria-invalid={invalid} {...rest}>
    {placeholder !== undefined && <option value="">{placeholder}</option>}
    {options.map((opt) => {
      const value = typeof opt === 'string' ? opt : opt.value;
      const label = typeof opt === 'string' ? opt : opt.label;
      return <option key={value} value={value}>{label}</option>;
    })}
  </select>
);
