// PÁGINA ADMIN · Reportes = AdminPageTemplate + 4 StatCard + BarChart
// Se usa para /admin/reportes y /admin/productos/reportes (este último con foco en inventario).
import { reportService, productService, categoryService } from '../../data/dataService';
import { formatCLP } from '../../utils/format';
import { Heading } from '../../components/atoms/Heading';
import { StatCard } from '../../components/molecules/StatCard';
import { BarChart } from '../../components/organisms/BarChart';
import { AdminPageTemplate } from '../../components/templates/AdminPageTemplate';

const Panel = ({ title, children }) => (
  <section className="panel h-100"><Heading level={2} size={6} className="mb-3">{title}</Heading>{children}</section>
);

export const ReportsPage = ({ inventory = false }) => {
  const r = reportService.summary();
  const stockPorCategoria = categoryService.getAll().map((c) => ({
    categoria: c.nombre,
    unidades: productService.getByCategory(c.id).reduce((acc, p) => acc + Number(p.stock), 0),
  }));

  return (
    <AdminPageTemplate title={inventory ? 'Reporte de productos' : 'Reportes'}>
      <div className="row g-3 mb-4">
        <div className="col-sm-6 col-lg-3"><StatCard label="Ingresos" value={formatCLP(r.ingresos)} icon="chart" tone="green" /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Órdenes" value={r.totalOrdenes} detail={`${r.ordenesPagadas} pagadas`} icon="receipt" /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Valor inventario" value={formatCLP(r.valorInventario)} icon="box" tone="ink" /></div>
        <div className="col-sm-6 col-lg-3"><StatCard label="Stock crítico" value={r.productosCriticos} icon="alert" tone="amber" /></div>
      </div>
      <div className="row g-4">
        {!inventory && (
          <>
            <div className="col-lg-6"><Panel title="Ventas por categoría"><BarChart data={reportService.salesByCategory()} labelKey="categoria" valueKey="total" format={formatCLP} /></Panel></div>
            <div className="col-lg-6"><Panel title="Productos más vendidos (unidades)"><BarChart data={reportService.topProducts()} labelKey="nombre" valueKey="cantidad" /></Panel></div>
          </>
        )}
        <div className="col-lg-6"><Panel title="Unidades en stock por categoría"><BarChart data={stockPorCategoria} labelKey="categoria" valueKey="unidades" /></Panel></div>
      </div>
    </AdminPageTemplate>
  );
};
