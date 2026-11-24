# Guía de defensa — F4A Tienda Digital con Atomic Design

Esta guía sirve para presentar el proyecto y responder las preguntas del docente. Sigue el orden natural de la
metodología: de lo más pequeño a lo más grande.

**Antes de empezar:** ten abiertos `npm run dev`, una terminal para `npm test` y `npm run lint`,
`coverage/html/index.html`, el editor con `src/components/` desplegado y la página `/sistema-diseno`.

---

## 1. Qué es Atomic Design y por qué lo usamos (~2 min)

**Qué decir**

- Atomic Design es una metodología de Brad Frost para construir interfaces como un sistema. Toma la idea de la
  química: los átomos se combinan en moléculas, las moléculas en organismos, y así hasta llegar a la página.
- Tiene 5 niveles: **átomos → moléculas → organismos → templates → páginas**.
- La usamos porque la tienda repite muchas piezas (botones, precios, campos de formulario, tablas). Con Atomic
  Design cada pieza existe **una sola vez** y se reutiliza. Si cambia el botón, cambia en las 33 páginas.
- Encaja con React: React ya piensa en componentes; Atomic Design ordena **qué tamaño** tiene cada uno y
  **quién puede usar a quién**.

**Qué mostrar:** la carpeta `src/components/` con sus 4 subcarpetas y `src/pages/`.

---

## 2. Los niveles con ejemplos de la tienda (~5 min)

Abre `/sistema-diseno`: muestra cada nivel con componentes reales. Recorre un ejemplo de punta a punta:
**cómo se arma la tarjeta de producto**.

| Nivel | Ejemplo | De qué está hecho |
|---|---|---|
| Átomo | `Button`, `Price`, `Badge`, `Image` | Nada: son HTML con estilo y props |
| Molécula | `PriceTag` | `Price` + `Price` tachado + `Badge` de descuento |
| Organismo | `ProductCard` | `Image` + `Badge` + título + `PriceTag` + `Button` |
| Organismo | `ProductGrid` | Varias `ProductCard` + `EmptyState` si no hay productos |
| Template | `CatalogTemplate` | Título + hueco para filtros + hueco para el listado |
| Página | `ProductsPage` | `CatalogTemplate` + `ProductFilters` + `ProductGrid` con los datos de `productService` |

**Qué mostrar en el código:** abre en este orden `atoms/Price.jsx` → `molecules/PriceTag.jsx` →
`organisms/ProductCard.jsx` → `templates/CatalogTemplate.jsx` → `pages/store/ProductsPage.jsx`.
Cada archivo empieza con un comentario que dice su nivel y de qué está compuesto.

**Diferencias que suelen preguntar**

- *Molécula vs. organismo:* una molécula hace **una** cosa (`SearchBar`: buscar). Un organismo es una
  **sección** con varias funciones (`Header`: logo, búsqueda, sesión, carrito y menú).
- *Template vs. página:* el template es el **molde sin datos** (`CatalogTemplate` no sabe de productos); la página
  es el **molde lleno** (`ProductsPage` pide los productos y los pone en el molde).
- *¿Dónde va el estado?* Los átomos y moléculas reciben todo por props. El estado de la vista vive en las páginas
  (por ejemplo, el paso del checkout) o en organismos que lo necesitan (por ejemplo, la pasarela de pago).
  El estado global (carrito y sesión) está en Context.

---

## 3. Cómo se asegura la jerarquía (~2 min)

**Qué decir:** "No es solo una convención de carpetas: el linter la hace cumplir."

**Qué mostrar:** `eslint.config.js`, bloque *Jerarquía de Atomic Design*. Luego demuéstralo en vivo:

1. Abre `src/components/atoms/Button.jsx` y agrega arriba:
   `import { Header } from '../organisms/Header';`
2. Ejecuta `npm run lint`. Falla con **"Un átomo no puede usar niveles superiores."**
3. Borra la línea y vuelve a ejecutar: pasa.

Reglas: un átomo no importa moléculas, organismos, templates, páginas, datos ni contexto. Una molécula solo usa
átomos (tampoco datos ni contexto). Un organismo no usa templates ni páginas. Un template no usa páginas.

---

## 4. Diseño visual y tokens (~2 min)

- `src/styles/tokens.css` guarda los **tokens de diseño**: colores, tipografía, radios, sombras. Son el nivel
  "sub-atómico": todos los componentes los usan con `var(--blue)`, `var(--radius)`, etc.
- `src/index.css` está ordenado por niveles: Base, Átomos, Moléculas, Organismos, Templates y Páginas.
- Decisiones del rediseño:
  - Encabezado, pie y panel en tono oscuro, porque el "4" del logo es gris claro y en fondo blanco no se ve.
  - Contenido en fondo claro para que las portadas de los juegos resalten.
  - Azul y verde sacados del logo. El verde de los precios es más oscuro (`#00753a`) para cumplir contraste AA.
  - La tarjeta de producto imita una **tarjeta de clave digital**: muescas a los lados y línea perforada.
- **Responsivo:** abre las DevTools (Ctrl + Shift + M) y muestra 390 px, 768 px y 1280 px: la grilla pasa de 1 a
  4 columnas, el menú se abre con el botón y la barra lateral del admin se vuelve desplegable.

---

## 5. Pruebas con Jasmine y Karma (~3 min)

Ejecuta `npm test` en vivo: **231 pruebas, 0 fallidas**. Cada prueba está junto a su componente, así que las
pruebas también siguen los niveles:

| Nivel | Archivo de ejemplo | Qué se prueba |
|---|---|---|
| Átomos | `atoms/atoms.spec.jsx`, `atoms/Button.spec.jsx` | Props, clases, accesibilidad, imagen de respaldo |
| Moléculas | `molecules/molecules.spec.jsx`, `FormField.spec.jsx` | Que la combinación de átomos funcione (por ejemplo, PriceTag con y sin oferta) |
| Organismos | `organisms/ProductCard.spec.jsx`, `PaymentGateway.spec.jsx` | Comportamiento: eventos, estado, mocks de servicios |
| Templates | `templates/templates.spec.jsx` | Que cada hueco aparezca en su lugar |
| Páginas | `pages/store/CheckoutPage.spec.jsx` | Flujos completos con datos |
| Rutas | `App.spec.jsx` | Que las 34 rutas carguen su página |

**Por qué Atomic Design facilita las pruebas:** los átomos y moléculas no dependen de datos, así que se prueban
con un simple `render(<PriceTag precio={10000} precioOferta={7500} />)`, sin router ni mocks. Los mocks
(`spyOn`, `jasmine.createSpy`, `jasmine.clock`) se necesitan recién en organismos y páginas.

**Cobertura** (`coverage/html/index.html`): 94,3% de sentencias y 96,4% de líneas. Átomos, moléculas y templates
tienen 100% de líneas.

---

## 6. Demostración en vivo sugerida (~3 min)

1. `/sistema-diseno`: recorrer los 5 niveles con el menú numerado.
2. Inicio → agregar un producto: el contador del carrito cambia (`ProductCard` → `CartContext` → `Header`).
3. Carrito → Comprar ahora → enviar vacío: errores en rojo (`FormField` con estado inválido).
4. Completar datos → Visa → tarjeta `4111 1111 1111 1111` → compra exitosa.
5. Login `admin@f4a.cl` / `admin123` → Productos: todas las tablas del panel son el mismo organismo `DataTable`.
6. Demostración del linter (punto 3).

---

## Preguntas probables

- **¿Qué ventaja concreta te dio Atomic Design?**
  Reutilización y consistencia. Por ejemplo, `DataTable` reemplazó las 6 tablas que antes estaban escritas a mano en el panel, y
  `FormField` se usa en todos los formularios: login, registro, checkout, pasarela, productos, categorías, usuarios y contacto.
- **¿Por qué `ProductCard` es organismo y no molécula?**
  Porque combina varias moléculas y átomos y tiene comportamiento propio (estado "Agregado", temporizador). Una
  molécula hace una sola cosa pequeña.
- **¿Por qué `FormField` es molécula?**
  Une tres átomos (`Label`, `Input` y el mensaje de error) para una sola tarea: capturar un dato con su etiqueta.
- **¿Un organismo puede usar otro organismo?**
  Sí. `ProductGrid` usa `ProductCard` y `OrderReceipt` usa `CustomerForm`. Lo que no puede es usar templates o
  páginas.
- **¿Dónde quedó la lógica de negocio?**
  Fuera de los componentes: en `src/data/dataService.js` (CRUD, checkout, reportes) y `src/utils/`
  (validaciones y pagos). Los componentes solo muestran y avisan.
- **¿Qué cambiarías?**
  Agregar Storybook para documentar cada componente de forma aislada; por ahora `/sistema-diseno` cumple ese rol
  dentro de la propia app.
- **¿Qué pasa con los datos si cambio de navegador?**
  Viven en `localStorage`, así que son de cada navegador. Se resuelve al conectar un backend con base de datos.
