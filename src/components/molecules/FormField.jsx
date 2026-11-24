// MOLÉCULA · FormField = Label + (Input | Select | Textarea) + mensaje de ayuda o de error
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Textarea } from '../atoms/Textarea';

export const FormField = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  as = 'input',
  options = [],
  required = false,
  readOnly = false,
  placeholder,
  className = 'col-12',
  hint,
  ...rest
}) => {
  const id = `field-${name}`;
  const describedBy = error ? `${id}-error` : hint ? `${id}-hint` : undefined;
  const common = {
    id,
    name,
    value: value ?? '',
    onChange,
    readOnly,
    placeholder,
    invalid: Boolean(error),
    'aria-describedby': describedBy,
    ...rest,
  };

  return (
    <div className={className}>
      <Label htmlFor={id} required={required}>{label}</Label>
      {as === 'select' && <Select {...common} options={options} placeholder="Selecciona…" disabled={readOnly} />}
      {as === 'textarea' && <Textarea {...common} />}
      {as === 'input' && <Input type={type} {...common} />}
      {hint && !error && <div id={`${id}-hint`} className="form-text">{hint}</div>}
      {error && <div id={`${id}-error`} className="invalid-feedback">{error}</div>}
    </div>
  );
};
