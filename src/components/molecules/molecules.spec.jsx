// Pruebas de MOLÉCULAS: grupos de átomos con una sola función
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BlogCard, Breadcrumb, CategoryCard, EmptyState, PageTitle, PaymentOption, PriceTag, SearchBar, StatCard } from './index';
import { PAYMENT_METHODS } from '../../utils/payment';

const inRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Moléculas', () => {
  it('SearchBar comunica el texto escrito y lo envía al presionar Buscar', () => {
    const onChange = jasmine.createSpy('onChange');
    const onSubmit = jasmine.createSpy('onSubmit');
    render(<SearchBar value="gta" onChange={onChange} onSubmit={onSubmit} />);
    fireEvent.change(screen.getByLabelText('Buscar productos'), { target: { value: 'gta 6' } });
    expect(onChange).toHaveBeenCalledWith('gta 6');
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    expect(onSubmit).toHaveBeenCalledWith('gta');
  });

  it('PriceTag muestra solo el precio cuando no hay oferta', () => {
    const { container } = render(<PriceTag precio={10000} precioOferta={null} />);
    expect(screen.getByText('$10.000')).toBeTruthy();
    expect(container.querySelector('del')).toBeNull();
  });

  it('PriceTag con oferta muestra el precio rebajado, el anterior tachado y el descuento', () => {
    const { container } = render(<PriceTag precio={10000} precioOferta={7500} />);
    expect(screen.getByText('$7.500')).toBeTruthy();
    expect(container.querySelector('del').textContent).toBe('$10.000');
    expect(screen.getByText('-25%')).toBeTruthy();
  });

  it('EmptyState muestra la acción solo si recibe destino', () => {
    const { rerender } = inRouter(<EmptyState title="Vacío" />);
    expect(screen.queryByRole('link')).toBeNull();
    rerender(<MemoryRouter><EmptyState title="Vacío" actionTo="/productos" actionLabel="Ver catálogo" /></MemoryRouter>);
    expect(screen.getByRole('link', { name: 'Ver catálogo' }).getAttribute('href')).toBe('/productos');
  });

  it('PageTitle renderiza un h1, el subtítulo y las acciones', () => {
    render(<PageTitle title="Productos" subtitle="Catálogo"><button type="button">Nuevo</button></PageTitle>);
    expect(screen.getByRole('heading', { level: 1, name: 'Productos' })).toBeTruthy();
    expect(screen.getByText('Catálogo')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Nuevo' })).toBeTruthy();
  });

  it('StatCard muestra etiqueta, valor y detalle', () => {
    render(<StatCard label="Ventas" value="$1.000" detail="3 hoy" />);
    expect(screen.getByTestId('stat-Ventas').textContent).toBe('$1.000');
    expect(screen.getByText('3 hoy')).toBeTruthy();
  });

  it('CategoryCard enlaza a su categoría y usa singular o plural', () => {
    const { rerender } = inRouter(<CategoryCard category={{ id: 'regalos', nombre: 'Regalos' }} count={1} />);
    expect(screen.getByRole('link').getAttribute('href')).toBe('/categorias/regalos');
    expect(screen.getByText('1 producto')).toBeTruthy();
    rerender(<MemoryRouter><CategoryCard category={{ id: 'regalos', nombre: 'Regalos' }} count={3} /></MemoryRouter>);
    expect(screen.getByText('3 productos')).toBeTruthy();
  });

  it('Breadcrumb enlaza los niveles anteriores y marca el actual', () => {
    inRouter(<Breadcrumb items={[{ label: 'Productos', to: '/productos' }, { label: 'Minecraft' }]} />);
    expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy();
    expect(screen.getByText('Minecraft').getAttribute('aria-current')).toBe('page');
  });

  it('PaymentOption avisa su id al seleccionarse', () => {
    const onSelect = jasmine.createSpy('onSelect');
    render(<PaymentOption method={PAYMENT_METHODS[3]} checked={false} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('radio', { name: /PayPal/ }));
    expect(onSelect).toHaveBeenCalledWith('paypal');
  });

  it('BlogCard muestra título, resumen y enlace al artículo', () => {
    inRouter(<BlogCard blog={{ id: 'x', titulo: 'Guía', resumen: 'Resumen', fecha: '2026-11-05', autor: 'F4A', imagen: '' }} />);
    expect(screen.getByRole('heading', { name: 'Guía' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Leer artículo' }).getAttribute('href')).toBe('/blogs/x');
  });
});
