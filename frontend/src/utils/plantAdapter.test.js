import { describe, expect, it } from 'vitest';
import { toPlantViewModel } from './plantAdapter';

describe('toPlantViewModel', () => {
  it('maps the MongoDB plant schema without requiring a static fallback', () => {
    const plant = toPlantViewModel({
      _id: 'mongo-1',
      specimenId: 'specimen-monstera',
      slug: 'swiss-cheese-plant',
      catalogCode: 'CANOPY-002',
      name: 'Swiss Cheese Plant',
      scientificName: 'Monstera deliciosa',
      biome: 'tropical',
      category: 'Aroid',
      watering: 'Weekly',
      light: 'Bright indirect',
      toxicity: { isToxicToPets: true, details: 'Keep away from pets' },
      images: { hero: '/images/plants/monstera.avif', gallery: ['/images/plants/leaf.avif'] },
      telemetry: { waterStatus: 'Check Soil', humidityVal: '60% RH' }
    });

    expect(plant).toMatchObject({
      _id: 'mongo-1',
      id: 'specimen-monstera',
      slug: 'swiss-cheese-plant',
      image: '/images/plants/monstera.avif',
      water: 'Weekly',
      waterStatus: 'Check Soil',
      humidityVal: '60% RH',
      toxicity: 'Pet Caution'
    });
    expect(plant.images).toEqual([
      { url: '/images/plants/monstera.avif', alt: 'Swiss Cheese Plant', isPrimary: true },
      { url: '/images/plants/leaf.avif', alt: 'Swiss Cheese Plant', isPrimary: false }
    ]);
  });

  it('returns null for an absent API document instead of inventing a plant', () => {
    expect(toPlantViewModel(null)).toBeNull();
  });
});
