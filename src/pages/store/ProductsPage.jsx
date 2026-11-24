// PÁGINA · Productos = CatalogTemplate + ProductFilters + ProductGrid
// El texto de búsqueda se sincroniza con ?q= en la URL.
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';
import { ProductFilters } from '../../components/organisms/ProductFilters';
import { ProductGrid } from '../../components/organisms/ProductGrid';

export const ProductsPage = () => {
  const [params, setParams] = useSearchParams();
  const [categoria, setCategoria] = useState('');
  const [orden, setOrden] = useState('');
  const query = params.get('q') ?? '';

  const products = useMemo(() => productService.search({ query, categoria, orden }), [query, categoria, orden]);

  const handleFilters = (next) => {
    setCategoria(next.categoria);
    setOrden(next.orden);
    setParams(next.query ? { q: next.query } : {}, { replace: true });
  };

  return (
    <CatalogTemplate
      title="Productos"
      subtitle="Todo el catálogo de F4A"
      toolbar={<ProductFilters filters={{ query, categoria, orden }} categories={categoryService.getAll()} onChange={handleFilters} resultCount={products.length} />}
    >
      <ProductGrid products={products} emptyTitle="No encontramos productos con esos filtros" emptyText="Prueba con otra palabra o quita el filtro de categoría." />
    </CatalogTemplate>
  );
};
