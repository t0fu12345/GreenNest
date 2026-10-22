/**
 * Intelligent botanical search & relevance scoring utility
 * 
 * Prevents common search anomalies:
 * 1. Searching short letters (e.g., 'o') no longer matches all plants through metadata
 *    like '#Indoor', 'CANOPY-00x', or 'tropical'.
 * 2. Words in Common Name and Botanical/Scientific Name receive the highest priority.
 * 3. Exact prefix matches appear before substring matches.
 * 4. Tag searches can be explicitly triggered via #tag (e.g. #indoor, #shade) or matching keywords (length >= 3).
 */

export function scorePlant(plant, rawQuery) {
  if (!plant || !rawQuery) return 0;
  const q = rawQuery.trim().toLowerCase();
  if (!q) return 0;

  const isTagQuery = q.startsWith('#');
  const cleanQ = isTagQuery ? q.slice(1).trim() : q;
  if (!cleanQ) return 0;

  const name = (plant.name || '').toLowerCase();
  const sci = (plant.scientificName || plant.botanicalName || '').toLowerCase();
  const code = (plant.catalogCode || plant.specimenId || '').toLowerCase();
  const category = (plant.category || '').toLowerCase();
  const biome = (plant.biome || '').toLowerCase();
  const tags = (plant.tags || []).map(t => t.toLowerCase().replace(/^#/, ''));

  // 1. Explicit tag search (#indoor, #succulent, etc.)
  if (isTagQuery) {
    let tagScore = 0;
    tags.forEach(t => {
      if (t === cleanQ) tagScore += 100;
      else if (t.startsWith(cleanQ)) tagScore += 60;
      else if (cleanQ.length >= 3 && t.includes(cleanQ)) tagScore += 30;
    });
    return tagScore;
  }

  let score = 0;

  // 2. Common Name Matching (Primary)
  if (name === q) {
    score += 200; // Exact match
  } else if (name.startsWith(q)) {
    score += 150; // Starts with query
  } else {
    // Check if any individual word starts with query, e.g. "Plant", "Fig", "Monstera", "Orbifolia"
    const words = name.split(/[\s\-()]+/);
    if (words.some(w => w.startsWith(q))) {
      score += 110;
    } else if (name.includes(q)) {
      score += 60;
    }
  }

  // 3. Botanical / Scientific Name Matching (Primary)
  if (sci === q) {
    score += 180;
  } else if (sci.startsWith(q)) {
    score += 140;
  } else {
    const sciWords = sci.split(/[\s\-()]+/);
    if (sciWords.some(w => w.startsWith(q))) {
      score += 100;
    } else if (sci.includes(q)) {
      score += 50;
    }
  }

  // 4. Catalog Code: ONLY match if code starts with query, or if query is numeric digits (e.g. "002" in "CANOPY-002")
  if (code === q || code.startsWith(q)) {
    score += 100;
  } else if (/^\d+$/.test(q) && code.includes(q)) {
    score += 70;
  }

  // 5. Category & Biome: ONLY if query is 3+ chars AND begins with query (e.g. "trop" -> "tropical")
  if (q.length >= 3) {
    if (category === q) score += 40;
    else if (category.startsWith(q)) score += 20;

    if (biome === q) score += 40;
    else if (biome.startsWith(q)) score += 20;

    // Tags matching (only if q >= 3, and tag equals or starts with q)
    tags.forEach(t => {
      if (t === q) score += 35;
      else if (t.startsWith(q)) score += 20;
    });
  }

  return score;
}

/**
 * Filter and rank plants by relevance score
 */
export function filterAndRankPlants(plants, query, maxResults = null) {
  if (!query || !query.trim()) {
    return {
      results: typeof maxResults === 'number' ? plants.slice(0, maxResults) : plants,
      totalMatches: plants.length
    };
  }

  const scored = plants
    .map(plant => ({
      plant,
      score: scorePlant(plant, query)
    }))
    .filter(item => item.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return (a.plant.name || '').localeCompare(b.plant.name || '');
    })
    .map(item => item.plant);

  return {
    results: typeof maxResults === 'number' ? scored.slice(0, maxResults) : scored,
    totalMatches: scored.length
  };
}
