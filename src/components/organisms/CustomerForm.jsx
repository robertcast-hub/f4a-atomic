// ORGANISMO · CustomerForm = 9 FormField (datos del cliente + dirección)
// Se reutiliza en el checkout (editable) y en la boleta (solo lectura).
import { FormField } from '../molecules/FormField';
import { Heading } from '../atoms/Heading';
import { regionService } from '../../data/dataService';

export const CustomerForm = ({ data, errors = {}, onChange, readOnly = false }) => {
  const regiones = regionService.getAll().map((r) => r.nombre);
  const comunas = regionService.getComunas(data.region);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Al cambiar de región se limpia la comuna, porque pertenece a otra región
    if (name === 'region') onChange({ ...data, region: value, comuna: '' });
    else onChange({ ...data, [name]: value });
  };

  const field = (name) => ({ name, value: data[name], error: errors[name], onChange: handleChange, readOnly });

  return (
    <div className="row g-3">
      <div className="col-12"><Heading level={2} size={5}>Información del cliente</Heading></div>
      <FormField label="Nombre" required className="col-md-6" {...field('nombre')} autoComplete="given-name" />
      <FormField label="Apellidos" required className="col-md-6" {...field('apellidos')} autoComplete="family-name" />
      <FormField label="Correo" type="email" required className="col-md-6" {...field('email')} autoComplete="email"
        hint={readOnly ? undefined : 'Aquí te enviaremos las claves y la boleta.'} />
      <div className="col-12 mt-4"><Heading level={2} size={5}>Dirección de entrega</Heading></div>
      <FormField label="Calle y número" required className="col-md-8" {...field('calle')} autoComplete="street-address" />
      <FormField label="Departamento (opcional)" className="col-md-4" placeholder={readOnly ? '' : 'Ej: 603'} {...field('departamento')} />
      <FormField label="Región" as="select" options={regiones} required className="col-md-6" {...field('region')} />
      <FormField label="Comuna" as="select" options={comunas} required className="col-md-6" {...field('comuna')} />
      <FormField label="Indicaciones para la entrega (opcional)" as="textarea" {...field('indicaciones')}
        placeholder={readOnly ? '' : 'Entre calles, color del edificio, no tiene timbre'} />
    </div>
  );
};
