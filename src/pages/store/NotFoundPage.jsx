// PÁGINA · 404 = EmptyState
import { EmptyState } from '../../components/molecules/EmptyState';

export const NotFoundPage = () => (
  <div className="container"><EmptyState icon="search" title="Página no encontrada" text="La dirección no existe o cambió." actionTo="/" actionLabel="Ir al inicio" /></div>
);
