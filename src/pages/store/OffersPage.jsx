// PÁGINA · Ofertas = CatalogTemplate + ProductGrid
import { productService } from '../../data/dataService';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';
import { ProductGrid } from '../../components/organisms/ProductGrid';

export const OffersPage = () => (
  <CatalogTemplate title="Ofertas" subtitle="Productos con precio rebajado por tiempo limitado">
    <ProductGrid products={productService.getOffers()} emptyTitle="No hay ofertas activas" emptyText="Vuelve pronto." />
  </CatalogTemplate>
);
