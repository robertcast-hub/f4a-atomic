// Pruebas de ORGANISMOS adicionales: secciones completas de la interfaz
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BarChart, CartList, CartSummary, CategoryGrid, DataTable, FaqAccordion, Footer, HeroBanner, OrderReceipt } from './index';
import { categoryService, orderService } from '../../data/dataService';
import { mockProduct, mockOffer } from '../../test/renderWithProviders';

const inRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>);

describe('Organismos', () => {
  it('DataTable renderiza una fila por registro usando render personalizado', () => {
    render(<DataTable rows={[{ id: 1, n: 'A' }, { id: 2, n: 'B' }]} columns={[
      { key: 'n', header: 'Nombre' },
      { key: 'x', header: 'Doble', render: (r) => r.n + r.n },
    ]} />);
    expect(screen.getAllByRole('row').length).toBe(3);
    expect(screen.getByText('BB')).toBeTruthy();
  });

  it('DataTable muestra el texto vacío cuando no hay filas', () => {
    render(<DataTable rows={[]} columns={[{ key: 'n', header: 'Nombre' }]} emptyText="Nada aquí" />);
    expect(screen.getByText('Nada aquí')).toBeTruthy();
  });

  it('BarChart calcula el ancho de cada barra respecto del máximo', () => {
    render(<BarChart data={[{ c: 'A', v: 50 }, { c: 'B', v: 100 }]} labelKey="c" valueKey="v" />);
    const bars = screen.getAllByRole('progressbar');
    expect(bars[0].firstChild.style.width).toBe('50%');
    expect(bars[1].getAttribute('aria-valuemax')).toBe('100');
  });

  it('CartList avisa cambios de cantidad y eliminación con el id del producto', () => {
    const onQ = jasmine.createSpy('onQuantityChange');
    const onR = jasmine.createSpy('onRemove');
    render(<CartList items={[{ ...mockProduct, quantity: 2 }, { ...mockOffer, quantity: 1 }]} onQuantityChange={onQ} onRemove={onR} />);
    const fila = screen.getByText('Oferta de Prueba').closest('li');
    fireEvent.click(within(fila).getByLabelText('Aumentar cantidad'));
    expect(onQ).toHaveBeenCalledWith('T2', 2);
    fireEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }));
    expect(onR).toHaveBeenCalledWith('T2');
    expect(screen.getByText('$20.000')).toBeTruthy();
  });

  it('CartSummary muestra total, cantidad y enlace al checkout', () => {
    inRouter(<CartSummary total={25000} count={3} />);
    expect(screen.getByTestId('cart-total').textContent).toBe('$25.000');
    expect(screen.getByText('3')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Comprar ahora' }).getAttribute('href')).toBe('/checkout');
  });

  it('CategoryGrid dibuja todas las categorías de la base de datos', () => {
    inRouter(<CategoryGrid categories={categoryService.getAll()} />);
    expect(screen.getAllByRole('link').length).toBe(5);
  });

  it('FaqAccordion abre la primera pregunta y alterna al hacer clic', () => {
    render(<FaqAccordion items={[{ q: 'P1', a: 'R1' }, { q: 'P2', a: 'R2' }]} />);
    expect(screen.getByText('R1')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: 'P2' }));
    expect(screen.queryByText('R1')).toBeNull();
    expect(screen.getByRole('button', { name: 'P2' }).getAttribute('aria-expanded')).toBe('true');
  });

  it('HeroBanner cambia de diapositiva con los indicadores', () => {
    const slides = [
      { kicker: 'K1', titulo: 'Uno', texto: 'T1', cta: 'Ir 1', to: '/a', imagenes: [] },
      { kicker: 'K2', titulo: 'Dos', texto: 'T2', cta: 'Ir 2', to: '/b', imagenes: [] },
    ];
    inRouter(<HeroBanner slides={slides} />);
    expect(screen.getByRole('heading', { name: 'Uno' })).toBeTruthy();
    fireEvent.click(screen.getByLabelText('Ir a diapositiva 2'));
    expect(screen.getByRole('heading', { name: 'Dos' })).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Ir 2' }).getAttribute('href')).toBe('/b');
  });

  it('OrderReceipt muestra estado, medio de pago y los datos del cliente en solo lectura', () => {
    inRouter(<OrderReceipt order={orderService.getById('ORD-20260002')} />);
    expect(screen.getByText('Rechazada')).toBeTruthy();
    expect(screen.getByTestId('payment-info').textContent).toContain('PayPal');
    expect(screen.getByLabelText(/^Nombre/).readOnly).toBeTrue();
  });

  it('Footer lista los 5 medios de pago y enlaza al sistema de diseño', () => {
    inRouter(<Footer />);
    expect(screen.getAllByRole('img').filter((i) => i.getAttribute('height') === '26').length).toBe(5);
    expect(screen.getByRole('link', { name: 'Sistema de diseño' }).getAttribute('href')).toBe('/sistema-diseno');
  });
});
