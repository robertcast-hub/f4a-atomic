// PÁGINA · Blog = CatalogTemplate + lista de BlogCard
import { blogService } from '../../data/dataService';
import { BlogCard } from '../../components/molecules/BlogCard';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';

export const BlogsPage = () => (
  <CatalogTemplate title="Blog" subtitle="Noticias y guías de la tienda">
    <div className="row g-4">
      {blogService.getAll().map((b) => <div className="col-md-6" key={b.id}><BlogCard blog={b} /></div>)}
    </div>
  </CatalogTemplate>
);
