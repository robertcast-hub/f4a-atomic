// PÁGINA · Contacto = CatalogTemplate + datos de atención + formulario (3 FormField + Button)
import { useState } from 'react';
import { isRequired, isValidEmail, hasErrors } from '../../utils/validators';
import { Button } from '../../components/atoms/Button';
import { Icon } from '../../components/atoms/Icon';
import { FormField } from '../../components/molecules/FormField';
import { Alert } from '../../components/molecules/Alert';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';

const initial = { nombre: '', email: '', mensaje: '' };

export const ContactPage = () => {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = {};
    if (!isRequired(form.nombre)) found.nombre = 'Ingresa tu nombre.';
    if (!isValidEmail(form.email)) found.email = 'Ingresa un correo válido.';
    if (String(form.mensaje).trim().length < 10) found.mensaje = 'El mensaje debe tener al menos 10 caracteres.';
    setErrors(found);
    if (hasErrors(found)) return;
    setEnviado(true);
    setForm(initial);
  };

  return (
    <CatalogTemplate title="Contacto" subtitle="Respondemos en menos de 24 horas">
      <div className="row g-4">
        <div className="col-md-5">
          <ul className="contact-list">
            <li><Icon name="receipt" /> soporte@f4a.cl</li>
            <li><Icon name="user" /> +56 9 1234 5678 (WhatsApp)</li>
            <li><Icon name="check" /> Lunes a domingo, todo el día</li>
          </ul>
        </div>
        <div className="col-md-7">
          <div className="panel">
            <Alert message={enviado ? 'Mensaje enviado. Te responderemos pronto.' : ''} variant="success" onClose={() => setEnviado(false)} />
            <form noValidate onSubmit={handleSubmit} className="row g-3">
              <FormField label="Nombre" name="nombre" value={form.nombre} error={errors.nombre} onChange={handleChange} required />
              <FormField label="Correo" name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} required />
              <FormField label="Mensaje" name="mensaje" as="textarea" value={form.mensaje} error={errors.mensaje} onChange={handleChange} required />
              <div className="col-12"><Button type="submit" label="Enviar mensaje" /></div>
            </form>
          </div>
        </div>
      </div>
    </CatalogTemplate>
  );
};
