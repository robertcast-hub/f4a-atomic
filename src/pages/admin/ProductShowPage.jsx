// PÁGINA ADMIN · Ficha de producto = AdminPageTemplate + Image + lista de datos
import { Link, useParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { Image } from '../../components/atoms/Image';
import { PriceTag } from '../../components/molecules/PriceTag';
import { EmptyState } from '../../components/molecules/EmptyState';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const ProductShowPage = () => {
  const { id } = useParams();
  const p = productService.getById(id);
  if (!p) return <EmptyState title="Producto no encontrado" actionTo="/admin/productos" actionLabel="Volver" />;
  return (
    <AdminPageTemplate title={p.nombre} actions={<>
      <Link to={`/admin/productos/${p.id}/editar`} className="btn btn-sm btn-primary">Editar producto</Link>
      <Link to="/admin/productos" className="btn btn-sm btn-ghost">Volver</Link>
    </>}>
      <div className="panel row g-4 mx-0">
        <div className="col-md-4"><Image src={p.imagen} alt={p.nombre} className="img-fluid rounded" /></div>
        <dl className="col-md-8 row mb-0 data-list">
          <dt className="col-sm-4">Código</dt><dd className="col-sm-8">{p.id}</dd>
          <dt className="col-sm-4">Categoría</dt><dd className="col-sm-8">{categoryService.getById(p.categoria)?.nombre ?? p.categoria}</dd>
          <dt className="col-sm-4">Precio</dt><dd className="col-sm-8"><PriceTag precio={p.precio} precioOferta={p.precioOferta} /></dd>
          <dt className="col-sm-4">Stock</dt><dd className="col-sm-8">{p.stock} (crítico: {p.stockCritico})</dd>
          <dt className="col-sm-4">Destacado</dt><dd className="col-sm-8">{p.destacado ? 'Sí' : 'No'}</dd>
          <dt className="col-sm-4">Descripción</dt><dd className="col-sm-8">{p.descripcion}</dd>
        </dl>
      </div>
    </AdminPageTemplate>
  );
};
