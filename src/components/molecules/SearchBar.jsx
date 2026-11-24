// MOLÉCULA · SearchBar = Input + Button
// Componente controlado: el texto y el envío los maneja el padre.
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';

export const SearchBar = ({ value, onChange, onSubmit, id = 'search', placeholder = 'Buscar juegos, licencias, suscripciones' }) => (
  <form className="search-bar" role="search" onSubmit={(e) => { e.preventDefault(); onSubmit?.(value); }}>
    <label htmlFor={id} className="visually-hidden">Buscar productos</label>
    <Input id={id} type="search" value={value} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
    <Button type="submit" icon="search" label="Buscar" variant="accent" />
  </form>
);
