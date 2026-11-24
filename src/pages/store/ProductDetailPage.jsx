// PÁGINA · Detalle de producto = Breadcrumb + Image + PriceTag + QuantitySelector + Button + ProductGrid
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { productService, categoryService } from '../../data/dataService';
import { useCart } from '../../context/CartContext';
import { Image } from '../../components/atoms/Image';
import { Heading } from '../../components/atoms/Heading';
import { Button } from '../../components/atoms/Button';
import { Badge } from '../../components/atoms/Badge';
import { PriceTag } from '../../components/molecules/PriceTag';
import { QuantitySelector } from '../../components/molecules/QuantitySelector';
import { Breadcrumb } from '../../components/molecules/Breadcrumb';
import { Alert } from '../../components/molecules/Alert';
import { EmptyState } from '../../components/molecules/EmptyState';
import { ProductGrid } from '../../components/organisms/ProductGrid';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const product = productService.getById(id);

  if (!product) {
    return <div className="container"><EmptyState title="Producto no encontrado" text="Puede que se haya eliminado del catálogo." actionTo="/productos" actionLabel="Ver productos" /></div>;
  }

  const categoria = categoryService.getById(product.categoria);
  const relacionados = productService.getByCategory(product.categoria).filter((p) => p.id !== product.id).slice(0, 4);
  const agotado = Number(product.stock) <= 0;

  const handleAdd = () => {
    addToCart(product, cantidad);
    setMensaje(`Agregaste ${cantidad} × ${product.nombre} al carrito.`);
  };

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Productos', to: '/productos' }, ...(categoria ? [{ label: categoria.nombre, to: `/categorias/${categoria.id}` }] : []), { label: product.nombre }]} />
      <div className="detail">
        <Image src={product.imagen} alt={product.nombre} className="detail__img" />
        <div className="detail__info">
          {categoria && <Badge tone="brand">{categoria.nombre}</Badge>}
          <Heading level={1} size={2} className="mt-2">{product.nombre}</Heading>
          <p className="text-muted-f4a">{product.descripcion}</p>
          <PriceTag precio={product.precio} precioOferta={product.precioOferta} size="lg" />
          <p className="small mt-2">
            {agotado ? <span className="text-danger">Sin stock</span> : `${product.stock} unidades disponibles · entrega digital inmediata`}
          </p>
          {!agotado && (
            <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
              <QuantitySelector value={cantidad} onChange={setCantidad} max={Number(product.stock)} />
              <Button label="Agregar al carrito" icon="cart" onClick={handleAdd} />
            </div>
          )}
          <div className="mt-3"><Alert message={mensaje} variant="success" onClose={() => setMensaje('')} /></div>
        </div>
      </div>
      {relacionados.length > 0 && (
        <section className="section">
          <Heading level={2} size={3}>También te puede interesar</Heading>
          <ProductGrid products={relacionados} />
        </section>
      )}
    </div>
  );
};
