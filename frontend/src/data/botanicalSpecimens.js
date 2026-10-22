// Comprehensive Botanical Specimens Seed Data from MongoDB Dataset
// Contains all 20 standardized botanical specimens + 4 seasonal curated collections + DB seed users

export const PLANT_COLLECTIONS = [
  {
    "slug": "spring-collection",
    "seasonKey": "spring",
    "season": "spring",
    "name": "Spring Awakening Collection",
    "title": "Spring Awakening Collection",
    "description": "The golden period for propagation and fresh growth. Living specimens sprout vibrant new shoots and enter their peak active cycle.",
    "plantSlugs": [
      "monstera-deliciosa",
      "sansevieria-trifasciata",
      "ficus-lyrata",
      "calathea-orbifolia",
      "lavandula-angustifolia"
    ],
    "plantSpecimenIds": [
      "specimen-monstera",
      "specimen-snake-plant",
      "specimen-ficus-lyrata",
      "specimen-calathea",
      "specimen-lavender"
    ],
    "image": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1200&q=80",
    "coverImage": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "status": "published"
  },
  {
    "slug": "summer-collection",
    "seasonKey": "summer",
    "season": "summer",
    "name": "Summer Canopy Collection",
    "title": "Summer Canopy Collection",
    "description": "Vibrant sunlit vitality with abundant ambient light, ideal for tropical jungle cultivars to unfurl their largest dramatic foliage.",
    "plantSlugs": [
      "monstera-deliciosa",
      "sansevieria-trifasciata",
      "ficus-lyrata",
      "calathea-orbifolia",
      "lavandula-angustifolia"
    ],
    "plantSpecimenIds": [
      "specimen-monstera",
      "specimen-snake-plant",
      "specimen-ficus-lyrata",
      "specimen-calathea",
      "specimen-lavender"
    ],
    "image": "https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?auto=format&fit=crop&w=1200&q=80",
    "coverImage": "https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "status": "published"
  },
  {
    "slug": "autumn-collection",
    "seasonKey": "autumn",
    "season": "autumn",
    "name": "Autumn Serenity Collection",
    "title": "Autumn Serenity Collection",
    "description": "Temperate, mild weather. The ideal time to introduce moisture-loving and subtropical forest foliage into your living sanctuary.",
    "plantSlugs": [
      "sansevieria-trifasciata",
      "calathea-orbifolia"
    ],
    "plantSpecimenIds": [
      "specimen-snake-plant",
      "specimen-calathea"
    ],
    "image": "https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=1200&q=80",
    "coverImage": "https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "status": "published"
  },
  {
    "slug": "winter-collection",
    "seasonKey": "winter",
    "season": "winter",
    "name": "Winter Resilience Collection",
    "title": "Winter Resilience Collection",
    "description": "Curated cold-hardy, drought-tolerant specimens that maintain lush vitality and clean indoor air throughout low-sunlight months.",
    "plantSlugs": [
      "sansevieria-trifasciata"
    ],
    "plantSpecimenIds": [
      "specimen-snake-plant"
    ],
    "image": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
    "coverImage": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
    "isFeatured": true,
    "status": "published"
  }
];

export const BOTANICAL_SPECIMENS = {
  "dwarf-umbrella-plant": {
    "id": "dwarf-umbrella-plant",
    "slug": "dwarf-umbrella-plant",
    "catalogCode": "CANOPY-001",
    "name": "Dwarf Umbrella Plant",
    "scientificName": "Heptapleurum arboricola (Hayata) Merr.",
    "category": "Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/dwarf-umbrella-plant.avif",
    "images": [
      {
        "url": "/images/plants/dwarf-umbrella-plant.avif",
        "alt": "Dwarf Umbrella Plant",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Schefflera",
      "#GlossyFoliage",
      "#IndoorPlant",
      "#EasyCare",
      "#PetToxic",
      "#Foliage"
    ],
    "taxonomyTags": [
      "Araliaceae",
      "Heptapleurum",
      "Apiales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Compact evergreen foliage plant with glossy leaflets arranged like the spokes of an umbrella.",
    "description": "Dwarf Umbrella Plant is a tropical evergreen shrub commonly grown indoors for its glossy, palmately arranged leaflets and adaptable growth habit. Give it bright indirect light, a well-draining potting mix, and allow the upper soil to dry slightly between waterings.",
    "origin": "Taiwan and Hainan, China.",
    "purpose": "Adds structured evergreen foliage to indoor spaces and sheltered patios.",
    "water": "Water thoroughly when the top 2–5 cm of soil has dried; reduce watering in cooler, darker conditions.",
    "light": "Bright indirect light; tolerates medium light. Avoid prolonged harsh afternoon sun indoors.",
    "soil": "Well-draining indoor potting mix amended with perlite or fine bark.",
    "humidity": "40% – 70%",
    "temp": "18°C – 27°C",
    "growth": "Moderate to Fast Growing",
    "careLevel": "Easy",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water when top soil dries",
    "waterStatus": "Check Soil",
    "notifMsg": "Dwarf Umbrella Plant is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "55%",
    "waterSub": "Watering depends on the moisture of the upper potting mix.",
    "waterVol": "Moderate",
    "waterFreq": "Usually every 1-2 weeks indoors",
    "humidityVal": "50% RH",
    "humidityBar": "65%",
    "humiditySub": "Average indoor humidity is often tolerated.",
    "humidityTarget": "40% – 70% RH",
    "mistCadence": "Misting is optional; prioritize good airflow",
    "envVal": "1,500 FC",
    "envBar": "75%",
    "envSub": "Bright, indirect illumination is suitable.",
    "tempRange": "18°C - 27°C",
    "soilVal": "Well-Draining Mix",
    "soilBar": "85%",
    "soilSub": "Loose potting mix that drains freely",
    "seasons": [],
    "lightRequirement": "Bright indirect light; tolerates medium light. Avoid prolonged harsh afternoon sun indoors.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "swiss-cheese-plant": {
    "id": "swiss-cheese-plant",
    "slug": "swiss-cheese-plant",
    "catalogCode": "CANOPY-002",
    "name": "Swiss Cheese Plant",
    "scientificName": "Monstera deliciosa Liebm.",
    "category": "Aroid",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/swiss-cheese-plant.avif",
    "images": [
      {
        "url": "/images/plants/swiss-cheese-plant.avif",
        "alt": "Swiss Cheese Plant",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Araceae",
      "#FenestratedLeaves",
      "#TropicalFoliage",
      "#ClimbingPlant",
      "#PetToxic",
      "#Aroid"
    ],
    "taxonomyTags": [
      "Araceae",
      "Monstera",
      "Alismatales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY TO MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Iconic climbing aroid with broad green leaves that develop distinctive natural splits and holes.",
    "description": "Swiss Cheese Plant is an evergreen climbing vine native to tropical forests of Central America. It uses aerial roots to climb and develops fenestrated leaves as it matures. Provide a sturdy support, bright filtered light, and a chunky, airy substrate.",
    "origin": "Tropical forests of southern Mexico and Central America.",
    "purpose": "Creates a bold tropical focal point and adds sculptural foliage to interiors.",
    "water": "Water thoroughly when the top few centimetres of the mix have dried; empty excess water from the saucer.",
    "light": "Bright indirect light; avoid strong, prolonged direct midday sun.",
    "soil": "Chunky aroid mix with bark, perlite or pumice, and coco coir.",
    "humidity": "50% – 80%",
    "temp": "18°C – 30°C",
    "growth": "Fast Growing",
    "careLevel": "Easy to Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water when upper mix dries",
    "waterStatus": "Check Soil",
    "notifMsg": "Swiss Cheese Plant is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "65%",
    "waterSub": "Allow partial drying between thorough waterings.",
    "waterVol": "Moderate",
    "waterFreq": "Often every 1-2 weeks indoors",
    "humidityVal": "60% RH",
    "humidityBar": "75%",
    "humiditySub": "Moderate to higher humidity supports healthy foliage.",
    "humidityTarget": "50% – 80% RH",
    "mistCadence": "Wipe leaves and maintain airflow; misting is optional",
    "envVal": "1,600 FC",
    "envBar": "80%",
    "envSub": "Bright filtered light supports mature leaf development.",
    "tempRange": "18°C - 30°C",
    "soilVal": "Chunky Aroid Mix",
    "soilBar": "90%",
    "soilSub": "Airy substrate with good drainage",
    "seasons": [],
    "lightRequirement": "Bright indirect light; avoid strong, prolonged direct midday sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "peace-lily-plant": {
    "id": "peace-lily-plant",
    "slug": "peace-lily-plant",
    "catalogCode": "CANOPY-003",
    "name": "Peace Lily Plant",
    "scientificName": "Spathiphyllum wallisii Regel",
    "category": "Flowering Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/peace-lily-plant.avif",
    "images": [
      {
        "url": "/images/plants/peace-lily-plant.avif",
        "alt": "Peace Lily Plant",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Spathiphyllum",
      "#WhiteFlowers",
      "#ShadeTolerant",
      "#IndoorPlant",
      "#PetToxic",
      "#Flowering Foliage"
    ],
    "taxonomyTags": [
      "Araceae",
      "Spathiphyllum",
      "Alismatales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY TO MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Shade-tolerant tropical foliage plant known for glossy leaves and elegant white spathes.",
    "description": "Peace Lily is a tropical herbaceous plant that grows on the shaded forest floor. Its white flower-like structures are spathes surrounding a central spadix. It prefers indirect light, evenly moist but not waterlogged soil, and protection from cold drafts.",
    "origin": "Tropical regions of the Americas; commonly cultivated varieties have complex horticultural histories.",
    "purpose": "Provides lush indoor foliage and distinctive white flowering displays.",
    "water": "Water when the top 2–3 cm of soil begins to dry; do not leave roots standing in water.",
    "light": "Low to bright indirect light; brighter indirect light generally encourages flowering.",
    "soil": "Moisture-retentive but well-draining indoor potting mix with organic matter and perlite.",
    "humidity": "50% – 70%",
    "temp": "18°C – 27°C",
    "growth": "Moderate Growing",
    "careLevel": "Easy to Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Keep lightly and evenly moist",
    "waterStatus": "Check Soil",
    "notifMsg": "Peace Lily Plant is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moist",
    "waterBar": "70%",
    "waterSub": "Avoid both prolonged dryness and waterlogged roots.",
    "waterVol": "Moist",
    "waterFreq": "Often weekly, adjusted to conditions",
    "humidityVal": "55% RH",
    "humidityBar": "70%",
    "humiditySub": "Average to moderately humid air is suitable.",
    "humidityTarget": "50% – 70% RH",
    "mistCadence": "Optional; avoid leaving foliage constantly wet",
    "envVal": "900 FC",
    "envBar": "60%",
    "envSub": "Filtered or moderate indirect light is preferred.",
    "tempRange": "18°C - 27°C",
    "soilVal": "Moisture-Retentive Mix",
    "soilBar": "85%",
    "soilSub": "Organic mix that drains without staying saturated",
    "seasons": [],
    "lightRequirement": "Low to bright indirect light; brighter indirect light generally encourages flowering.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "snake-plant": {
    "id": "snake-plant",
    "slug": "snake-plant",
    "catalogCode": "CANOPY-004",
    "name": "Snake Plant",
    "scientificName": "Dracaena trifasciata (Prain) Mabb.",
    "category": "Succulent Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/snake-plant.avif",
    "images": [
      {
        "url": "/images/plants/snake-plant.avif",
        "alt": "Snake Plant",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Dracaena",
      "#DroughtTolerant",
      "#ArchitecturalFoliage",
      "#LowMaintenance",
      "#PetToxic",
      "#Succulent Foliage"
    ],
    "taxonomyTags": [
      "Asparagaceae",
      "Dracaena",
      "Asparagales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Architectural, drought-tolerant plant with upright sword-shaped leaves and mottled green markings.",
    "description": "Snake Plant is an evergreen, rhizomatous species valued for its upright, tough leaves and tolerance of dry indoor conditions. It is best kept in a draining pot and watered sparingly, since persistently wet soil can cause root rot.",
    "origin": "West Africa, especially tropical regions from Nigeria eastward.",
    "purpose": "Adds vertical structure to interiors and suits low-maintenance planting schemes.",
    "water": "Let the potting mix dry out completely or nearly completely before watering thoroughly.",
    "light": "Low to bright indirect light; growth is generally stronger in brighter indirect light.",
    "soil": "Fast-draining succulent or cactus mix with added pumice or perlite.",
    "humidity": "30% – 60%",
    "temp": "18°C – 30°C",
    "growth": "Slow to Moderate Growing",
    "careLevel": "Easy",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water after mix dries",
    "waterStatus": "Allow Drying",
    "notifMsg": "Snake Plant is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Low",
    "waterBar": "30%",
    "waterSub": "This drought-tolerant plant is sensitive to overwatering.",
    "waterVol": "Low",
    "waterFreq": "Every 2-4 weeks or as soil dries",
    "humidityVal": "40% RH",
    "humidityBar": "55%",
    "humiditySub": "Typical indoor humidity is usually acceptable.",
    "humidityTarget": "30% – 60% RH",
    "mistCadence": "No misting needed",
    "envVal": "1,200 FC",
    "envBar": "65%",
    "envSub": "Adaptable to a range of indoor light levels.",
    "tempRange": "18°C - 30°C",
    "soilVal": "Succulent Mix",
    "soilBar": "95%",
    "soilSub": "Very free-draining substrate is important",
    "seasons": [],
    "lightRequirement": "Low to bright indirect light; growth is generally stronger in brighter indirect light.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "heart-of-jesus": {
    "id": "heart-of-jesus",
    "slug": "heart-of-jesus",
    "catalogCode": "CANOPY-005",
    "name": "Heart of Jesus",
    "scientificName": "Caladium bicolor (Aiton) Vent.",
    "category": "Ornamental Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/heart-of-jesus.avif",
    "images": [
      {
        "url": "/images/plants/heart-of-jesus.avif",
        "alt": "Heart of Jesus",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Caladium",
      "#ColorfulFoliage",
      "#HeartShapedLeaves",
      "#TropicalPlant",
      "#PetToxic",
      "#Ornamental Foliage"
    ],
    "taxonomyTags": [
      "Araceae",
      "Caladium",
      "Alismatales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Colorful tuberous ornamental with heart-shaped leaves patterned in vivid pink, red, white, and green.",
    "description": "Heart of Jesus is a common name used for Caladiums, tropical tuberous plants grown for their striking, thin, heart-shaped leaves. They thrive in warm conditions and filtered light during active growth and may enter dormancy in cooler or drier seasons.",
    "origin": "Tropical South America, especially the Amazon region; cultivated forms are widely hybridized.",
    "purpose": "Adds vivid color and patterned foliage to shaded gardens and warm interiors.",
    "water": "Keep soil lightly and evenly moist during active growth, but never waterlogged; reduce watering during dormancy.",
    "light": "Bright filtered light or partial shade; protect leaves from harsh direct sun.",
    "soil": "Rich, loose, well-draining potting mix with organic matter.",
    "humidity": "60% – 80%",
    "temp": "21°C – 30°C",
    "growth": "Moderate Growing",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Maintain light moisture in active growth",
    "waterStatus": "Active Growth",
    "notifMsg": "Heart of Jesus is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moist",
    "waterBar": "70%",
    "waterSub": "Moisture needs decrease when the plant is dormant.",
    "waterVol": "Moist",
    "waterFreq": "Check soil frequently in warm weather",
    "humidityVal": "65% RH",
    "humidityBar": "80%",
    "humiditySub": "Warm, humid conditions support active foliage.",
    "humidityTarget": "60% – 80% RH",
    "mistCadence": "Increase ambient humidity rather than keeping leaves wet",
    "envVal": "1,200 FC",
    "envBar": "70%",
    "envSub": "Filtered light helps protect delicate leaves.",
    "tempRange": "21°C - 30°C",
    "soilVal": "Rich Potting Mix",
    "soilBar": "85%",
    "soilSub": "Moist but well-draining soil",
    "seasons": [],
    "lightRequirement": "Bright filtered light or partial shade; protect leaves from harsh direct sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "ajuga": {
    "id": "ajuga",
    "slug": "ajuga",
    "catalogCode": "CANOPY-006",
    "name": "Ajuga",
    "scientificName": "Ajuga reptans L.",
    "category": "Groundcover",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/ajuga.webp",
    "images": [
      {
        "url": "/images/plants/ajuga.webp",
        "alt": "Ajuga",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Ajuga",
      "#Groundcover",
      "#PurpleFlowers",
      "#Perennial",
      "#GardenPlant"
    ],
    "taxonomyTags": [
      "Lamiaceae",
      "Ajuga",
      "Lamiales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Low-growing groundcover that spreads by runners and produces short spikes of blue-purple flowers.",
    "description": "Ajuga, often called bugleweed, is a mat-forming perennial used to cover soil in partly shaded gardens. It spreads by stolons and can form dense patches; provide reasonably moist, well-drained soil and allow room for its spreading habit.",
    "origin": "Europe, North Africa, and parts of western Asia.",
    "purpose": "Covers bare soil, softens garden borders, and provides flowers for pollinators.",
    "water": "Water after the surface begins to dry during establishment; established plants tolerate some short dry periods.",
    "light": "Partial shade to full sun in cooler climates; afternoon shade is helpful in hot conditions.",
    "soil": "Average, humus-rich soil with good drainage.",
    "humidity": "40% – 70%",
    "temp": "10°C – 25°C",
    "growth": "Fast Spreading",
    "careLevel": "Easy",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Moderate moisture while establishing",
    "waterStatus": "Check Soil",
    "notifMsg": "Ajuga is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "55%",
    "waterSub": "Avoid waterlogged soil, especially in shade.",
    "waterVol": "Moderate",
    "waterFreq": "Water during dry spells",
    "humidityVal": "55% RH",
    "humidityBar": "65%",
    "humiditySub": "Outdoor ambient humidity is generally adequate.",
    "humidityTarget": "40% – 70% RH",
    "mistCadence": "No misting needed",
    "envVal": "2,000 FC",
    "envBar": "75%",
    "envSub": "Partial shade supports healthy groundcover growth.",
    "tempRange": "10°C - 25°C",
    "soilVal": "Humus-Rich Soil",
    "soilBar": "85%",
    "soilSub": "Moist, well-drained garden soil",
    "seasons": [],
    "lightRequirement": "Partial shade to full sun in cooler climates; afternoon shade is helpful in hot conditions.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "caladium": {
    "id": "caladium",
    "slug": "caladium",
    "catalogCode": "CANOPY-007",
    "name": "Caladium",
    "scientificName": "Caladium bicolor (Aiton) Vent.",
    "category": "Ornamental Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/caladium.webp",
    "images": [
      {
        "url": "/images/plants/caladium.webp",
        "alt": "Caladium",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Caladium",
      "#PatternedLeaves",
      "#TropicalFoliage",
      "#ShadeGarden",
      "#PetToxic",
      "#Ornamental Foliage"
    ],
    "taxonomyTags": [
      "Araceae",
      "Caladium",
      "Alismatales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Tropical tuberous plant prized for colorful, paper-thin leaves with contrasting veins and patterns.",
    "description": "Caladiums are grown mainly for ornamental foliage in warm, humid conditions. Their leaves vary widely by cultivar and may feature combinations of green, white, pink, and red. They grow actively in warmth and may go dormant when conditions become cool or dry.",
    "origin": "Tropical South America, especially the Amazon basin.",
    "purpose": "Provides seasonal color in shaded beds, containers, and protected tropical displays.",
    "water": "Keep evenly moist while actively growing and reduce watering as leaves die back during dormancy.",
    "light": "Filtered light or partial shade; some cultivars tolerate gentle morning sun.",
    "soil": "Loose, organic-rich, well-draining mix.",
    "humidity": "60% – 80%",
    "temp": "21°C – 30°C",
    "growth": "Moderate Growing",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Even moisture during active growth",
    "waterStatus": "Active Growth",
    "notifMsg": "Caladium is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moist",
    "waterBar": "72%",
    "waterSub": "Avoid saturated soil and adjust care during dormancy.",
    "waterVol": "Moist",
    "waterFreq": "Check soil every few days in warm weather",
    "humidityVal": "65% RH",
    "humidityBar": "80%",
    "humiditySub": "Higher humidity supports active foliage.",
    "humidityTarget": "60% – 80% RH",
    "mistCadence": "Prefer room humidity and airflow over frequent leaf misting",
    "envVal": "1,200 FC",
    "envBar": "70%",
    "envSub": "Filtered light helps preserve leaf color.",
    "tempRange": "21°C - 30°C",
    "soilVal": "Organic Potting Mix",
    "soilBar": "85%",
    "soilSub": "Rich, airy substrate with drainage",
    "seasons": [],
    "lightRequirement": "Filtered light or partial shade; some cultivars tolerate gentle morning sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "persian-shield": {
    "id": "persian-shield",
    "slug": "persian-shield",
    "catalogCode": "CANOPY-008",
    "name": "Persian Shield",
    "scientificName": "Strobilanthes dyerianus Mast.",
    "category": "Ornamental Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/persian-shield.webp",
    "images": [
      {
        "url": "/images/plants/persian-shield.webp",
        "alt": "Persian Shield",
        "isPrimary": true
      }
    ],
    "tags": [
      "#PersianShield",
      "#PurpleFoliage",
      "#MetallicLeaves",
      "#TropicalPlant",
      "#ColorfulFoliage",
      "#Ornamental Foliage"
    ],
    "taxonomyTags": [
      "Acanthaceae",
      "Strobilanthes",
      "Lamiales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Striking foliage plant with iridescent purple leaves and metallic green-silver markings.",
    "description": "Persian Shield is a tropical subshrub grown for its vivid metallic foliage. Warmth, humidity, and bright filtered light help maintain rich color. Pinching the growing tips encourages a fuller shape, and the plant benefits from evenly moist, well-drained soil.",
    "origin": "Myanmar (formerly Burma).",
    "purpose": "Adds dramatic purple and metallic tones to tropical borders and container displays.",
    "water": "Keep soil evenly moist but not saturated; water when the surface begins to dry.",
    "light": "Bright indirect light or partial shade; gentle morning sun may be tolerated.",
    "soil": "Rich, moisture-retentive potting mix with good drainage.",
    "humidity": "50% – 75%",
    "temp": "18°C – 29°C",
    "growth": "Fast Growing in Warm Conditions",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Keep lightly and evenly moist",
    "waterStatus": "Check Soil",
    "notifMsg": "Persian Shield is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "68%",
    "waterSub": "Avoid allowing the root ball to dry out completely for long periods.",
    "waterVol": "Moderate",
    "waterFreq": "Check every few days in warm weather",
    "humidityVal": "60% RH",
    "humidityBar": "75%",
    "humiditySub": "Moderate to higher humidity supports leaf quality.",
    "humidityTarget": "50% – 75% RH",
    "mistCadence": "Optional; improve ambient humidity and airflow",
    "envVal": "1,500 FC",
    "envBar": "75%",
    "envSub": "Bright filtered light helps maintain leaf color.",
    "tempRange": "18°C - 29°C",
    "soilVal": "Rich Well-Drained Mix",
    "soilBar": "85%",
    "soilSub": "Organic substrate that holds some moisture but drains freely",
    "seasons": [],
    "lightRequirement": "Bright indirect light or partial shade; gentle morning sun may be tolerated.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "oakleaf-hydrangea": {
    "id": "oakleaf-hydrangea",
    "slug": "oakleaf-hydrangea",
    "catalogCode": "CANOPY-009",
    "name": "Oakleaf Hydrangea",
    "scientificName": "Hydrangea quercifolia W. Bartram",
    "category": "Flowering Shrub",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/oakleaf-hydrangea.webp",
    "images": [
      {
        "url": "/images/plants/oakleaf-hydrangea.webp",
        "alt": "Oakleaf Hydrangea",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Hydrangea",
      "#FloweringShrub",
      "#AutumnColor",
      "#WoodlandGarden",
      "#PetToxic",
      "#Flowering Shrub"
    ],
    "taxonomyTags": [
      "Hydrangeaceae",
      "Hydrangea",
      "Cornales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Deciduous shrub with oak-shaped leaves, cone-shaped flower clusters, and rich autumn foliage.",
    "description": "Oakleaf Hydrangea is a deciduous shrub native to the southeastern United States. It produces elongated clusters of white flowers and deeply lobed leaves that can turn bronze, red, or purple in autumn. It performs well in part shade and organically enriched, well-drained soil.",
    "origin": "Southeastern United States.",
    "purpose": "Provides seasonal flowers, textured foliage, autumn color, and habitat value in gardens.",
    "water": "Water deeply during establishment and dry periods; keep soil moderately moist but not waterlogged.",
    "light": "Partial shade is ideal; tolerates morning sun with afternoon shade.",
    "soil": "Organic-rich, well-drained soil; mulch to conserve moisture.",
    "humidity": "40% – 70%",
    "temp": "10°C – 27°C",
    "growth": "Moderate Growing",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Deep water during dry periods",
    "waterStatus": "Check Soil",
    "notifMsg": "Oakleaf Hydrangea is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "60%",
    "waterSub": "Established shrubs need extra water during prolonged drought.",
    "waterVol": "Moderate",
    "waterFreq": "As needed based on rainfall and soil moisture",
    "humidityVal": "55% RH",
    "humidityBar": "65%",
    "humiditySub": "Outdoor ambient humidity is usually adequate.",
    "humidityTarget": "40% – 70% RH",
    "mistCadence": "No misting needed",
    "envVal": "2,500 FC",
    "envBar": "75%",
    "envSub": "Partial shade protects foliage in hot climates.",
    "tempRange": "10°C - 27°C",
    "soilVal": "Organic Garden Soil",
    "soilBar": "85%",
    "soilSub": "Well-drained soil with organic matter",
    "seasons": [],
    "lightRequirement": "Partial shade is ideal; tolerates morning sun with afternoon shade.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "agave": {
    "id": "agave",
    "slug": "agave",
    "catalogCode": "CANOPY-010",
    "name": "Agave",
    "scientificName": "Agave spp.",
    "category": "Succulent",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/agave.webp",
    "images": [
      {
        "url": "/images/plants/agave.webp",
        "alt": "Agave",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Agave",
      "#Succulent",
      "#DroughtTolerant",
      "#Xeriscape",
      "#ArchitecturalPlant"
    ],
    "taxonomyTags": [
      "Asparagaceae",
      "Agave",
      "Asparagales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Sculptural succulent forming bold rosettes of thick, often pointed leaves adapted to dry conditions.",
    "description": "Agave is a genus of drought-adapted succulents with substantial variation among species. Most require abundant light, very free-draining soil, and infrequent watering. Because leaf tips and margins may be sharp, choose a placement that avoids accidental contact.",
    "origin": "Primarily Mexico and the southwestern United States, with species extending into Central America and the Caribbean.",
    "purpose": "Creates architectural focal points in xeriscapes, rock gardens, and sunny containers.",
    "water": "Water deeply, then let the substrate dry completely before watering again; water less in cool weather.",
    "light": "Full sun to very bright light; acclimate plants gradually when moving into stronger sun.",
    "soil": "Very fast-draining cactus mix with pumice, grit, or coarse mineral material.",
    "humidity": "20% – 50%",
    "temp": "15°C – 35°C",
    "growth": "Slow Growing",
    "careLevel": "Easy",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water only after substrate dries",
    "waterStatus": "Allow Drying",
    "notifMsg": "Agave is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Low",
    "waterBar": "25%",
    "waterSub": "Frequent watering can cause root rot.",
    "waterVol": "Low",
    "waterFreq": "Every 2-4 weeks or less, depending on climate and species",
    "humidityVal": "35% RH",
    "humidityBar": "50%",
    "humiditySub": "Dry to average air is usually suitable.",
    "humidityTarget": "20% – 50% RH",
    "mistCadence": "No misting needed",
    "envVal": "4,000 FC",
    "envBar": "95%",
    "envSub": "High light is generally preferred after acclimation.",
    "tempRange": "15°C - 35°C",
    "soilVal": "Mineral Succulent Mix",
    "soilBar": "95%",
    "soilSub": "Fast drainage is essential",
    "seasons": [],
    "lightRequirement": "Full sun to very bright light; acclimate plants gradually when moving into stronger sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "desert-rose": {
    "id": "desert-rose",
    "slug": "desert-rose",
    "catalogCode": "CANOPY-011",
    "name": "Desert Rose",
    "scientificName": "Adenium obesum (Forssk.) Roem. & Schult.",
    "category": "Flowering Succulent",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/desert-rose.webp",
    "images": [
      {
        "url": "/images/plants/desert-rose.webp",
        "alt": "Desert Rose",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Adenium",
      "#FloweringSucculent",
      "#Caudex",
      "#FullSun",
      "#ToxicPlant",
      "#Flowering Succulent"
    ],
    "taxonomyTags": [
      "Apocynaceae",
      "Adenium",
      "Gentianales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Sculptural succulent shrub with a swollen stem base and showy trumpet-shaped flowers.",
    "description": "Desert Rose is a drought-adapted succulent shrub grown for its distinctive swollen caudex and colorful flowers. It needs strong light, warm conditions, and a very free-draining mix. Its milky sap is toxic, so pruning and handling should be done carefully.",
    "origin": "Arid and semi-arid regions of eastern Africa and the Arabian Peninsula.",
    "purpose": "Provides a dramatic flowering specimen for sunny patios and warm-climate container gardens.",
    "water": "Water thoroughly during active growth, then allow the mix to dry fully; reduce watering in cool or dormant periods.",
    "light": "Full sun to very bright light; provide several hours of direct sun where climate allows.",
    "soil": "Fast-draining succulent mix with coarse mineral amendments.",
    "humidity": "30% – 60%",
    "temp": "20°C – 35°C",
    "growth": "Slow to Moderate Growing",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Deep water then allow full drying",
    "waterStatus": "Allow Drying",
    "notifMsg": "Desert Rose is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Low to Moderate",
    "waterBar": "30%",
    "waterSub": "Avoid prolonged wet soil, especially in cool weather.",
    "waterVol": "Low to Moderate",
    "waterFreq": "Varies with warmth, light, and dormancy",
    "humidityVal": "45% RH",
    "humidityBar": "60%",
    "humiditySub": "Average to relatively dry air is tolerated.",
    "humidityTarget": "30% – 60% RH",
    "mistCadence": "No misting needed",
    "envVal": "4,000 FC",
    "envBar": "95%",
    "envSub": "Strong light supports compact growth and flowering.",
    "tempRange": "20°C - 35°C",
    "soilVal": "Succulent Mix",
    "soilBar": "95%",
    "soilSub": "Rapid drainage protects the roots and caudex",
    "seasons": [],
    "lightRequirement": "Full sun to very bright light; provide several hours of direct sun where climate allows.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "begonia": {
    "id": "begonia",
    "slug": "begonia",
    "catalogCode": "CANOPY-012",
    "name": "Begonia",
    "scientificName": "Begonia spp.",
    "category": "Ornamental Foliage and Flowers",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/begonia.webp",
    "images": [
      {
        "url": "/images/plants/begonia.webp",
        "alt": "Begonia",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Begonia",
      "#OrnamentalFoliage",
      "#FloweringPlant",
      "#FilteredLight",
      "#PetToxic",
      "#Ornamental Foliage and Flowers"
    ],
    "taxonomyTags": [
      "Begoniaceae",
      "Begonia",
      "Cucurbitales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Diverse ornamental genus known for decorative leaves and, in many types, colorful flowers.",
    "description": "Begonia is a large genus with many growth forms, including fibrous-rooted, rhizomatous, and tuberous species. Care varies by type, but many cultivated begonias prefer bright filtered light, airflow, and a well-drained mix that is allowed to dry slightly at the surface.",
    "origin": "Tropical and subtropical regions of the Americas, Africa, and Asia, depending on species.",
    "purpose": "Adds ornamental foliage or seasonal blooms to indoor collections and sheltered gardens.",
    "water": "Water when the upper layer of soil begins to dry; avoid waterlogging and prolonged wet foliage.",
    "light": "Bright indirect light or partial shade; protect most types from harsh midday sun.",
    "soil": "Light, airy, well-draining mix with organic matter.",
    "humidity": "45% – 70%",
    "temp": "18°C – 26°C",
    "growth": "Variable by Species",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water after surface begins to dry",
    "waterStatus": "Check Soil",
    "notifMsg": "Begonia is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "58%",
    "waterSub": "Water needs vary considerably among begonia types.",
    "waterVol": "Moderate",
    "waterFreq": "Check soil every few days",
    "humidityVal": "55% RH",
    "humidityBar": "70%",
    "humiditySub": "Moderate humidity and airflow help reduce disease risk.",
    "humidityTarget": "45% – 70% RH",
    "mistCadence": "Avoid frequent direct misting; provide gentle airflow",
    "envVal": "1,300 FC",
    "envBar": "70%",
    "envSub": "Filtered light suits many common cultivated begonias.",
    "tempRange": "18°C - 26°C",
    "soilVal": "Light Potting Mix",
    "soilBar": "85%",
    "soilSub": "Airy mix that drains freely",
    "seasons": [],
    "lightRequirement": "Bright indirect light or partial shade; protect most types from harsh midday sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "armeria": {
    "id": "armeria",
    "slug": "armeria",
    "catalogCode": "CANOPY-013",
    "name": "Armeria",
    "scientificName": "Armeria maritima (Mill.) Willd.",
    "category": "Flowering Perennial",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/armeria.webp",
    "images": [
      {
        "url": "/images/plants/armeria.webp",
        "alt": "Armeria",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Armeria",
      "#SeaThrift",
      "#RockGarden",
      "#FullSun",
      "#Perennial",
      "#Flowering Perennial"
    ],
    "taxonomyTags": [
      "Plumbaginaceae",
      "Armeria",
      "Caryophyllales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Compact clump-forming perennial with grass-like leaves and rounded clusters of pink or white flowers.",
    "description": "Armeria, often known as sea thrift, is a compact perennial adapted to exposed coastal habitats. It grows best in sunny positions and sharply drained soil, and it is generally more tolerant of drought and wind than of heavy, persistently wet ground.",
    "origin": "Coastal regions of Europe and other temperate Northern Hemisphere locations, depending on species.",
    "purpose": "Works well in rock gardens, edging, coastal planting, and pollinator-friendly borders.",
    "water": "Water during establishment and extended dry periods; allow soil to dry somewhat between waterings.",
    "light": "Full sun.",
    "soil": "Sandy or gritty, sharply drained soil; avoid heavy waterlogged ground.",
    "humidity": "30% – 60%",
    "temp": "5°C – 24°C",
    "growth": "Slow to Moderate Growing",
    "careLevel": "Easy",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Low to moderate; avoid saturation",
    "waterStatus": "Well Drained",
    "notifMsg": "Armeria is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Low",
    "waterBar": "35%",
    "waterSub": "Wet roots are a greater risk than brief dryness.",
    "waterVol": "Low",
    "waterFreq": "Water during establishment and drought",
    "humidityVal": "45% RH",
    "humidityBar": "55%",
    "humiditySub": "Tolerates exposed outdoor conditions.",
    "humidityTarget": "30% – 60% RH",
    "mistCadence": "No misting needed",
    "envVal": "3,500 FC",
    "envBar": "95%",
    "envSub": "Full sun supports flowering and compact growth.",
    "tempRange": "5°C - 24°C",
    "soilVal": "Sandy Gritty Soil",
    "soilBar": "95%",
    "soilSub": "Excellent drainage is essential",
    "seasons": [],
    "lightRequirement": "Full sun.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "frangipani": {
    "id": "frangipani",
    "slug": "frangipani",
    "catalogCode": "CANOPY-014",
    "name": "Frangipani",
    "scientificName": "Plumeria rubra L.",
    "category": "Flowering Tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/frangipani.jpg",
    "images": [
      {
        "url": "/images/plants/frangipani.jpg",
        "alt": "Frangipani",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Plumeria",
      "#Frangipani",
      "#FragrantFlowers",
      "#TropicalTree",
      "#FullSun",
      "#Flowering Tree"
    ],
    "taxonomyTags": [
      "Apocynaceae",
      "Plumeria",
      "Gentianales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Small tropical tree prized for fragrant five-petaled flowers and thick, sculptural branches.",
    "description": "Frangipani is a deciduous or semi-evergreen tropical small tree with thick branches and fragrant flowers. It flowers best with abundant sun and warmth. The milky latex can irritate skin, and the plant should be grown in a draining medium with less water during cooler dormancy.",
    "origin": "Native to Mexico, Central America, and parts of the Caribbean; widely cultivated throughout tropical regions.",
    "purpose": "Provides fragrant flowers and a distinctive tropical form in gardens and containers.",
    "water": "Water thoroughly during active growth and allow the soil to dry partly between waterings; reduce in dormancy.",
    "light": "Full sun, ideally at least 6 hours of direct sunlight during the growing season.",
    "soil": "Well-draining sandy or loamy mix; containers need generous drainage.",
    "humidity": "40% – 70%",
    "temp": "20°C – 32°C",
    "growth": "Moderate Growing",
    "careLevel": "Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water in active growth, reduce in dormancy",
    "waterStatus": "Seasonal Care",
    "notifMsg": "Frangipani is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "50%",
    "waterSub": "Avoid wet soil when growth slows or temperatures drop.",
    "waterVol": "Moderate",
    "waterFreq": "As soil dries during active growth",
    "humidityVal": "55% RH",
    "humidityBar": "65%",
    "humiditySub": "Warm outdoor conditions are generally suitable.",
    "humidityTarget": "40% – 70% RH",
    "mistCadence": "No misting needed",
    "envVal": "4,000 FC",
    "envBar": "95%",
    "envSub": "Full sun supports flowering.",
    "tempRange": "20°C - 32°C",
    "soilVal": "Well-Draining Mix",
    "soilBar": "90%",
    "soilSub": "Drainage is important for thick, fleshy roots",
    "seasons": [],
    "lightRequirement": "Full sun, ideally at least 6 hours of direct sunlight during the growing season.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  },
  "english-ivy": {
    "id": "english-ivy",
    "slug": "english-ivy",
    "catalogCode": "CANOPY-015",
    "name": "English Ivy",
    "scientificName": "Hedera helix L.",
    "category": "Climbing Foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "/images/plants/english-ivy.jpg",
    "images": [
      {
        "url": "/images/plants/english-ivy.jpg",
        "alt": "English Ivy",
        "isPrimary": true
      }
    ],
    "tags": [
      "#HederaHelix",
      "#TrailingFoliage",
      "#ClimbingPlant",
      "#ShadeTolerant",
      "#PetToxic",
      "#Climbing Foliage"
    ],
    "taxonomyTags": [
      "Araliaceae",
      "Hedera",
      "Apiales",
      "Angiosperms",
      "Plantae"
    ],
    "traits": [
      "EASY TO MODERATE Maintenance",
      "Filtered Sunlight",
      "Perennial"
    ],
    "shortDesc": "Evergreen climbing or trailing vine with lobed leaves and strong attachment roots.",
    "description": "English Ivy is an evergreen climbing vine that can trail from containers or attach to surfaces with aerial rootlets. It tolerates shade but prefers cool to moderate conditions and a well-drained mix. Outdoors, it can become invasive in some regions, so local guidance should be checked before planting.",
    "origin": "Europe, western Asia, and parts of North Africa.",
    "purpose": "Provides trailing foliage for containers and vertical greenery where its growth can be managed.",
    "water": "Water when the top 2–3 cm of potting mix dries; avoid leaving roots in standing water.",
    "light": "Medium to bright indirect light indoors; outdoors, partial shade is often suitable.",
    "soil": "General-purpose potting mix with good drainage.",
    "humidity": "40% – 60%",
    "temp": "10°C – 24°C",
    "growth": "Fast Growing",
    "careLevel": "Easy to Moderate",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "Water when upper soil dries",
    "waterStatus": "Check Soil",
    "notifMsg": "English Ivy is maintaining optimal hydration and metabolic vitality.",
    "waterVal": "Moderate",
    "waterBar": "55%",
    "waterSub": "Keep evenly watered but avoid saturated roots.",
    "waterVol": "Moderate",
    "waterFreq": "Usually weekly, adjusted to temperature and light",
    "humidityVal": "50% RH",
    "humidityBar": "60%",
    "humiditySub": "Average indoor humidity is often acceptable.",
    "humidityTarget": "40% – 60% RH",
    "mistCadence": "Occasional leaf cleaning; maintain airflow",
    "envVal": "1,200 FC",
    "envBar": "65%",
    "envSub": "Tolerates shade; moderate indirect light supports growth.",
    "tempRange": "10°C - 24°C",
    "soilVal": "General Potting Mix",
    "soilBar": "85%",
    "soilSub": "Well-drained soil with moderate moisture retention",
    "seasons": [],
    "lightRequirement": "Medium to bright indirect light indoors; outdoors, partial shade is often suitable.",
    "regions": [],
    "similarPlantSlugs": [],
    "status": "published"
  }
};

export const DATABASE_USERS = [
  {
    "fullName": "Elena Vu (Master Admin)",
    "email": "admin@greennest.com",
    "password": "AdminCanopy2026!",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
    "avatarUrl": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
    "savedGardenSlugs": [
      "monstera-deliciosa",
      "calathea-orbifolia",
      "ficus-lyrata"
    ],
    "status": "active"
  },
  {
    "fullName": "Admin GreenNest",
    "email": "admin@greennest.vn",
    "password": "Admin@123456",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "admin",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "avatarUrl": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    "savedGardenSlugs": [
      "monstera-deliciosa",
      "calathea-orbifolia"
    ],
    "status": "active"
  },
  {
    "fullName": "Alexandre Pham",
    "email": "alex.pham@example.com",
    "password": "GreenCanopy2026",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "user",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "savedGardenSlugs": [
      "sansevieria-trifasciata",
      "lavandula-angustifolia"
    ],
    "status": "active"
  },
  {
    "fullName": "Demo Member",
    "email": "user@demo.com",
    "password": "GreenCanopy2026",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "user",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "avatarUrl": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "savedGardenSlugs": [
      "ficus-lyrata",
      "monstera-deliciosa"
    ],
    "status": "active"
  },
  {
    "fullName": "Nam Le",
    "email": "nam.le@greennest.vn",
    "password": "GreenNest@2026",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "role": "user",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "avatarUrl": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "savedGardenSlugs": [
      "monstera-deliciosa"
    ],
    "status": "active"
  }
];

// List of canonical 20 plant slugs (excluding legacy aliases)
export const CANONICAL_PLANT_SLUGS = [
  "dwarf-umbrella-plant",
  "swiss-cheese-plant",
  "peace-lily-plant",
  "snake-plant",
  "heart-of-jesus",
  "ajuga",
  "caladium",
  "persian-shield",
  "oakleaf-hydrangea",
  "agave",
  "desert-rose",
  "begonia",
  "armeria",
  "frangipani",
  "english-ivy"
];

// Primary specimen keys for navigation and pagination (20 unique specimens)
export const SPECIMEN_KEYS = CANONICAL_PLANT_SLUGS;

export const STARRED_STORAGE_KEY = 'livingCanopyStarredPlants';
export const GARDEN_STORAGE_KEY = 'livingCanopyGardenPlants';

export function getStarredPlantIds() {
  if (typeof window === 'undefined') return ['monstera-deliciosa'];
  const stored = localStorage.getItem(STARRED_STORAGE_KEY);
  if (stored === null) {
    const initial = ['monstera-deliciosa', 'sansevieria-trifasciata'];
    localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['monstera-deliciosa'];
  } catch (e) {
    return ['monstera-deliciosa'];
  }
}

export function setStarredPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(ids));
}

export function toggleStarredPlant(plantId) {
  const current = getStarredPlantIds();
  let updated;
  if (current.includes(plantId)) {
    updated = current.filter(id => id !== plantId);
  } else {
    updated = [...current, plantId];
  }
  setStarredPlantIds(updated);
  return updated;
}

export function getGardenPlantIds() {
  if (typeof window === 'undefined') return ['monstera-deliciosa', 'ficus-lyrata'];
  const stored = localStorage.getItem(GARDEN_STORAGE_KEY);
  if (stored === null) {
    const initial = ['monstera-deliciosa', 'ficus-lyrata'];
    localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : ['monstera-deliciosa', 'ficus-lyrata'];
  } catch (e) {
    return ['monstera-deliciosa', 'ficus-lyrata'];
  }
}

export function setGardenPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(ids));
}
