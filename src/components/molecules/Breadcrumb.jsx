// MOLÉCULA · Breadcrumb = lista de enlaces que indica dónde está el usuario
import { Link } from 'react-router-dom';

export const Breadcrumb = ({ items }) => (
  <nav aria-label="Ruta de navegación" className="breadcrumb-f4a">
    <ol>
      {items.map((item, i) => (
        <li key={item.label}>
          {item.to && i < items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}
        </li>
      ))}
    </ol>
  </nav>
);
