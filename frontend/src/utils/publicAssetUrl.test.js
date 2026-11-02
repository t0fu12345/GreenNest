import { describe, expect, it } from 'vitest';
import { resolvePublicAssetUrl } from './publicAssetUrl';

describe('resolvePublicAssetUrl', () => {
  it('prefixes root-relative public image paths with the deployed base path', () => {
    expect(resolvePublicAssetUrl('/images/plants/swiss-cheese-plant.avif', '/GreenNest/'))
      .toBe('/GreenNest/images/plants/swiss-cheese-plant.avif');
  });

  it('keeps URLs already under the deployed base path unchanged', () => {
    expect(resolvePublicAssetUrl('/GreenNest/images/plants/swiss-cheese-plant.avif', '/GreenNest/'))
      .toBe('/GreenNest/images/plants/swiss-cheese-plant.avif');
  });

  it('keeps external images and local root deployments unchanged', () => {
    expect(resolvePublicAssetUrl('https://example.com/plant.jpg', '/GreenNest/'))
      .toBe('https://example.com/plant.jpg');
    expect(resolvePublicAssetUrl('/images/plants/plant.jpg', '/'))
      .toBe('/images/plants/plant.jpg');
  });
});
