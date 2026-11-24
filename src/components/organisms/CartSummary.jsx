// ORGANISMO · CartSummary = resumen con total + botón para ir al checkout
import { Link } from 'react-router-dom';
import { Heading } from '../atoms/Heading';
import { formatCLP } from '../../utils/format';

export const CartSummary = ({ total, count }) => (
  <aside className="summary-box">
    <Heading level={2} size={5}>Resumen</Heading>
    <div className="summary-box__row"><span>Productos</span><span>{count}</span></div>
    <div className="summary-box__row"><span>Entrega</span><span>Digital, sin costo</span></div>
    <div className="summary-box__total"><span>Total</span><span data-testid="cart-total">{formatCLP(total)}</span></div>
    <Link to="/checkout" className="btn btn-primary w-100">Comprar ahora</Link>
  </aside>
);
