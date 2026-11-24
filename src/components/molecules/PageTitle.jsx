// MOLÉCULA · PageTitle = Heading h1 + subtítulo + acciones (children)
import { Heading } from '../atoms/Heading';

export const PageTitle = ({ title, subtitle, children }) => (
  <header className="page-title">
    <div>
      <Heading level={1} size={2}>{title}</Heading>
      {subtitle && <p className="text-muted-f4a mb-0">{subtitle}</p>}
    </div>
    {children && <div className="page-title__actions">{children}</div>}
  </header>
);
