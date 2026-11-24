// Pruebas de TEMPLATES: estructuras con huecos que las páginas llenan
import { render, screen } from '@testing-library/react';
import { AdminPageTemplate, ArticleTemplate, CatalogTemplate, FocusTemplate, StoreTemplate } from './index';
import { renderWithProviders } from '../../test/renderWithProviders';

describe('Templates', () => {
  it('CatalogTemplate ubica la barra superior, el título, los filtros y el contenido', () => {
    render(<CatalogTemplate top={<p>arriba</p>} title="Productos" subtitle="Todo" toolbar={<p>filtros</p>}><p>grilla</p></CatalogTemplate>);
    ['arriba', 'Todo', 'filtros', 'grilla'].forEach((t) => expect(screen.getByText(t)).toBeTruthy());
    expect(screen.getByRole('heading', { level: 1, name: 'Productos' })).toBeTruthy();
  });

  it('FocusTemplate aplica el ancho y el tono del panel', () => {
    const { container } = render(<FocusTemplate width="sm" tone="error"><p>contenido</p></FocusTemplate>);
    expect(container.querySelector('.focus--sm')).not.toBeNull();
    expect(container.querySelector('.focus__panel--error')).not.toBeNull();
  });

  it('ArticleTemplate es un article con título y cuerpo', () => {
    render(<ArticleTemplate title="Nosotros"><p>texto</p></ArticleTemplate>);
    expect(screen.getByRole('article')).toBeTruthy();
    expect(screen.getByRole('heading', { name: 'Nosotros' })).toBeTruthy();
  });

  it('AdminPageTemplate muestra acciones y mensajes antes del contenido', () => {
    render(<AdminPageTemplate title="Usuarios" actions={<button type="button">Nuevo</button>} alerts={<p>aviso</p>}><p>tabla</p></AdminPageTemplate>);
    const texto = document.body.textContent;
    expect(texto.indexOf('aviso')).toBeLessThan(texto.indexOf('tabla'));
    expect(screen.getByRole('button', { name: 'Nuevo' })).toBeTruthy();
  });

  it('StoreTemplate compone Header, contenido y Footer', () => {
    renderWithProviders(<StoreTemplate />);
    expect(screen.getByRole('banner')).toBeTruthy();
    expect(screen.getByRole('main')).toBeTruthy();
    expect(screen.getByRole('contentinfo')).toBeTruthy();
    expect(screen.getByRole('link', { name: 'Saltar al contenido' })).toBeTruthy();
  });
});
