// PÁGINA · Sistema de diseño
// Catálogo vivo de la metodología Atomic Design: muestra cada nivel con los componentes reales
// que usa la tienda, de lo más simple (átomos) a lo más complejo (páginas).
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { productService, categoryService, reportService } from '../../data/dataService';
import { PAYMENT_METHODS } from '../../utils/payment';
import { formatCLP } from '../../utils/format';
import { Badge, Button, Heading, Icon, ICON_NAMES, Input, Label, Price, Select, Spinner } from '../../components/atoms';
import { Alert, CategoryCard, EmptyState, FormField, PaymentOption, PriceTag, QuantitySelector, SearchBar, StatCard } from '../../components/molecules';
import { BarChart, DataTable, ProductCard } from '../../components/organisms';
import { PageTitle } from '../../components/molecules/PageTitle';

const LEVELS = [
  { id: 'atomos', n: 1, nombre: 'Átomos', texto: 'Las piezas mínimas. No se pueden dividir sin perder su función.' },
  { id: 'moleculas', n: 2, nombre: 'Moléculas', texto: 'Grupos pequeños de átomos que cumplen una sola tarea.' },
  { id: 'organismos', n: 3, nombre: 'Organismos', texto: 'Secciones completas de la interfaz hechas de moléculas y átomos.' },
  { id: 'templates', n: 4, nombre: 'Templates', texto: 'El esqueleto de cada tipo de página, con huecos para el contenido.' },
  { id: 'paginas', n: 5, nombre: 'Páginas', texto: 'Templates llenos con datos reales: lo que ve el usuario.' },
];

const Specimen = ({ name, children }) => (
  <figure className="specimen">
    <div className="specimen__stage">{children}</div>
    <figcaption><code>{name}</code></figcaption>
  </figure>
);

const LevelHeader = ({ level }) => (
  <header className="ds-level__head">
    <span className="ds-level__n" aria-hidden="true">{level.n}</span>
    <div>
      <Heading level={2} size={3} className="mb-1">{level.nombre}</Heading>
      <p className="text-muted-f4a mb-0">{level.texto}</p>
    </div>
  </header>
);

const TEMPLATES = [
  ['StoreTemplate', 'Header + contenido + Footer', 'Todas las páginas de la tienda'],
  ['AdminTemplate', 'AdminSidebar + barra superior + contenido', 'Todas las páginas del panel'],
  ['CatalogTemplate', 'Título + filtros + listado', 'Productos, Categorías, Ofertas, Blog, Carrito, Contacto'],
  ['FocusTemplate', 'Panel centrado de ancho acotado', 'Login, Registro, Checkout, Resultado de compra'],
  ['ArticleTemplate', 'Columna de lectura', 'Nosotros, FAQ, Términos, Privacidad, Artículo'],
  ['AdminPageTemplate', 'Título + acciones + mensajes + contenido', 'Las 16 páginas del panel'],
];

export const DesignSystemPage = () => {
  const [qty, setQty] = useState(2);
  const [term, setTerm] = useState('');
  const [metodo, setMetodo] = useState('webpay');
  const product = productService.getById('P001');
  const category = categoryService.getById('gaming');
  const r = reportService.summary();

  return (
    <div className="container ds">
      <PageTitle title="Sistema de diseño" subtitle="La tienda construida con Atomic Design, nivel por nivel" />
      <nav className="ds-nav" aria-label="Niveles">
        {LEVELS.map((l) => <a key={l.id} href={`#${l.id}`}><span>{l.n}</span>{l.nombre}</a>)}
      </nav>

      <section id="atomos" className="ds-level">
        <LevelHeader level={LEVELS[0]} />
        <div className="ds-grid">
          <Specimen name="Button">
            <div className="d-flex flex-wrap gap-2">
              <Button label="Primario" /><Button variant="accent" label="Acento" icon="cart" />
              <Button variant="ghost" label="Borde" /><Button variant="danger" label="Peligro" /><Button label="Deshabilitado" disabled />
            </div>
          </Specimen>
          <Specimen name="Heading">
            <Heading level={3} size={2} className="mb-1">Título 2</Heading>
            <Heading level={3} size={4} className="mb-0">Título 4</Heading>
          </Specimen>
          <Specimen name="Input · Select · Label">
            <Label htmlFor="ds-input">Correo</Label>
            <Input id="ds-input" placeholder="tu@correo.cl" />
            <Select className="mt-2" aria-label="Ejemplo" placeholder="Selecciona…" options={['Juegos', 'Software']} />
          </Specimen>
          <Specimen name="Badge">
            <div className="d-flex flex-wrap gap-2">
              {['neutral', 'brand', 'success', 'warning', 'danger', 'info'].map((t) => <Badge key={t} tone={t}>{t}</Badge>)}
            </div>
          </Specimen>
          <Specimen name="Price · Spinner">
            <div className="d-flex align-items-center gap-3"><Price value={29990} size="lg" /><Price value={39990} struck /><Spinner /></div>
          </Specimen>
          <Specimen name={`Icon (${ICON_NAMES.length})`}>
            <div className="ds-icons">{ICON_NAMES.map((n) => <span key={n} title={n}><Icon name={n} /></span>)}</div>
          </Specimen>
        </div>
      </section>

      <section id="moleculas" className="ds-level">
        <LevelHeader level={LEVELS[1]} />
        <div className="ds-grid">
          <Specimen name="FormField = Label + Input + error">
            <div className="row g-2">
              <FormField label="Nombre" name="ds-nombre" value="Pedro" onChange={() => {}} required />
              <FormField label="Correo" name="ds-correo" value="pedro@" onChange={() => {}} error="Ingresa un correo válido." />
            </div>
          </Specimen>
          <Specimen name="SearchBar = Input + Button"><SearchBar id="ds-search" value={term} onChange={setTerm} onSubmit={() => {}} /></Specimen>
          <Specimen name="PriceTag = Price + Price tachado + Badge"><PriceTag precio={29990} precioOferta={22990} size="lg" /></Specimen>
          <Specimen name="QuantitySelector = Button + valor + Button"><QuantitySelector value={qty} onChange={setQty} max={5} /></Specimen>
          <Specimen name="Alert = Icon + texto + cerrar">
            <Alert message="Producto agregado al carrito." variant="success" onClose={() => {}} />
            <Alert message="Revisa los campos marcados en rojo." variant="danger" />
          </Specimen>
          <Specimen name="StatCard = Icon + etiqueta + valor"><StatCard label="Ingresos" value={formatCLP(r.ingresos)} icon="chart" tone="green" /></Specimen>
          <Specimen name="CategoryCard = Image + nombre + contador"><CategoryCard category={category} count={categoryService.countProducts('gaming')} /></Specimen>
          <Specimen name="PaymentOption = radio + logo + texto">
            <div className="d-grid gap-2">
              {PAYMENT_METHODS.slice(0, 2).map((m) => <PaymentOption key={m.id} method={m} checked={metodo === m.id} onSelect={setMetodo} />)}
            </div>
          </Specimen>
          <Specimen name="EmptyState = Icon + Heading + texto + acción"><EmptyState title="Sin resultados" text="Prueba con otra búsqueda." icon="search" /></Specimen>
        </div>
      </section>

      <section id="organismos" className="ds-level">
        <LevelHeader level={LEVELS[2]} />
        <div className="ds-grid ds-grid--wide">
          <Specimen name="ProductCard = Image + Badge + Heading + PriceTag + Button">
            <div style={{ maxWidth: 280 }}><ProductCard product={product} onAdd={() => {}} /></div>
          </Specimen>
          <Specimen name="BarChart">
            <BarChart data={reportService.salesByCategory()} labelKey="categoria" valueKey="total" format={formatCLP} />
          </Specimen>
          <Specimen name="DataTable">
            <DataTable rows={productService.getCritical()} columns={[
              { key: 'nombre', header: 'Producto' },
              { key: 'stock', header: 'Stock', align: 'end' },
              { key: 'estado', header: 'Estado', render: () => <Badge tone="warning">Crítico</Badge> },
            ]} />
          </Specimen>
        </div>
        <p className="small text-muted-f4a mt-3">
          Otros organismos en uso: Header, Footer, HeroBanner, ProductGrid, ProductFilters, CategoryGrid, CartList, CartSummary,
          CustomerForm, PaymentMethodSelector, PaymentGateway, OrderItemsTable, OrderReceipt, ProductForm, UserForm, AdminSidebar y FaqAccordion.
        </p>
      </section>

      <section id="templates" className="ds-level">
        <LevelHeader level={LEVELS[3]} />
        <DataTable rowKey="0" rows={TEMPLATES} columns={[
          { key: 'n', header: 'Template', render: (t) => <code>{t[0]}</code> },
          { key: 'e', header: 'Estructura', render: (t) => t[1] },
          { key: 'u', header: 'Lo usan', render: (t) => t[2] },
        ]} />
      </section>

      <section id="paginas" className="ds-level">
        <LevelHeader level={LEVELS[4]} />
        <p>Cada página toma un template y lo llena con datos de <code>dataService</code>. Algunos ejemplos:</p>
        <div className="d-flex flex-wrap gap-2">
          {[['/', 'Inicio'], ['/productos', 'Productos'], ['/producto/P001', 'Detalle'], ['/carrito', 'Carrito'], ['/checkout', 'Checkout'], ['/login', 'Login'], ['/admin', 'Panel admin']]
            .map(([to, label]) => <Link key={to} to={to} className="btn btn-sm btn-ghost">{label}</Link>)}
        </div>
      </section>
    </div>
  );
};
