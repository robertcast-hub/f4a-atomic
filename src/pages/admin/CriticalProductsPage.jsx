// PÁGINA ADMIN · Stock crítico = AdminPageTemplate + DataTable (o EmptyState)
import { Link } from 'react-router-dom';
import { productService } from '../../data/dataService';
import { EmptyState } from '../../components/molecules/EmptyState';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const CriticalProductsPage = () => {
  const list = productService.getCritical();
  return (
    <AdminPageTemplate title="Productos con stock crítico" subtitle="Stock igual o menor al mínimo definido">
      {!list.length ? <EmptyState icon="check" title="Todo el inventario está sobre el mínimo" /> : (
        <DataTable rows={list} columns={[
          { key: 'nombre', header: 'Producto' },
          { key: 'stock', header: 'Stock', align: 'end', render: (p) => <span className="text-warning-f4a fw-bold">{p.stock}</span> },
          { key: 'stockCritico', header: 'Mínimo', align: 'end' },
          { key: 'acc', header: '', align: 'end', render: (p) => <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-ghost">Reponer</Link> },
        ]} />
      )}
    </AdminPageTemplate>
  );
};
