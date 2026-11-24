// ORGANISMO · ProductCard = Image + Badge + Heading + texto + PriceTag + Button
// Forma de "tarjeta de clave digital": muescas laterales y línea perforada.
// Responsabilidad única: mostrar un producto y avisar con onAdd. No conoce el carrito.
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Image } from '../atoms/Image';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { PriceTag } from '../molecules/PriceTag';

export const ProductCard = ({ product, onAdd }) => {
  const [added, setAdded] = useState(false);
  const agotado = Number(product.stock) <= 0;
  const enOferta = product.precioOferta != null && product.precioOferta < product.precio;

  // El mensaje "Agregado" vuelve al estado inicial; el temporizador se limpia al desmontar
  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1800);
    return () => clearTimeout(timer);
  }, [added]);

  const handleAdd = () => {
    onAdd?.(product);
    setAdded(true);
  };

  return (
    <article className="key-card" data-testid="product-card">
      <Link to={`/producto/${product.id}`} className="key-card__media" tabIndex={-1} aria-hidden="true">
        <Image src={product.imagen} alt="" />
        {enOferta && <Badge tone="danger" className="key-card__tag">Oferta</Badge>}
      </Link>
      <div className="key-card__body">
        <h3 className="key-card__title">
          <Link to={`/producto/${product.id}`}>{product.nombre}</Link>
        </h3>
        <p className="key-card__desc">{product.descripcion || 'Sin descripción disponible.'}</p>
        <div className="key-card__foot">
          <PriceTag precio={product.precio} precioOferta={product.precioOferta} />
          {agotado ? (
            <p className="text-danger small fw-semibold mt-2 mb-0">Sin stock</p>
          ) : (
            <Button
              label={added ? 'Agregado al carrito' : 'Agregar al carrito'}
              icon={added ? 'check' : 'cart'}
              variant={added ? 'accent' : 'primary'}
              block
              className="mt-2"
              onClick={handleAdd}
            />
          )}
        </div>
      </div>
    </article>
  );
};
