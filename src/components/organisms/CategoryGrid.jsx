// ORGANISMO · CategoryGrid = lista de CategoryCard
import { CategoryCard } from '../molecules/CategoryCard';
import { categoryService } from '../../data/dataService';

export const CategoryGrid = ({ categories, columns = 'row-cols-2 row-cols-md-3 row-cols-lg-5' }) => (
  <div className={`row ${columns} g-3`}>
    {categories.map((c) => (
      <div className="col" key={c.id}><CategoryCard category={c} count={categoryService.countProducts(c.id)} /></div>
    ))}
  </div>
);
