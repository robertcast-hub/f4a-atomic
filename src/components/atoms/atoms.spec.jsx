// Pruebas de ÁTOMOS: piezas mínimas, sin datos de la tienda
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Badge, Heading, Icon, ICON_NAMES, Image, Input, Label, Logo, Price, Select, Spinner, Textarea } from './index';

describe('Átomos', () => {
  it('Heading separa el nivel semántico del tamaño visual', () => {
    render(<Heading level={2} size={4}>Hola</Heading>);
    const h = screen.getByRole('heading', { level: 2, name: 'Hola' });
    expect(h.className).toContain('heading--4');
  });

  it('Badge aplica el tono como clase', () => {
    render(<Badge tone="danger">-25%</Badge>);
    expect(screen.getByText('-25%').className).toContain('badge-f4a--danger');
  });

  it('Icon es decorativo por defecto y accesible cuando recibe title', () => {
    const { container, rerender } = render(<Icon name="cart" />);
    expect(container.querySelector('svg').getAttribute('aria-hidden')).toBe('true');
    rerender(<Icon name="cart" title="Carrito" />);
    expect(screen.getByRole('img', { name: 'Carrito' })).toBeTruthy();
    expect(ICON_NAMES.length).toBeGreaterThan(20);
  });

  it('Icon usa un ícono de respaldo si el nombre no existe', () => {
    const { container } = render(<Icon name="no-existe" />);
    expect(container.querySelector('path').getAttribute('d')).toBeTruthy();
  });

  it('Image muestra un respaldo cuando la imagen falla', () => {
    const { container } = render(<Image src="/no-existe.png" alt="Portada" />);
    fireEvent.error(container.querySelector('img'));
    expect(screen.getByRole('img', { name: 'Portada' }).className).toContain('img-fallback');
  });

  it('Price formatea en pesos chilenos y puede mostrarse tachado', () => {
    const { container, rerender } = render(<Price value={29990} />);
    expect(screen.getByText('$29.990')).toBeTruthy();
    rerender(<Price value={29990} struck />);
    expect(container.querySelector('del')).not.toBeNull();
  });

  it('Input, Select y Textarea marcan el estado inválido', () => {
    render(<><Input aria-label="a" invalid /><Select aria-label="b" invalid options={['x']} /><Textarea aria-label="c" invalid /></>);
    ['a', 'b', 'c'].forEach((n) => {
      const el = screen.getByLabelText(n);
      expect(el.className).toContain('is-invalid');
      expect(el.getAttribute('aria-invalid')).toBe('true');
    });
  });

  it('Select agrega la opción vacía solo si recibe placeholder', () => {
    const { rerender } = render(<Select aria-label="s" options={[{ value: '1', label: 'Uno' }]} />);
    expect(screen.getAllByRole('option').length).toBe(1);
    rerender(<Select aria-label="s" placeholder="Elige" options={[{ value: '1', label: 'Uno' }]} />);
    expect(screen.getAllByRole('option').map((o) => o.textContent)).toEqual(['Elige', 'Uno']);
  });

  it('Label asocia el campo y muestra el asterisco solo si es obligatorio', () => {
    const { container } = render(<><Label htmlFor="x" required>Nombre</Label><input id="x" /></>);
    expect(screen.getByLabelText(/Nombre/)).toBeTruthy();
    expect(container.querySelector('.text-danger').textContent).toBe('*');
  });

  it('Spinner anuncia la carga salvo que sea decorativo', () => {
    const { rerender } = render(<Spinner label="Cargando datos" />);
    expect(screen.getByRole('status', { name: 'Cargando datos' })).toBeTruthy();
    rerender(<Spinner decorative />);
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('Logo enlaza al inicio con un nombre accesible', () => {
    render(<MemoryRouter><Logo /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /ir al inicio/ }).getAttribute('href')).toBe('/');
  });
});
