import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, describe, expect, it, vi } from 'vitest';
import AtlasCollectionModal from './AtlasCollectionModal';
import personalCollectionApi from '../../services/personalCollectionApi';
import plantApi from '../../services/plantApi';

vi.mock('../../context/AuthContext', () => ({ useAuth: () => ({ isAuthenticated: true }) }));
vi.mock('../../utils/plantAdapter', () => ({ toPlantViewModel: plant => plant }));
vi.mock('../../services/personalCollectionApi', () => ({
  default: { getCollections: vi.fn(), addPlant: vi.fn(), removePlant: vi.fn(), createCollection: vi.fn() },
}));
vi.mock('../../services/plantApi', () => ({ default: { getPlantDetail: vi.fn() } }));

const renderModal = (isOpen, onClose) => (
  <MemoryRouter>
    <AtlasCollectionModal isOpen={isOpen} onClose={onClose} plantSlug="fern" />
  </MemoryRouter>
);

describe('save to collection modal motion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('keeps the dialog mounted through its exit and supports Escape', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: false }));
    plantApi.getPlantDetail.mockResolvedValue({ data: { _id: 'plant-1', name: 'Fern' } });
    personalCollectionApi.getCollections.mockResolvedValue({ data: [] });
    const onClose = vi.fn();

    const { rerender } = render(renderModal(true, onClose));
    const dialog = await screen.findByRole('dialog', { name: 'Save Fern' });
    expect(screen.getByRole('button', { name: 'Close collection dialog' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(screen.getByRole('button', { name: 'Create and Save Specimen' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Close collection dialog' })).toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledOnce();

    rerender(renderModal(false, onClose));
    expect(dialog).toBeInTheDocument();
    expect(dialog.parentElement).toHaveAttribute('data-closing', 'true');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('closes immediately when reduced motion is requested', async () => {
    vi.stubGlobal('matchMedia', () => ({ matches: true }));
    plantApi.getPlantDetail.mockResolvedValue({ data: { _id: 'plant-1', name: 'Fern' } });
    personalCollectionApi.getCollections.mockResolvedValue({ data: [] });
    const { rerender } = render(renderModal(true, vi.fn()));
    await screen.findByRole('dialog');

    rerender(renderModal(false, vi.fn()));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
