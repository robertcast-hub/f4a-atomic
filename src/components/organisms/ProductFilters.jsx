// ORGANISMO · ProductFilters = 3 campos (Input + 2 Select) + contador de resultados
// Componente controlado: el estado de los filtros vive en la página.
import { Input } from '../atoms/Input';
import { Select } from '../atoms/Select';
import { Label } from '../atoms/Label';

const ORDEN = [
  { value: 'precio-asc', label: 'Menor precio' },
  { value: 'precio-desc', label: 'Mayor precio' },
  { value: 'nombre', label: 'Nombre A-Z' },
];

export const ProductFilters = ({ filters, categories, onChange, resultCount }) => {
  const handle = (e) => onChange({ ...filters, [e.target.name]: e.target.value });

  return (
    <form className="filters row g-2 align-items-end" role="search" onSubmit={(e) => e.preventDefault()}>
      <div className="col-12 col-md-5">
        <Label htmlFor="filtro-query" className="form-label small">Buscar</Label>
        <Input id="filtro-query" name="query" type="search" placeholder="Nombre o descripción" value={filters.query} onChange={handle} />
      </div>
      <div className="col-6 col-md-3">
        <Label htmlFor="filtro-categoria" className="form-label small">Categoría</Label>
        <Select id="filtro-categoria" name="categoria" value={filters.categoria} onChange={handle}
          placeholder="Todas" options={categories.map((c) => ({ value: c.id, label: c.nombre }))} />
      </div>
      <div className="col-6 col-md-2">
        <Label htmlFor="filtro-orden" className="form-label small">Ordenar</Label>
        <Select id="filtro-orden" name="orden" value={filters.orden} onChange={handle} placeholder="Relevancia" options={ORDEN} />
      </div>
      <div className="col-12 col-md-2 text-md-end small text-muted-f4a" aria-live="polite">
        {resultCount} {resultCount === 1 ? 'resultado' : 'resultados'}
      </div>
    </form>
  );
};
