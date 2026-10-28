export const toPlantViewModel = (plant) => {
  if (!plant) return null;

  const hero = plant.images?.hero || plant.image || '';
  const gallery = Array.isArray(plant.images?.gallery) ? plant.images.gallery : [];
  const images = [hero, ...gallery.filter(url => url && url !== hero)].filter(Boolean).map((url, index) => ({
    url,
    alt: plant.name || 'Botanical specimen',
    isPrimary: index === 0,
  }));

  return {
    ...plant,
    ...plant.telemetry,
    id: plant.specimenId || plant.slug || plant._id,
    _id: plant._id,
    slug: plant.slug || plant.specimenId || plant._id,
    catalogCode: plant.catalogCode || plant.specimenId || '',
    image: hero,
    images,
    water: plant.watering || plant.water || '',
    watering: plant.watering || plant.water || '',
    toxicity: plant.toxicity?.isToxicToPets ? 'Pet Caution' : 'Pet Safe',
    toxicityDetails: plant.toxicity?.details || '',
    biomeLabel: plant.biomeLabel || plant.biome || '',
    shortDesc: plant.shortDesc || plant.description || '',
    raw: plant,
  };
};

export const toPlantViewModels = (plants = []) => plants.map(toPlantViewModel).filter(Boolean);

export default toPlantViewModel;
