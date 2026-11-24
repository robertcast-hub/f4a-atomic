// MOLÉCULA · CategoryCard = Image + Heading + contador de productos
import { Link } from 'react-router-dom';
import { Image } from '../atoms/Image';

export const CategoryCard = ({ category, count }) => (
  <Link to={`/categorias/${category.id}`} className="category-card">
    <Image src={category.imagen} alt="" className="category-card__img" />
    <span className="category-card__body">
      <span className="category-card__name">{category.nombre}</span>
      <span className="category-card__count">{count} {count === 1 ? 'producto' : 'productos'}</span>
    </span>
  </Link>
);
