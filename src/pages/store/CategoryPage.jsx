// PÁGINA · Categoría = CatalogTemplate + CategoryGrid compacto (arriba) + ProductGrid
import { useParams } from 'react-router-dom';
import { categoryService, productService } from '../../data/dataService';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';
import { CategoryGrid } from '../../components/organisms/CategoryGrid';
import { ProductGrid } from '../../components/organisms/ProductGrid';
import { EmptyState } from '../../components/molecules/EmptyState';

export const CategoryPage = () => {
  const { id } = useParams();
  const category = categoryService.getById(id);

  if (!category) {
    return <div className="container"><EmptyState title="Categoría no encontrada" actionTo="/categorias" actionLabel="Ver categorías" /></div>;
  }

  return (
    <CatalogTemplate
      top={<div className="category-strip"><CategoryGrid categories={categoryService.getAll()} /></div>}
      title={category.nombre}
      subtitle={category.descripcion}
    >
      <ProductGrid products={productService.getByCategory(id)} emptyTitle="Aún no hay productos en esta categoría" />
    </CatalogTemplate>
  );
};
