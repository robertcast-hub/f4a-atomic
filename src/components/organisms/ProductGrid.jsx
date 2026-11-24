// ORGANISMO · ProductGrid = lista de ProductCard (o EmptyState si no hay productos)
// Conecta cada tarjeta con el carrito global.
import { useCart } from '../../context/CartContext';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../molecules/EmptyState';

export const ProductGrid = ({ products, emptyTitle = 'No hay productos para mostrar', emptyText }) => {
  const { addToCart } = useCart();

  if (!products.length) {
    return <EmptyState title={emptyTitle} text={emptyText} actionTo="/productos" actionLabel="Ver todo el catálogo" icon="search" />;
  }

  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 row-cols-xl-4 g-3 g-md-4">
      {products.map((product) => (
        <div className="col" key={product.id}>
          <ProductCard product={product} onAdd={addToCart} />
        </div>
      ))}
    </div>
  );
};
