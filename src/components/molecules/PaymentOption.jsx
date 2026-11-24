// MOLÉCULA · PaymentOption = radio + logo + nombre + descripción
export const PaymentOption = ({ method, checked, onSelect }) => (
  <label className={`pay-option ${checked ? 'is-selected' : ''}`}>
    <input type="radio" name="metodoPago" value={method.id} checked={checked} onChange={() => onSelect(method.id)} className="form-check-input mt-0" />
    <img src={method.logo} alt="" height="26" className="pay-option__logo" />
    <span>
      <span className="d-block fw-semibold">{method.nombre}</span>
      <span className="small text-muted-f4a">{method.descripcion}</span>
    </span>
  </label>
);
