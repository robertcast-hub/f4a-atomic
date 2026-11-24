// PÁGINA ADMIN · Nuevo / Editar producto = AdminPageTemplate + ProductForm
import { useNavigate, useParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ProductForm } from '../../components/organisms/ProductForm';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

export const ProductFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);
  const product = isEdit ? productService.getById(id) : undefined;
  if (isEdit && !product) return <EmptyState title="Producto no encontrado" actionTo="/admin/productos" actionLabel="Volver" />;

  const handleSubmit = (data) => {
    const saved = isEdit ? productService.update(id, data) : productService.create(data);
    navigate(`/admin/productos/${saved.id}`);
  };

  return (
    <AdminPageTemplate title={isEdit ? 'Editar producto' : 'Nuevo producto'}>
      <div className="panel">
        <ProductForm initialValues={product} categories={categoryService.getAll()} onSubmit={handleSubmit}
          onCancel={() => navigate('/admin/productos')} submitLabel={isEdit ? 'Guardar cambios' : 'Crear producto'} />
      </div>
    </AdminPageTemplate>
  );
};
