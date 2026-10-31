import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Link, MemoryRouter, Route, Routes, useNavigate } from 'react-router-dom';
import PublicRouteMotion from './PublicRouteMotion';

const HistoryBack = () => {
  const navigate = useNavigate();
  return <button onClick={() => navigate(-1)}>Back</button>;
};

const renderRoutes = initialEntry => render(
  <MemoryRouter initialEntries={[initialEntry]}>
    <PublicRouteMotion>
      <Link to="/plants">Plants</Link>
      <HistoryBack />
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/plants" element={<div>Plant list</div>} />
        <Route path="/admin" element={<div>Admin</div>} />
      </Routes>
    </PublicRouteMotion>
  </MemoryRouter>
);

describe('public route motion', () => {
  afterEach(() => {
    delete HTMLElement.prototype.animate;
    vi.unstubAllGlobals();
  });

  it('animates forward and back navigation without replacing the route shell', () => {
    const cancel = vi.fn();
    const animate = vi.fn(() => ({ cancel }));
    HTMLElement.prototype.animate = animate;
    vi.stubGlobal('matchMedia', () => ({ matches: false }));

    const { container } = renderRoutes('/');
    const shell = container.querySelector('.public-app');
    fireEvent.click(screen.getByRole('link', { name: 'Plants' }));
    expect(screen.getByText('Plant list')).toBeInTheDocument();
    expect(container.querySelector('.public-app')).toBe(shell);
    fireEvent.click(screen.getByRole('button', { name: 'Back' }));
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(animate).toHaveBeenCalledTimes(3);
    expect(cancel).toHaveBeenCalledTimes(2);
  });

  it('skips animation for admin and reduced motion', () => {
    const animate = vi.fn(() => ({ cancel: vi.fn() }));
    HTMLElement.prototype.animate = animate;
    vi.stubGlobal('matchMedia', () => ({ matches: true }));

    const { unmount } = renderRoutes('/');
    expect(animate).not.toHaveBeenCalled();
    unmount();
    const { container } = renderRoutes('/admin');
    expect(container.querySelector('.public-app')).toBeNull();
    expect(animate).not.toHaveBeenCalled();
  });
});
