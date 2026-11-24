// PÁGINA ADMIN · Categorías = AdminPageTemplate + Alert + DataTable
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categoryService } from '../../data/dataService';
import { Button } from '../../components/atoms/Button';
import { Alert, ErrorMessage } from '../../components/molecules/Alert';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const CategoriesAdminPage = () => {
  const [list, setList] = useState(() => categoryService.getAll());
  const [ok, setOk] = useState('');
  const [error, setError] = useState('');

  const handleDelete = (c) => {
    setError('');
    if (categoryService.countProducts(c.id) > 0) {
      setError(`No puedes eliminar "${c.nombre}" porque tiene productos asociados.`);
      return;
    }
    if (!window.confirm(`¿Eliminar la categoría "${c.nombre}"?`)) return;
    categoryService.remove(c.id);
    setList(categoryService.getAll());
    setOk(`Categoría "${c.nombre}" eliminada.`);
  };

  return (
    <AdminPageTemplate title="Categorías" actions={<Link to="/admin/categorias/nueva" className="btn btn-sm btn-primary">Nueva categoría</Link>}
      alerts={<><ErrorMessage error={error} onClose={() => setError('')} /><Alert message={ok} variant="success" onClose={() => setOk('')} /></>}>
      <DataTable rows={list} columns={[
        { key: 'id', header: 'Código' },
        { key: 'nombre', header: 'Nombre' },
        { key: 'descripcion', header: 'Descripción', render: (c) => <span className="small">{c.descripcion}</span> },
        { key: 'n', header: 'Productos', align: 'end', render: (c) => categoryService.countProducts(c.id) },
        { key: 'acc', header: 'Acciones', align: 'end', render: (c) => (
          <span className="text-nowrap">
            <Link to={`/admin/categorias/${c.id}/editar`} className="btn btn-sm btn-ghost me-1">Editar</Link>
            <Button variant="danger-ghost" size="sm" label="Eliminar" onClick={() => handleDelete(c)} />
          </span>
        ) },
      ]} />
    </AdminPageTemplate>
  );
};
