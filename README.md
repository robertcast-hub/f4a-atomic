# F4A Tienda Digital · Atomic Design

Tienda online de claves digitales (videojuegos, software, suscripciones y tarjetas de regalo) construida con
**React 19 + Vite + Bootstrap 5** y organizada con la metodología **Atomic Design**. Pruebas con
**Jasmine + Karma**.

Es la evolución de [f4a-react](https://github.com/robertcast-hub/f4a-react) (v3.1): misma funcionalidad, con
los componentes reorganizados en átomos, moléculas, organismos, templates y páginas, y con un diseño visual nuevo.

## Comandos

| Comando | Qué hace |
|---|---|
| `npm install` | Instala las dependencias |
| `npm run dev` | Levanta la tienda en http://localhost:5173 |
| `npm test` | Ejecuta las 231 pruebas con Karma + Jasmine y genera el reporte de cobertura |
| `npm run test:watch` | Ejecuta las pruebas al guardar |
| `npm run lint` | Revisa el código y **la jerarquía de Atomic Design** |
| `npm run build` | Genera la versión de producción en `dist/` |

Necesitas Node.js 20+ y Google Chrome (Karma lo usa sin ventana). Si Karma no encuentra Chrome, define
`CHROME_BIN` con la ruta del ejecutable. Después de `npm test`, abre `coverage/html/index.html`.

**Cuentas de prueba:** `admin@f4a.cl` / `admin123` (administrador) y `cliente@f4a.cl` / `cliente123` (cliente).

**Sistema de diseño en vivo:** abre `/sistema-diseno` (también está enlazado en el pie de página).

## Atomic Design en este proyecto

```
src/components/
├── atoms/        12  Badge, Button, Heading, Icon, Image, Input, Label, Logo, Price, Select, Spinner, Textarea
├── molecules/    12  Alert, BlogCard, Breadcrumb, CategoryCard, EmptyState, FormField, PageTitle,
│                     PaymentOption, PriceTag, QuantitySelector, SearchBar, StatCard
├── organisms/    20  AdminSidebar, BarChart, CartList, CartSummary, CategoryGrid, CustomerForm, DataTable,
│                     FaqAccordion, Footer, Header, HeroBanner, OrderItemsTable, OrderReceipt, PaymentGateway,
│                     PaymentMethodSelector, ProductCard, ProductFilters, ProductForm, ProductGrid, UserForm
└── templates/     6  StoreTemplate, AdminTemplate, CatalogTemplate, FocusTemplate, ArticleTemplate, AdminPageTemplate
src/pages/        33  store/ (19) y admin/ (14): cada página llena un template con datos reales
```

| Nivel | Regla | Puede importar |
|---|---|---|
| Átomo | Pieza mínima. No conoce datos ni estado de la tienda. | Solo otros átomos y utilidades |
| Molécula | Grupo pequeño de átomos con una sola función. | Átomos y utilidades |
| Organismo | Sección completa de la interfaz. Puede leer datos o el contexto. | Moléculas, átomos, datos y contexto |
| Template | Esqueleto de un tipo de página, con huecos (props u `<Outlet />`). | Organismos, moléculas y átomos |
| Página | Template lleno con datos reales. Maneja el estado de la vista. | Todo lo anterior |

La jerarquía **no es solo una convención**: `eslint.config.js` tiene reglas `no-restricted-imports` por carpeta.
Si un átomo importa una molécula, o una molécula lee `dataService`, `npm run lint` falla con un mensaje como
*"Un átomo no puede usar niveles superiores."*

Los estilos siguen el mismo orden: `src/styles/tokens.css` define los tokens de diseño (colores, tipografía,
radios, sombras) y `src/index.css` está dividido en Base, Átomos, Moléculas, Organismos, Templates y Páginas.

## Diseño visual

- **Consola oscura + papel claro:** encabezado, pie y panel admin en tinta (`#10131a`), donde el logo F4A se lee
  completo; el contenido va sobre fondo claro (`#eef1f4`).
- **Colores del logo:** azul `#1e4fd8` para acciones principales y verde `#00c46a` como acento. El verde de los
  precios es `#00753a` para cumplir contraste AA sobre blanco.
- **Tipografía:** Oxanium en títulos y precios, Manrope en el texto. Se instalan con npm (`@fontsource`), así que
  funcionan sin conexión.
- **Elemento distintivo:** cada producto es una *tarjeta de clave digital*, con muescas laterales y una línea
  perforada entre la portada y los datos.

## Funcionalidad

Tienda (Inicio, Productos con filtros, Detalle, Categorías, Ofertas, Carrito, Checkout en dos pasos con pasarela
de pago simulada, Compra exitosa / Pago rechazado, Login, Registro, Blog, Nosotros, Contacto, FAQ, Términos,
Privacidad, Sistema de diseño) y panel administrativo protegido por rol (Dashboard, Órdenes y boletas, CRUD de
productos, categorías y usuarios, stock crítico, reportes y perfil). Los datos viven en `localStorage`
(claves `f4a_v3_...`).

**Tarjetas de prueba de la pasarela:** `4111 1111 1111 1111` y `5555 5555 5555 4444` se aprueban;
`4000 0000 0000 0002` (fondos insuficientes) y `5105 1051 0510 5100` (tarjeta bloqueada) se rechazan. Usa
cualquier nombre, una fecha futura y un CVV de 3 dígitos.

## Pruebas

231 pruebas en 33 archivos, cada uno junto al componente que prueba. Cobertura: 94,3% de sentencias,
88,6% de ramas, 91,5% de funciones y 96,4% de líneas. Átomos, moléculas y templates tienen 100% de líneas.

## Documentación

- `docs/Documento Atomic Design.docx`: arquitectura, inventario de componentes por nivel, diseño, pruebas y cobertura.
- `docs/GUIA_DEFENSA.md`: guion para la presentación y preguntas probables.
