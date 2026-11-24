// ORGANISMO · OrderItemsTable = tabla de ítems (con miniatura) + total
import { Image } from '../atoms/Image';
import { formatCLP } from '../../utils/format';

export const OrderItemsTable = ({ items, total }) => (
  <div className="table-responsive table-f4a">
    <table className="table align-middle mb-0">
      <thead>
        <tr>
          <th scope="col">Producto</th>
          <th scope="col" className="text-end">Precio</th>
          <th scope="col" className="text-center">Cantidad</th>
          <th scope="col" className="text-end">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td>
              <span className="d-flex align-items-center gap-2">
                {item.imagen && <Image src={item.imagen} alt="" className="thumb" />}
                {item.nombre}
              </span>
            </td>
            <td className="text-end">{formatCLP(item.precioUnitario)}</td>
            <td className="text-center">{item.cantidad}</td>
            <td className="text-end">{formatCLP(item.precioUnitario * item.cantidad)}</td>
          </tr>
        ))}
      </tbody>
      {total != null && (
        <tfoot>
          <tr>
            <th colSpan={3} className="text-end">Total</th>
            <th className="text-end" data-testid="order-total">{formatCLP(total)}</th>
          </tr>
        </tfoot>
      )}
    </table>
  </div>
);
