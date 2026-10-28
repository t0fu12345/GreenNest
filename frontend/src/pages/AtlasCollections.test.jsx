import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import AtlasCollections from './AtlasCollections';
import personalCollectionApi from '../services/personalCollectionApi';

vi.mock('../components/Navbar', () => ({ default: () => <div>Navbar</div> }));
vi.mock('../components/Footer', () => ({ default: () => <div>Footer</div> }));
vi.mock('../context/AuthContext', () => ({ useAuth: () => ({ isAuthenticated: true }) }));
vi.mock('../services/personalCollectionApi', () => ({
  default: {
    getCollections: vi.fn(),
    createCollection: vi.fn(),
    updateCollection: vi.fn(),
    deleteCollection: vi.fn(),
    removePlant: vi.fn(),
  },
}));

describe('API-backed personal collections', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    personalCollectionApi.getCollections.mockResolvedValue({
      data: [{
        _id: 'collection-1',
        name: 'Indoor plants',
        description: 'Stored remotely',
        plants: [{
          _id: 'plant-1',
          specimenId: 'atlas-plant-1',
          name: 'Boston Fern',
          images: { hero: '/atlas-fern.jpg', gallery: [] },
          status: 'published',
        }],
      }],
    });
  });

  it('renders personal collections and their published plants from the API', async () => {
    render(<AtlasCollections />);

    const collection = await screen.findByText('Indoor plants');
    fireEvent.click(collection);

    expect(await screen.findByText('Boston Fern')).toBeInTheDocument();
    expect(screen.getByText('Collections are stored in your GreenNest database.')).toBeInTheDocument();
    expect(personalCollectionApi.getCollections).toHaveBeenCalledOnce();
  });

  it('creates collections through the API and never writes a local fallback', async () => {
    personalCollectionApi.createCollection.mockResolvedValue({ data: { _id: 'collection-2' } });
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    render(<AtlasCollections />);

    await screen.findByText('Indoor plants');
    fireEvent.change(screen.getByPlaceholderText('Collection name'), { target: { value: 'New collection' } });
    fireEvent.click(screen.getByRole('button', { name: 'Create collection' }));

    await waitFor(() => expect(personalCollectionApi.createCollection).toHaveBeenCalledWith({
      name: 'New collection',
      description: '',
    }));
    expect(storageSpy).not.toHaveBeenCalled();
    storageSpy.mockRestore();
  });

  it('shows the database error instead of rendering sample collections', async () => {
    personalCollectionApi.getCollections.mockRejectedValue(new Error('Database offline'));
    render(<AtlasCollections />);

    expect(await screen.findByRole('alert')).toHaveTextContent('Database offline');
    expect(screen.queryByText('Indoor plants')).not.toBeInTheDocument();
  });
});
