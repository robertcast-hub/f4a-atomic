// PÁGINA · Categorías = CatalogTemplate + CategoryGrid
import { categoryService } from '../../data/dataService';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';
import { CategoryGrid } from '../../components/organisms/CategoryGrid';

export const CategoriesPage = () => (
  <CatalogTemplate title="Categorías" subtitle="Elige qué tipo de producto buscas">
    <CategoryGrid categories={categoryService.getAll()} columns="row-cols-1 row-cols-sm-2 row-cols-lg-3" />
  </CatalogTemplate>
);
