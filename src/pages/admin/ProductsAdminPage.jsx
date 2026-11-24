// PÁGINA ADMIN · Productos = AdminPageTemplate + Alert + DataTable con acciones
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService, precioFinal } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { Image } from '../../components/atoms/Image';
import { Button } from '../../components/atoms/Button';
import { Alert } from '../../components/molecules/Alert';
import { DataTable } from '../../components/organisms/DataTable';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const ProductsAdminPage = () => {
  const [products, setProducts] = useState(() => productService.getAll());
  const [mensaje, setMensaje] = useState('');
  const categorias = Object.fromEntries(categoryService.getAll().map((c) => [c.id, c.nombre]));

  const handleDelete = (product) => {
    if (!window.confirm(`¿Eliminar "${product.nombre}"? Esta acción no se puede deshacer.`)) return;
    productService.remove(product.id);
    setProducts(productService.getAll());
    setMensaje(`Producto "${product.nombre}" eliminado.`);
  };

  return (
    <AdminPageTemplate title="Productos" subtitle={`${products.length} productos en el catálogo`}
      actions={<>
        <Link to="/admin/productos/criticos" className="btn btn-sm btn-ghost">Stock crítico</Link>
        <Link to="/admin/productos/reportes" className="btn btn-sm btn-ghost">Reportes</Link>
        <Link to="/admin/productos/nuevo" className="btn btn-sm btn-primary">Nuevo producto</Link>
      </>}
      alerts={<Alert message={mensaje} variant="success" onClose={() => setMensaje('')} />}>
      <DataTable rows={products} columns={[
        { key: 'nombre', header: 'Producto', render: (p) => <span className="d-flex align-items-center gap-2"><Image src={p.imagen} alt="" className="thumb" />{p.nombre}</span> },
        { key: 'categoria', header: 'Categoría', render: (p) => categorias[p.categoria] ?? p.categoria },
        { key: 'precio', header: 'Precio', align: 'end', render: (p) => formatCLP(precioFinal(p)) },
        { key: 'stock', header: 'Stock', align: 'end', render: (p) => <span className={p.stock <= p.stockCritico ? 'text-warning-f4a fw-bold' : ''}>{p.stock}</span> },
        { key: 'acc', header: 'Acciones', align: 'end', render: (p) => (
          <span className="text-nowrap">
            <Link to={`/admin/productos/${p.id}`} className="btn btn-sm btn-ghost me-1">Ver</Link>
            <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-ghost me-1">Editar</Link>
            <Button variant="danger-ghost" size="sm" label="Eliminar" onClick={() => handleDelete(p)} />
          </span>
        ) },
      ]} />
    </AdminPageTemplate>
  );
};
