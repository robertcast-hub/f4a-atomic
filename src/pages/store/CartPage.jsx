// PÁGINA · Carrito = CatalogTemplate + CartList + CartSummary (o EmptyState)
import { useCart } from '../../context/CartContext';
import { CatalogTemplate } from '../../components/templates/CatalogTemplate';
import { CartList } from '../../components/organisms/CartList';
import { CartSummary } from '../../components/organisms/CartSummary';
import { EmptyState } from '../../components/molecules/EmptyState';
import { Button } from '../../components/atoms/Button';

export const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, total, count } = useCart();

  if (!cart.length) {
    return (
      <div className="container">
        <EmptyState icon="cart" title="Tu carrito está vacío" text="Agrega juegos, licencias o suscripciones para comprarlos." actionTo="/productos" actionLabel="Ir al catálogo" />
      </div>
    );
  }

  return (
    <CatalogTemplate title="Carrito de compras">
      <div className="row g-4">
        <div className="col-lg-8">
          <CartList items={cart} onQuantityChange={updateQuantity} onRemove={removeFromCart} />
          <Button variant="ghost" size="sm" icon="trash" label="Vaciar carrito" onClick={clearCart} className="mt-3" />
        </div>
        <div className="col-lg-4"><CartSummary total={total} count={count} /></div>
      </div>
    </CatalogTemplate>
  );
};
