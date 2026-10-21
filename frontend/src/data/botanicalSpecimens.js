// Comprehensive Botanical Specimens Seed Data from MongoDB Dataset
// Contains all 20 standardized botanical specimens + 4 seasonal curated collections + DB seed users

export const PLANT_COLLECTIONS = [
  {
    "slug": "spring-collection",
    "seasonKey": "spring",
    "name": "Spring Awakening Collection",
    "description": "The golden period for propagation and fresh growth. Living specimens sprout vibrant new shoots and enter their peak active cycle.",
    "plantSlugs": [
      "monstera-deliciosa",
      "sansevieria-trifasciata",
      "ficus-lyrata",
      "calathea-orbifolia",
      "lavandula-angustifolia"
    ],
    "image": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=1200&q=80",
    "status": "published"
  },
  {
    "slug": "summer-collection",
    "seasonKey": "summer",
    "name": "Summer Canopy Collection",
    "description": "Vibrant sunlit vitality with abundant ambient light, ideal for tropical jungle cultivars to unfurl their largest dramatic foliage.",
    "plantSlugs": [
      "monstera-deliciosa",
      "sansevieria-trifasciata",
      "ficus-lyrata",
      "calathea-orbifolia",
      "lavandula-angustifolia"
    ],
    "image": "https://images.unsplash.com/photo-1542317148-8b4bdccb33ea?auto=format&fit=crop&w=1200&q=80",
    "status": "published"
  },
  {
    "slug": "autumn-collection",
    "seasonKey": "autumn",
    "name": "Autumn Serenity Collection",
    "description": "Temperate, mild weather. The ideal time to introduce moisture-loving and subtropical forest foliage into your living sanctuary.",
    "plantSlugs": [
      "sansevieria-trifasciata",
      "calathea-orbifolia"
    ],
    "image": "https://images.unsplash.com/photo-1507371341162-763b5e419408?auto=format&fit=crop&w=1200&q=80",
    "status": "published"
  },
  {
    "slug": "winter-collection",
    "seasonKey": "winter",
    "name": "Winter Resilience Collection",
    "description": "Curated cold-hardy, drought-tolerant specimens that maintain lush vitality and clean indoor air throughout low-sunlight months.",
    "plantSlugs": [
      "sansevieria-trifasciata"
    ],
    "image": "https://images.unsplash.com/photo-1483664852095-d6cc6870702d?auto=format&fit=crop&w=1200&q=80",
    "status": "published"
  }
];

export const BOTANICAL_SPECIMENS = {
  "monstera-deliciosa": {
    "id": "monstera-deliciosa",
    "slug": "monstera-deliciosa",
    "catalogCode": "CANOPY-001",
    "name": "Swiss Cheese Plant (Monstera)",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Monstera deliciosa leaf close-up in biophilic living room",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/dc/4e/18/dc4e1817fd8e15ec0bb73b91b8dd5f33.jpg",
        "alt": "Fenestrated split-leaf Monstera flourishing in soft ambient morning light",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#EasyCare",
      "#AirPurifying",
      "#Tropical",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Monstera",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "BRIGHT INDIRECT",
      "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole"
    ],
    "shortDesc": "Iconic indoor specimen famous for its dramatic fenestrated foliage. A quintessential centerpiece for biophilic interior spaces.",
    "origin": "Growth Regions: North, South, Central",
    "purpose": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
    "water": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Swiss Cheese Plant (Monstera) is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "waterVol": "350 ml",
    "waterFreq": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
      "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
      "container": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
      "watering": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
      "routineCare": "Apply balanced liquid fertilizer monthly in spring/summer. Wipe leaves regularly with a damp cloth.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains insoluble calcium oxalate crystals which can cause oral swelling and nausea in dogs and cats.",
        "source": "ASPCA Animal Poison Control"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "easy",
    "regions": [
      "north",
      "south",
      "central"
    ],
    "similarPlantSlugs": [
      "pothos-gold",
      "philodendron-birkin"
    ],
    "status": "published"
  },
  "sansevieria-trifasciata": {
    "id": "sansevieria-trifasciata",
    "slug": "sansevieria-trifasciata",
    "catalogCode": "CANOPY-002",
    "name": "Snake Plant",
    "scientificName": "Dracaena trifasciata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
        "alt": "Golden Snake Plant upright sword-shaped leaves",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/8f/c9/b5/8fc9b5b7ed77061c826fc8956245a739.jpg",
        "alt": "Architectural upright blades of Sansevieria",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#Bedroom",
      "#AirPurifying",
      "#LowLight",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Dracaena",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "LOW",
      "Upright, rosette clustering of rigid sword-shaped architectural leaves"
    ],
    "shortDesc": "Remarkably resilient architectural succulent featuring upright sword-like leaves with vivid yellow-green margins. Renowned for nocturnal air purification.",
    "origin": "Growth Regions: North, Central, South, Highlands",
    "purpose": "Upright, rosette clustering of rigid sword-shaped architectural leaves.",
    "water": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "light": "Light: low. Tolerates low light and shaded indoor spaces.",
    "soil": "Fast-draining cactus and succulent mix with pumice or perlite.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "Snake Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "waterVol": "150 ml",
    "waterFreq": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for low",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Fast-draining cactus and",
    "soilBar": "85%",
    "soilSub": "Heavy ceramic or terracotta container with reliable drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Upright, rosette clustering of rigid sword-shaped architectural leaves.",
      "soil": "Fast-draining cactus and succulent mix with pumice or perlite.",
      "container": "Heavy ceramic or terracotta container with reliable drainage.",
      "watering": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
      "routineCare": "Minimal feeding needed; once in spring. Wipe foliage occasionally to remove dust.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains saponins that cause nausea or gastrointestinal discomfort in pets if ingested.",
        "source": "ASPCA Animal Poison Control"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "lightRequirement": "low",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "zz-plant",
      "aloe-vera"
    ],
    "status": "published"
  },
  "ficus-lyrata": {
    "id": "ficus-lyrata",
    "slug": "ficus-lyrata",
    "catalogCode": "CANOPY-003",
    "name": "Fiddle-Leaf Fig",
    "scientificName": "Ficus lyrata",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
        "alt": "Mature Fiddle Leaf Fig tree in interior setting",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/09/85/1c/09851c0d8f2e39cc22ac3181b2002967.jpg",
        "alt": "Grand violin-shaped foliage of Ficus lyrata",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#StatementPlant",
      "#Tree",
      "#Tree"
    ],
    "taxonomyTags": [
      "tree",
      "Ficus",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "BRIGHT INDIRECT",
      "Upright tree habit with substantial architectural leaves on a woody trunk"
    ],
    "shortDesc": "Magnificent statement indoor tree featuring large, glossy violin-shaped foliage with pronounced sculptural veining.",
    "origin": "Growth Regions: North, South",
    "purpose": "Upright tree habit with substantial architectural leaves on a woody trunk.",
    "water": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Rich, well-aerated potting mix with compost and orchid bark.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Fiddle-Leaf Fig is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Substantial planter with drainage; avoid frequent repotting.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "living-room"
      ],
      "growthHabit": "Upright tree habit with substantial architectural leaves on a woody trunk.",
      "soil": "Rich, well-aerated potting mix with compost and orchid bark.",
      "container": "Substantial planter with drainage; avoid frequent repotting.",
      "watering": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
      "routineCare": "Requires consistent bright indirect light; rotate weekly for symmetrical growth.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Milky sap contains ficin and furocoumarins that can irritate skin and mouth.",
        "source": "Pet Poison Helpline"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "ficus-elastica",
      "pachira-aquatica"
    ],
    "status": "published"
  },
  "calathea-orbifolia": {
    "id": "calathea-orbifolia",
    "slug": "calathea-orbifolia",
    "catalogCode": "CANOPY-004",
    "name": "Calathea Orbifolia",
    "scientificName": "Calathea orbifolia",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=800&q=80",
        "alt": "Calathea orbifolia wide round leaves with silver stripes",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/09/dd/5b/09dd5bf913224e66fcc96eb65df90b15.jpg",
        "alt": "Hypnotic silver brushstrokes on broad round prayer plant foliage",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#PatternedLeaves",
      "#HumidityLoving",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Calathea",
      "Plantae"
    ],
    "traits": [
      "HARD Maintenance",
      "MEDIUM",
      "Clumping herbaceous perennial with diurnal nyctinastic leaf movement"
    ],
    "shortDesc": "Exquisite prayer plant showcasing large, rounded foliage marked with delicate metallic silver and emerald brushstrokes.",
    "origin": "Growth Regions: Central, South",
    "purpose": "Clumping herbaceous perennial with diurnal nyctinastic leaf movement.",
    "water": "Keep substrate evenly moist using filtered or rainwater. Water every 5-7 days.",
    "light": "Light: medium. Requires direct or high-intensity sunlight.",
    "soil": "Moisture-retentive, loose substrate with peat moss and perlite.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Demanding Care",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Calathea Orbifolia is actively transpiring with stable metabolic balance.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Keep substrate evenly moist using filtered or rainwater. Water every 5-7 days.",
    "waterVol": "350 ml",
    "waterFreq": "Keep substrate evenly moist using filtered or rainwater. Water every 5-7 days.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for medium",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Moisture-retentive",
    "soilBar": "85%",
    "soilSub": "Wide shallow pot with multiple bottom drainage holes.",
    "guide": {
      "environments": [
        "indoor",
        "bathroom",
        "bedroom"
      ],
      "growthHabit": "Clumping herbaceous perennial with diurnal nyctinastic leaf movement.",
      "soil": "Moisture-retentive, loose substrate with peat moss and perlite.",
      "container": "Wide shallow pot with multiple bottom drainage holes.",
      "watering": "Keep substrate evenly moist using filtered or rainwater. Water every 5-7 days.",
      "routineCare": "Thrives in high humidity (60%+). Shield strictly from harsh direct sun rays.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Non-toxic and completely pet-safe for cats and dogs.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "lightRequirement": "medium",
    "wateringFrequency": "high",
    "difficulty": "hard",
    "regions": [
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "calathea-makoyana",
      "maranta-leuconeura"
    ],
    "status": "published"
  },
  "lavandula-angustifolia": {
    "id": "lavandula-angustifolia",
    "slug": "lavandula-angustifolia",
    "catalogCode": "CANOPY-005",
    "name": "English Lavender",
    "scientificName": "Lavandula angustifolia",
    "category": "herb",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?auto=format&fit=crop&w=800&q=80",
        "alt": "Fragrant purple English Lavender flowers in bloom",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Outdoor",
      "#Aromatic",
      "#Flower",
      "#Herb",
      "#Herb"
    ],
    "taxonomyTags": [
      "herb",
      "Lavandula",
      "Plantae"
    ],
    "traits": [
      "HARD Maintenance",
      "FULL SUN",
      "Bushy compact subshrub with fragrant blooms"
    ],
    "shortDesc": "Aromatic perennial shrub with silver-green foliage and calming fragrant purple flower spikes, thriving in airy sunny environments.",
    "origin": "Growth Regions: Highlands",
    "purpose": "Bushy compact subshrub with fragrant blooms.",
    "water": "Water deeply when soil is completely dry. Avoid waterlogging roots.",
    "light": "Light: full-sun. Requires direct or high-intensity sunlight.",
    "soil": "Gritty, lean, well-draining alkaline soil mix.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Demanding Care",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "English Lavender is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water deeply when soil is completely dry. Avoid waterlogging roots.",
    "waterVol": "150 ml",
    "waterFreq": "Water deeply when soil is completely dry. Avoid waterlogging roots.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Standard spectrum intensity for full-sun",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Gritty",
    "soilBar": "85%",
    "soilSub": "Unglazed terracotta pot with ample aeration holes.",
    "guide": {
      "environments": [
        "balcony",
        "terrace",
        "garden"
      ],
      "growthHabit": "Bushy compact subshrub with fragrant blooms.",
      "soil": "Gritty, lean, well-draining alkaline soil mix.",
      "container": "Unglazed terracotta pot with ample aeration holes.",
      "watering": "Water deeply when soil is completely dry. Avoid waterlogging roots.",
      "routineCare": "Prune lightly after blooming to maintain compact bushy form. Full sun essential.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Contains linalool which can cause mild upset in pets if ingested in quantity.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "full-sun",
    "wateringFrequency": "low",
    "difficulty": "hard",
    "regions": [
      "highlands"
    ],
    "similarPlantSlugs": [
      "rosemary",
      "thyme"
    ],
    "status": "published"
  },
  "epipremnum-aureum": {
    "id": "epipremnum-aureum",
    "slug": "epipremnum-aureum",
    "catalogCode": "CANOPY-006",
    "name": "Golden Pothos",
    "scientificName": "Epipremnum aureum",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
        "alt": "Golden Pothos trailing heart-shaped foliage",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/52/e9/f5/52e9f55be3f9ff605a658b71c07e1b8e.jpg",
        "alt": "Marbled ivory and jade trailing foliage",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#EasyCare",
      "#Trailing",
      "#LowLight",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Epipremnum",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "LOW",
      "Cascading or climbing vine with aerial rootlets"
    ],
    "shortDesc": "Versatile and forgiving trailing vine adorned with heart-shaped leaves variegated in golden-yellow and emerald green.",
    "origin": "Growth Regions: North, Central, South, Highlands",
    "purpose": "Cascading or climbing vine with aerial rootlets.",
    "water": "Allow top half of soil to dry before watering, typically every 7 days.",
    "light": "Light: low. Tolerates low light and shaded indoor spaces.",
    "soil": "Standard all-purpose potting soil with perlite.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Golden Pothos is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Allow top half of soil to dry before watering, typically every 7 days.",
    "waterVol": "350 ml",
    "waterFreq": "Allow top half of soil to dry before watering, typically every 7 days.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for low",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Standard all-purpose pot",
    "soilBar": "85%",
    "soilSub": "Hanging basket or pot with trellis/pole support.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bathroom"
      ],
      "growthHabit": "Cascading or climbing vine with aerial rootlets.",
      "soil": "Standard all-purpose potting soil with perlite.",
      "container": "Hanging basket or pot with trellis/pole support.",
      "watering": "Allow top half of soil to dry before watering, typically every 7 days.",
      "routineCare": "Trim leggy stems to encourage bushier growth. Highly adaptable to low light.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Insoluble oxalates cause oral irritation in pets if chewed.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "lightRequirement": "low",
    "wateringFrequency": "moderate",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "philodendron-hederaceum",
      "monstera-deliciosa"
    ],
    "status": "published"
  },
  "zamioculcas-zamiifolia": {
    "id": "zamioculcas-zamiifolia",
    "slug": "zamioculcas-zamiifolia",
    "catalogCode": "CANOPY-007",
    "name": "ZZ Plant",
    "scientificName": "Zamioculcas zamiifolia",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
        "alt": "Glossy green ZZ Plant stems in minimalist neutral interior",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/37/c3/cc/37c3cca8114b900db96863b218504d73.jpg",
        "alt": "Resilient Zamioculcas zamiifolia foliage",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#Office",
      "#Indestructible",
      "#LowLight",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Zamioculcas",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "LOW",
      "Upright arching stems emerging from thick tuberous rhizomes"
    ],
    "shortDesc": "Extremely durable low-light champion with feather-like stems and glossy, waxy deep green leaflets rising from underground rhizomes.",
    "origin": "Growth Regions: North, Central, South",
    "purpose": "Upright arching stems emerging from thick tuberous rhizomes.",
    "water": "Water thoroughly every 2-3 weeks; highly tolerant of neglect and drought.",
    "light": "Light: low. Tolerates low light and shaded indoor spaces.",
    "soil": "Well-draining, porous potting medium with coarse sand.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "ZZ Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water thoroughly every 2-3 weeks; highly tolerant of neglect and drought.",
    "waterVol": "150 ml",
    "waterFreq": "Water thoroughly every 2-3 weeks; highly tolerant of neglect and drought.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for low",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Well-draining",
    "soilBar": "85%",
    "soilSub": "Sturdy planter with good drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Upright arching stems emerging from thick tuberous rhizomes.",
      "soil": "Well-draining, porous potting medium with coarse sand.",
      "container": "Sturdy planter with good drainage.",
      "watering": "Water thoroughly every 2-3 weeks; highly tolerant of neglect and drought.",
      "routineCare": "Wipe glossy leaves periodically. Can thrive under fluorescent office lighting.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Mildly toxic due to calcium oxalate crystals.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "low",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "sansevieria-trifasciata",
      "cast-iron-plant"
    ],
    "status": "published"
  },
  "spathiphyllum": {
    "id": "spathiphyllum",
    "slug": "spathiphyllum",
    "catalogCode": "CANOPY-008",
    "name": "Peace Lily",
    "scientificName": "Spathiphyllum wallisii",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://i.pinimg.com/736x/76/35/d3/7635d392b9976b1e49ff6391db6a710e.jpg",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/76/35/d3/7635d392b9976b1e49ff6391db6a710e.jpg",
        "alt": "Peace Lily white spathe flowering amidst deep dark green leaves",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Flowering",
      "#AirPurifying",
      "#Flower"
    ],
    "taxonomyTags": [
      "flower",
      "Spathiphyllum",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "MEDIUM",
      "Clump-forming evergreen perennial producing erect flower stalks"
    ],
    "shortDesc": "Graceful shade-loving plant with lustrous dark green foliage and long-lasting pristine white flower spathes. Natural air purifier.",
    "origin": "Growth Regions: North, South",
    "purpose": "Clump-forming evergreen perennial producing erect flower stalks.",
    "water": "Water when topsoil feels barely dry; plant visibly droops when thirsty.",
    "light": "Light: medium. Requires direct or high-intensity sunlight.",
    "soil": "Peat-based potting soil rich in organic matter.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Peace Lily is actively transpiring with stable metabolic balance.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Water when topsoil feels barely dry; plant visibly droops when thirsty.",
    "waterVol": "350 ml",
    "waterFreq": "Water when topsoil feels barely dry; plant visibly droops when thirsty.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for medium",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Peat-based potting soil ",
    "soilBar": "85%",
    "soilSub": "Moisture-retentive ceramic container with drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Clump-forming evergreen perennial producing erect flower stalks.",
      "soil": "Peat-based potting soil rich in organic matter.",
      "container": "Moisture-retentive ceramic container with drainage.",
      "watering": "Water when topsoil feels barely dry; plant visibly droops when thirsty.",
      "routineCare": "Keep in moderate indirect light; mist leaves to sustain ambient humidity.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Calcium oxalate crystals cause irritation if chewed by pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "lightRequirement": "medium",
    "wateringFrequency": "high",
    "difficulty": "easy",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "anthurium-andraeanum",
      "aglaonema"
    ],
    "status": "published"
  },
  "chlorophytum-comosum": {
    "id": "chlorophytum-comosum",
    "slug": "chlorophytum-comosum",
    "catalogCode": "CANOPY-009",
    "name": "Spider Plant",
    "scientificName": "Chlorophytum comosum",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://i.pinimg.com/736x/8a/59/74/8a5974fab2e2b80fe526d2c5c064d02a.jpg",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/8a/59/74/8a5974fab2e2b80fe526d2c5c064d02a.jpg",
        "alt": "Curated variegated Spider Plant foliage with arching leaves",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/03/7b/ca/037bca59efd69485b36a8e1db4129b0a.jpg",
        "alt": "Spider Plant runners and delicate foliage",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#PetSafe",
      "#Hanging",
      "#AirPurifying",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Chlorophytum",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "BRIGHT INDIRECT",
      "Rosette of arching slender foliage producing spiderettes"
    ],
    "shortDesc": "Classic and prolific indoor plant with arching ribbon-like variegated leaves and miniature plantlets cascading on long stolons.",
    "origin": "Growth Regions: North, Central, South, Highlands",
    "purpose": "Rosette of arching slender foliage producing spiderettes.",
    "water": "Water moderately once weekly during the growing season.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Standard well-draining potting soil.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Spider Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water moderately once weekly during the growing season.",
    "waterVol": "350 ml",
    "waterFreq": "Water moderately once weekly during the growing season.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Standard well-draining p",
    "soilBar": "85%",
    "soilSub": "Hanging basket or elevated pedestal pot with drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Rosette of arching slender foliage producing spiderettes.",
      "soil": "Standard well-draining potting soil.",
      "container": "Hanging basket or elevated pedestal pot with drainage.",
      "watering": "Water moderately once weekly during the growing season.",
      "routineCare": "Clip and propagate spiderettes in water or potting soil.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Safe and non-toxic for domestic pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "epipremnum-aureum",
      "boston-fern"
    ],
    "status": "published"
  },
  "ficus-elastica": {
    "id": "ficus-elastica",
    "slug": "ficus-elastica",
    "catalogCode": "CANOPY-010",
    "name": "Rubber Tree",
    "scientificName": "Ficus elastica",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1600411833196-7c1f6b1a8b90?auto=format&fit=crop&w=800&q=80",
        "alt": "Rubber Tree plant with bold sculptural foliage",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/89/19/92/8919929faecbe659698eee0bb0debf8d.jpg",
        "alt": "Variegated Rubber Tree plant foliage catching sunlight",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#Tree",
      "#BoldFoliage",
      "#Tree"
    ],
    "taxonomyTags": [
      "tree",
      "Ficus",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "BRIGHT INDIRECT",
      "Tree form with thick upright woody stem and large oval leaves"
    ],
    "shortDesc": "Striking sculptural specimen with thick, leathery broad leaves in rich burgundy-green tones, exuding modern botanical elegance.",
    "origin": "Growth Regions: North, South",
    "purpose": "Tree form with thick upright woody stem and large oval leaves.",
    "water": "Water when top 3-4cm is dry to the touch.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Well-draining potting mix rich in organic compost.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Rubber Tree is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top 3-4cm is dry to the touch.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top 3-4cm is dry to the touch.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Well-draining potting mi",
    "soilBar": "85%",
    "soilSub": "Heavy ceramic or stone pot with drainage holes.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "living-room"
      ],
      "growthHabit": "Tree form with thick upright woody stem and large oval leaves.",
      "soil": "Well-draining potting mix rich in organic compost.",
      "container": "Heavy ceramic or stone pot with drainage holes.",
      "watering": "Water when top 3-4cm is dry to the touch.",
      "routineCare": "Wipe broad leaves with a damp cloth; provide bright indirect light.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Milky latex sap can cause dermal or digestive irritation in pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "ficus-lyrata",
      "ficus-benjamina"
    ],
    "status": "published"
  },
  "philodendron-birkin": {
    "id": "philodendron-birkin",
    "slug": "philodendron-birkin",
    "catalogCode": "CANOPY-011",
    "name": "Philodendron Birkin",
    "scientificName": "Philodendron 'Birkin'",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Philodendron Birkin glossy dark foliage with creamy pinstripes",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Variegated",
      "#Compact",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Philodendron",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "BRIGHT INDIRECT",
      "Self-heading compact rosette habit, does not require climbing pole"
    ],
    "shortDesc": "Compact collector favourite boasting dramatic pinstripe variegation of creamy white lines across glossy dark emerald leaves.",
    "origin": "Growth Regions: North, South",
    "purpose": "Self-heading compact rosette habit, does not require climbing pole.",
    "water": "Water when top half of soil dries, roughly every 7-9 days.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Chunky aroid mix with bark, perlite, and coco coir.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Philodendron Birkin is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top half of soil dries, roughly every 7-9 days.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top half of soil dries, roughly every 7-9 days.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Chunky aroid mix with ba",
    "soilBar": "85%",
    "soilSub": "Pot with excellent drainage holes.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Self-heading compact rosette habit, does not require climbing pole.",
      "soil": "Chunky aroid mix with bark, perlite, and coco coir.",
      "container": "Pot with excellent drainage holes.",
      "watering": "Water when top half of soil dries, roughly every 7-9 days.",
      "routineCare": "Bright indirect light preserves the striking variegated striping.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains calcium oxalates; keep away from curious pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "monstera-deliciosa",
      "aglaonema"
    ],
    "status": "published"
  },
  "alocasia-amazonica": {
    "id": "alocasia-amazonica",
    "slug": "alocasia-amazonica",
    "catalogCode": "CANOPY-012",
    "name": "African Mask Plant",
    "scientificName": "Alocasia amazonica (Polly)",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=800&q=80",
        "alt": "Alocasia Amazonica with striking white leaf veins",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#BoldFoliage",
      "#HumidityLoving",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Alocasia",
      "Plantae"
    ],
    "traits": [
      "HARD Maintenance",
      "BRIGHT INDIRECT",
      "Rhizomatous perennial producing arrow-shaped leaves on long petioles"
    ],
    "shortDesc": "Dramatically sculpted arrow-shaped foliage with wavy margins and bold silvery-white venation against near-black emerald leaf surfaces.",
    "origin": "Growth Regions: Central, South",
    "purpose": "Rhizomatous perennial producing arrow-shaped leaves on long petioles.",
    "water": "Keep moist but never waterlogged; water every 5-7 days.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Airy, well-aerated chunky aroid substrate.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Demanding Care",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "African Mask Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Keep moist but never waterlogged; water every 5-7 days.",
    "waterVol": "350 ml",
    "waterFreq": "Keep moist but never waterlogged; water every 5-7 days.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Airy",
    "soilBar": "85%",
    "soilSub": "Well-draining pot with permeable sidewalls.",
    "guide": {
      "environments": [
        "indoor",
        "bathroom",
        "office"
      ],
      "growthHabit": "Rhizomatous perennial producing arrow-shaped leaves on long petioles.",
      "soil": "Airy, well-aerated chunky aroid substrate.",
      "container": "Well-draining pot with permeable sidewalls.",
      "watering": "Keep moist but never waterlogged; water every 5-7 days.",
      "routineCare": "Prefers warm temperatures (above 18°C) and higher humidity levels.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "toxic",
        "note": "Toxic to cats and dogs if ingested.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "high",
    "difficulty": "hard",
    "regions": [
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "calathea-orbifolia",
      "colocasia-esculenta"
    ],
    "status": "published"
  },
  "crassula-ovata": {
    "id": "crassula-ovata",
    "slug": "crassula-ovata",
    "catalogCode": "CANOPY-013",
    "name": "Jade Plant",
    "scientificName": "Crassula ovata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://i.pinimg.com/736x/7c/93/88/7c9388432c687afc5493f010e2b9f5e7.jpg",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/7c/93/88/7c9388432c687afc5493f010e2b9f5e7.jpg",
        "alt": "Minimalist desktop Jade Plant arrangement in stone bowl",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Outdoor",
      "#Succulent",
      "#BonsaiPotential",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Crassula",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "FULL SUN",
      "Branching succulent shrub with thick fleshy leaves"
    ],
    "shortDesc": "Beloved succulent bonsai-like plant with thick woody stems and plump oval jade-green leaves, symbolizing good fortune and abundance.",
    "origin": "Growth Regions: North, Highlands, Central, South",
    "purpose": "Branching succulent shrub with thick fleshy leaves.",
    "water": "Water thoroughly only when soil is completely dry.",
    "light": "Light: full-sun. Requires direct or high-intensity sunlight.",
    "soil": "Cactus and succulent potting mix with perlite or pumice.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "Jade Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water thoroughly only when soil is completely dry.",
    "waterVol": "150 ml",
    "waterFreq": "Water thoroughly only when soil is completely dry.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Standard spectrum intensity for full-sun",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Cactus and succulent pot",
    "soilBar": "85%",
    "soilSub": "Heavy terracotta pot for balance and moisture evaporation.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Branching succulent shrub with thick fleshy leaves.",
      "soil": "Cactus and succulent potting mix with perlite or pumice.",
      "container": "Heavy terracotta pot for balance and moisture evaporation.",
      "watering": "Water thoroughly only when soil is completely dry.",
      "routineCare": "Provide at least 4-6 hours of bright or direct sunshine daily.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "mild",
        "note": "Can cause vomiting and depression in pets if ingested.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "lightRequirement": "full-sun",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "highlands",
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "sansevieria-trifasciata",
      "aloe-vera"
    ],
    "status": "published"
  },
  "strelitzia-reginae": {
    "id": "strelitzia-reginae",
    "slug": "strelitzia-reginae",
    "catalogCode": "CANOPY-014",
    "name": "Bird of Paradise",
    "scientificName": "Strelitzia reginae",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1551893478-d726eaf0442c?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1551893478-d726eaf0442c?auto=format&fit=crop&w=800&q=80",
        "alt": "Exotic orange and blue Bird of Paradise flower",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Outdoor",
      "#StatementPlant",
      "#Flowering",
      "#Flower"
    ],
    "taxonomyTags": [
      "flower",
      "Strelitzia",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "FULL SUN",
      "Clumping erect perennial with broad paddle-shaped leaves"
    ],
    "shortDesc": "Regal tropical plant featuring grand banana-like paddles and exotic crane-shaped blooms in brilliant orange and azure blue.",
    "origin": "Growth Regions: Central, South",
    "purpose": "Clumping erect perennial with broad paddle-shaped leaves.",
    "water": "Water regularly in spring/summer, allowing topsoil to dry between sessions.",
    "light": "Light: full-sun. Requires direct or high-intensity sunlight.",
    "soil": "Rich loam substrate with excellent moisture retention and drainage.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Bird of Paradise is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water regularly in spring/summer, allowing topsoil to dry between sessions.",
    "waterVol": "350 ml",
    "waterFreq": "Water regularly in spring/summer, allowing topsoil to dry between sessions.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Standard spectrum intensity for full-sun",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich loam substrate with",
    "soilBar": "85%",
    "soilSub": "Deep, sturdy container with multiple drainage holes.",
    "guide": {
      "environments": [
        "indoor",
        "balcony",
        "living-room"
      ],
      "growthHabit": "Clumping erect perennial with broad paddle-shaped leaves.",
      "soil": "Rich loam substrate with excellent moisture retention and drainage.",
      "container": "Deep, sturdy container with multiple drainage holes.",
      "watering": "Water regularly in spring/summer, allowing topsoil to dry between sessions.",
      "routineCare": "Needs abundant light; tolerates several hours of direct sunshine.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "mild",
        "note": "Mildly toxic to pets; seeds are the most toxic part.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "full-sun",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "ficus-lyrata",
      "musa-acuminata"
    ],
    "status": "published"
  },
  "nephrolepis-exaltata": {
    "id": "nephrolepis-exaltata",
    "slug": "nephrolepis-exaltata",
    "catalogCode": "CANOPY-015",
    "name": "Boston Fern",
    "scientificName": "Nephrolepis exaltata",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://i.pinimg.com/736x/3e/3f/9a/3e3f9a309c76c20e41f5a0d6d4121235.jpg",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/3e/3f/9a/3e3f9a309c76c20e41f5a0d6d4121235.jpg",
        "alt": "Cascading Boston Fern fronds in architectural ceramic planter",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Hanging",
      "#PetSafe",
      "#HumidityLoving",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Nephrolepis",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "MEDIUM",
      "Clumping perennial with graceful arching pinnate fronds"
    ],
    "shortDesc": "Lush cascading fern with arching feathery fronds that naturally humidifies ambient air and softens interior architectural contours.",
    "origin": "Growth Regions: North, Highlands, South",
    "purpose": "Clumping perennial with graceful arching pinnate fronds.",
    "water": "Maintain consistent moisture; never let root ball dry out completely.",
    "light": "Light: medium. Requires direct or high-intensity sunlight.",
    "soil": "Rich, porous potting mix with peat moss and vermiculite.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Boston Fern is actively transpiring with stable metabolic balance.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Maintain consistent moisture; never let root ball dry out completely.",
    "waterVol": "350 ml",
    "waterFreq": "Maintain consistent moisture; never let root ball dry out completely.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for medium",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Hanging basket or elevated pedestal pot with drainage.",
    "guide": {
      "environments": [
        "indoor",
        "bathroom",
        "shaded-balcony"
      ],
      "growthHabit": "Clumping perennial with graceful arching pinnate fronds.",
      "soil": "Rich, porous potting mix with peat moss and vermiculite.",
      "container": "Hanging basket or elevated pedestal pot with drainage.",
      "watering": "Maintain consistent moisture; never let root ball dry out completely.",
      "routineCare": "Provide bright filtered light and generous ambient humidity.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Non-toxic and completely pet-safe.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "lightRequirement": "medium",
    "wateringFrequency": "high",
    "difficulty": "medium",
    "regions": [
      "north",
      "highlands",
      "south"
    ],
    "similarPlantSlugs": [
      "chlorophytum-comosum",
      "calathea-orbifolia"
    ],
    "status": "published"
  },
  "senecio-rowleyanus": {
    "id": "senecio-rowleyanus",
    "slug": "senecio-rowleyanus",
    "catalogCode": "CANOPY-016",
    "name": "String of Pearls",
    "scientificName": "Senecio rowleyanus",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        "alt": "Trailing String of Pearls succulent beads cascading gently",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Succulent",
      "#Trailing",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Senecio",
      "Plantae"
    ],
    "traits": [
      "HARD Maintenance",
      "BRIGHT INDIRECT",
      "Pendant trailing succulent stems cascading up to 1 meter"
    ],
    "shortDesc": "Whimsical trailing succulent with slender thread-like stems draped in spherical pea-like green bead foliage.",
    "origin": "Growth Regions: Highlands, Central",
    "purpose": "Pendant trailing succulent stems cascading up to 1 meter.",
    "water": "Water when pearl spheres soften slightly; roughly every 10-14 days.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Fast-draining gritty succulent mix.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Demanding Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "String of Pearls is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water when pearl spheres soften slightly; roughly every 10-14 days.",
    "waterVol": "150 ml",
    "waterFreq": "Water when pearl spheres soften slightly; roughly every 10-14 days.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Fast-draining gritty suc",
    "soilBar": "85%",
    "soilSub": "Shallow hanging planter with bottom drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Pendant trailing succulent stems cascading up to 1 meter.",
      "soil": "Fast-draining gritty succulent mix.",
      "container": "Shallow hanging planter with bottom drainage.",
      "watering": "Water when pearl spheres soften slightly; roughly every 10-14 days.",
      "routineCare": "Ensure top of pot receives bright light; avoid overwatering.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Toxic to pets; can cause lethargy and digestive distress.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "autumn"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "low",
    "difficulty": "hard",
    "regions": [
      "highlands",
      "central"
    ],
    "similarPlantSlugs": [
      "crassula-ovata",
      "ceropegia-woodii"
    ],
    "status": "published"
  },
  "hedera-helix": {
    "id": "hedera-helix",
    "slug": "hedera-helix",
    "catalogCode": "CANOPY-017",
    "name": "English Ivy",
    "scientificName": "Hedera helix",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80",
        "alt": "Lush green English Ivy climbing with distinctive lobed leaves",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Outdoor",
      "#Trailing",
      "#ColdTolerant",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Hedera",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "MEDIUM",
      "Vigorous climbing and trailing woody evergreen vine"
    ],
    "shortDesc": "Vigorous evergreen trailing climber with classic lobed leaves, ideal for hanging baskets or climbing decorative trellises.",
    "origin": "Growth Regions: North, Highlands",
    "purpose": "Vigorous climbing and trailing woody evergreen vine.",
    "water": "Water when top 2cm feels dry; avoid standing in water.",
    "light": "Light: medium. Requires direct or high-intensity sunlight.",
    "soil": "Standard moist, fertile, well-drained potting compost.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "English Ivy is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top 2cm feels dry; avoid standing in water.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top 2cm feels dry; avoid standing in water.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for medium",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Standard moist",
    "soilBar": "85%",
    "soilSub": "Hanging planter or pot with trellis framework.",
    "guide": {
      "environments": [
        "indoor",
        "balcony",
        "office"
      ],
      "growthHabit": "Vigorous climbing and trailing woody evergreen vine.",
      "soil": "Standard moist, fertile, well-drained potting compost.",
      "container": "Hanging planter or pot with trellis framework.",
      "watering": "Water when top 2cm feels dry; avoid standing in water.",
      "routineCare": "Thrives in cooler room temperatures and medium to bright light.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Foliage contains triterpenoid saponins.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "autumn",
      "winter",
      "spring"
    ],
    "lightRequirement": "medium",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "highlands"
    ],
    "similarPlantSlugs": [
      "epipremnum-aureum",
      "chlorophytum-comosum"
    ],
    "status": "published"
  },
  "aspidistra-elatior": {
    "id": "aspidistra-elatior",
    "slug": "aspidistra-elatior",
    "catalogCode": "CANOPY-018",
    "name": "Cast-Iron Plant",
    "scientificName": "Aspidistra elatior",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
        "alt": "Resilient Cast-Iron Plant broad dark green foliage",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Indestructible",
      "#PetSafe",
      "#LowLight",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Aspidistra",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "LOW",
      "Clumping upright foliage growing directly from underground rhizomes"
    ],
    "shortDesc": "Renowned for its indestructible stamina, with broad dark green lance-shaped leaves thriving in low-light, low-humidity spaces.",
    "origin": "Growth Regions: North, Central, South",
    "purpose": "Clumping upright foliage growing directly from underground rhizomes.",
    "water": "Water moderately when top 5cm of soil is dry.",
    "light": "Light: low. Tolerates low light and shaded indoor spaces.",
    "soil": "Standard well-draining indoor potting mix.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "Cast-Iron Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water moderately when top 5cm of soil is dry.",
    "waterVol": "150 ml",
    "waterFreq": "Water moderately when top 5cm of soil is dry.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for low",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Standard well-draining i",
    "soilBar": "85%",
    "soilSub": "Heavy ceramic or plastic pot with good drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "corridor"
      ],
      "growthHabit": "Clumping upright foliage growing directly from underground rhizomes.",
      "soil": "Standard well-draining indoor potting mix.",
      "container": "Heavy ceramic or plastic pot with good drainage.",
      "watering": "Water moderately when top 5cm of soil is dry.",
      "routineCare": "Wipe dust from broad leaves; tolerates wide temperature swings.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Non-toxic and safe for all household pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "lightRequirement": "low",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south"
    ],
    "similarPlantSlugs": [
      "sansevieria-trifasciata",
      "zamioculcas-zamiifolia"
    ],
    "status": "published"
  },
  "anthurium-andraeanum": {
    "id": "anthurium-andraeanum",
    "slug": "anthurium-andraeanum",
    "catalogCode": "CANOPY-019",
    "name": "Flamingo Flower",
    "scientificName": "Anthurium andraeanum",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://i.pinimg.com/736x/e6/87/6c/e6876c9a7dd702a114b74b7eaa39b334.jpg",
    "images": [
      {
        "url": "https://i.pinimg.com/736x/e6/87/6c/e6876c9a7dd702a114b74b7eaa39b334.jpg",
        "alt": "Vibrant scarlet Anthurium bloom with yellow spadix",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Flowering",
      "#BoldFoliage",
      "#Flower"
    ],
    "taxonomyTags": [
      "flower",
      "Anthurium",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "BRIGHT INDIRECT",
      "Epiphytic clumping perennial with heart-shaped leaves and showy spathes"
    ],
    "shortDesc": "Dazzling tropical beauty featuring glossy heart-shaped foliage crowned with long-lasting waxy scarlet spathes and yellow spadices.",
    "origin": "Growth Regions: North, South",
    "purpose": "Epiphytic clumping perennial with heart-shaped leaves and showy spathes.",
    "water": "Water when top 3cm of soil dries; do not leave water in the saucer.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Coarse, well-aerated orchid and aroid potting mix.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Flamingo Flower is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top 3cm of soil dries; do not leave water in the saucer.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top 3cm of soil dries; do not leave water in the saucer.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Coarse",
    "soilBar": "85%",
    "soilSub": "Pot with drainage; ensure roots have adequate airflow.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "living-room"
      ],
      "growthHabit": "Epiphytic clumping perennial with heart-shaped leaves and showy spathes.",
      "soil": "Coarse, well-aerated orchid and aroid potting mix.",
      "container": "Pot with drainage; ensure roots have adequate airflow.",
      "watering": "Water when top 3cm of soil dries; do not leave water in the saucer.",
      "routineCare": "Bright indirect light encourages continuous flower spathe blooms.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains calcium oxalate crystals; toxic to pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "spathiphyllum",
      "philodendron-birkin"
    ],
    "status": "published"
  },
  "aloe-vera": {
    "id": "aloe-vera",
    "slug": "aloe-vera",
    "catalogCode": "CANOPY-020",
    "name": "Aloe Vera",
    "scientificName": "Aloe vera",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1567689265664-1c48de61db0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1567689265664-1c48de61db0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Fresh Aloe Vera succulent with thick fleshy gel leaves",
        "isPrimary": true
      }
    ],
    "tags": [
      "#Indoor",
      "#Outdoor",
      "#Succulent",
      "#Medicinal",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Aloe",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "FULL SUN",
      "Stemless rosette of thick fleshy erect leaves"
    ],
    "shortDesc": "Timeless succulent revered for its soothing gel-filled lanceolate leaves adorned with soft serrated edges. Thrives in sunlit corners.",
    "origin": "Growth Regions: North, Central, South, Highlands",
    "purpose": "Stemless rosette of thick fleshy erect leaves.",
    "water": "Soak thoroughly and allow soil to dry out completely before next watering.",
    "light": "Light: full-sun. Requires direct or high-intensity sunlight.",
    "soil": "Porous cactus or succulent soil with sand and perlite.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "Aloe Vera is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Soak thoroughly and allow soil to dry out completely before next watering.",
    "waterVol": "150 ml",
    "waterFreq": "Soak thoroughly and allow soil to dry out completely before next watering.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Standard spectrum intensity for full-sun",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Porous cactus or succule",
    "soilBar": "85%",
    "soilSub": "Wide, shallow unglazed terracotta pot with drainage.",
    "guide": {
      "environments": [
        "indoor",
        "kitchen",
        "balcony"
      ],
      "growthHabit": "Stemless rosette of thick fleshy erect leaves.",
      "soil": "Porous cactus or succulent soil with sand and perlite.",
      "container": "Wide, shallow unglazed terracotta pot with drainage.",
      "watering": "Soak thoroughly and allow soil to dry out completely before next watering.",
      "routineCare": "Place in direct or bright sunlight for optimal vigor.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Gel is soothing for humans, but rind contains aloin which is toxic to pets.",
        "source": "ASPCA"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "full-sun",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "sansevieria-trifasciata",
      "crassula-ovata"
    ],
    "status": "published"
  },
  "specimen-monstera": {
    "id": "monstera-deliciosa",
    "slug": "monstera-deliciosa",
    "catalogCode": "CANOPY-001",
    "name": "Swiss Cheese Plant (Monstera)",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Monstera deliciosa leaf close-up in biophilic living room",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/dc/4e/18/dc4e1817fd8e15ec0bb73b91b8dd5f33.jpg",
        "alt": "Fenestrated split-leaf Monstera flourishing in soft ambient morning light",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#EasyCare",
      "#AirPurifying",
      "#Tropical",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Monstera",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "BRIGHT INDIRECT",
      "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole"
    ],
    "shortDesc": "Iconic indoor specimen famous for its dramatic fenestrated foliage. A quintessential centerpiece for biophilic interior spaces.",
    "origin": "Growth Regions: North, South, Central",
    "purpose": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
    "water": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Swiss Cheese Plant (Monstera) is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "waterVol": "350 ml",
    "waterFreq": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
      "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
      "container": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
      "watering": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
      "routineCare": "Apply balanced liquid fertilizer monthly in spring/summer. Wipe leaves regularly with a damp cloth.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains insoluble calcium oxalate crystals which can cause oral swelling and nausea in dogs and cats.",
        "source": "ASPCA Animal Poison Control"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "easy",
    "regions": [
      "north",
      "south",
      "central"
    ],
    "similarPlantSlugs": [
      "pothos-gold",
      "philodendron-birkin"
    ],
    "status": "published"
  },
  "specimen-red-rose": {
    "id": "monstera-deliciosa",
    "slug": "monstera-deliciosa",
    "catalogCode": "CANOPY-001",
    "name": "Swiss Cheese Plant (Monstera)",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Monstera deliciosa leaf close-up in biophilic living room",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/dc/4e/18/dc4e1817fd8e15ec0bb73b91b8dd5f33.jpg",
        "alt": "Fenestrated split-leaf Monstera flourishing in soft ambient morning light",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#EasyCare",
      "#AirPurifying",
      "#Tropical",
      "#Foliage"
    ],
    "taxonomyTags": [
      "foliage",
      "Monstera",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "BRIGHT INDIRECT",
      "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole"
    ],
    "shortDesc": "Iconic indoor specimen famous for its dramatic fenestrated foliage. A quintessential centerpiece for biophilic interior spaces.",
    "origin": "Growth Regions: North, South, Central",
    "purpose": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
    "water": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Swiss Cheese Plant (Monstera) is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "waterVol": "350 ml",
    "waterFreq": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Climbing vine with deeply perforated leaves at maturity; benefits from a moss pole.",
      "soil": "Rich, well-draining potting medium blended with peat moss, perlite, and orchid bark.",
      "container": "Terracotta or ceramic pot with drainage holes, minimum 25cm diameter.",
      "watering": "Water once every 7-10 days. Allow top 3-5cm of soil to dry before watering thoroughly.",
      "routineCare": "Apply balanced liquid fertilizer monthly in spring/summer. Wipe leaves regularly with a damp cloth.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains insoluble calcium oxalate crystals which can cause oral swelling and nausea in dogs and cats.",
        "source": "ASPCA Animal Poison Control"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "easy",
    "regions": [
      "north",
      "south",
      "central"
    ],
    "similarPlantSlugs": [
      "pothos-gold",
      "philodendron-birkin"
    ],
    "status": "published"
  },
  "specimen-snake-plant": {
    "id": "sansevieria-trifasciata",
    "slug": "sansevieria-trifasciata",
    "catalogCode": "CANOPY-002",
    "name": "Snake Plant",
    "scientificName": "Dracaena trifasciata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=800&q=80",
        "alt": "Golden Snake Plant upright sword-shaped leaves",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/8f/c9/b5/8fc9b5b7ed77061c826fc8956245a739.jpg",
        "alt": "Architectural upright blades of Sansevieria",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#Bedroom",
      "#AirPurifying",
      "#LowLight",
      "#Succulent"
    ],
    "taxonomyTags": [
      "succulent",
      "Dracaena",
      "Plantae"
    ],
    "traits": [
      "EASY Maintenance",
      "LOW",
      "Upright, rosette clustering of rigid sword-shaped architectural leaves"
    ],
    "shortDesc": "Remarkably resilient architectural succulent featuring upright sword-like leaves with vivid yellow-green margins. Renowned for nocturnal air purification.",
    "origin": "Growth Regions: North, Central, South, Highlands",
    "purpose": "Upright, rosette clustering of rigid sword-shaped architectural leaves.",
    "water": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "light": "Light: low. Tolerates low light and shaded indoor spaces.",
    "soil": "Fast-draining cactus and succulent mix with pumice or perlite.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Vigorous / Easy Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Drought-tolerant",
    "notifMsg": "Snake Plant is actively transpiring with stable metabolic balance.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "waterVol": "150 ml",
    "waterFreq": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "No misting needed",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for low",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Fast-draining cactus and",
    "soilBar": "85%",
    "soilSub": "Heavy ceramic or terracotta container with reliable drainage.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Upright, rosette clustering of rigid sword-shaped architectural leaves.",
      "soil": "Fast-draining cactus and succulent mix with pumice or perlite.",
      "container": "Heavy ceramic or terracotta container with reliable drainage.",
      "watering": "Water sparingly every 2-3 weeks; allow soil to dry completely between waterings.",
      "routineCare": "Minimal feeding needed; once in spring. Wipe foliage occasionally to remove dust.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Contains saponins that cause nausea or gastrointestinal discomfort in pets if ingested.",
        "source": "ASPCA Animal Poison Control"
      }
    },
    "seasons": [
      "spring",
      "summer",
      "autumn",
      "winter"
    ],
    "lightRequirement": "low",
    "wateringFrequency": "low",
    "difficulty": "easy",
    "regions": [
      "north",
      "central",
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "zz-plant",
      "aloe-vera"
    ],
    "status": "published"
  },
  "specimen-fiddle-leaf": {
    "id": "ficus-lyrata",
    "slug": "ficus-lyrata",
    "catalogCode": "CANOPY-003",
    "name": "Fiddle-Leaf Fig",
    "scientificName": "Ficus lyrata",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=800&q=80",
        "alt": "Mature Fiddle Leaf Fig tree in interior setting",
        "isPrimary": true
      },
      {
        "url": "https://i.pinimg.com/736x/09/85/1c/09851c0d8f2e39cc22ac3181b2002967.jpg",
        "alt": "Grand violin-shaped foliage of Ficus lyrata",
        "isPrimary": false
      }
    ],
    "tags": [
      "#Indoor",
      "#StatementPlant",
      "#Tree",
      "#Tree"
    ],
    "taxonomyTags": [
      "tree",
      "Ficus",
      "Plantae"
    ],
    "traits": [
      "MEDIUM Maintenance",
      "BRIGHT INDIRECT",
      "Upright tree habit with substantial architectural leaves on a woody trunk"
    ],
    "shortDesc": "Magnificent statement indoor tree featuring large, glossy violin-shaped foliage with pronounced sculptural veining.",
    "origin": "Growth Regions: North, South",
    "purpose": "Upright tree habit with substantial architectural leaves on a woody trunk.",
    "water": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "light": "Light: bright-indirect. Thrives in abundant bright indirect sunlight.",
    "soil": "Rich, well-aerated potting mix with compost and orchid bark.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Moderate Care",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Optimal Hydration",
    "notifMsg": "Fiddle-Leaf Fig is actively transpiring with stable metabolic balance.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "waterVol": "350 ml",
    "waterFreq": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Steady foliar transpiration rate.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Mist foliage every 3-4 days",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Standard spectrum intensity for bright-indirect",
    "tempRange": "18°C minimum night / 28°C maximum day",
    "soilVal": "Rich",
    "soilBar": "85%",
    "soilSub": "Substantial planter with drainage; avoid frequent repotting.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "living-room"
      ],
      "growthHabit": "Upright tree habit with substantial architectural leaves on a woody trunk.",
      "soil": "Rich, well-aerated potting mix with compost and orchid bark.",
      "container": "Substantial planter with drainage; avoid frequent repotting.",
      "watering": "Water when top 5cm is dry, roughly every 7-10 days. Avoid waterlogging roots.",
      "routineCare": "Requires consistent bright indirect light; rotate weekly for symmetrical growth.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Milky sap contains ficin and furocoumarins that can irritate skin and mouth.",
        "source": "Pet Poison Helpline"
      }
    },
    "seasons": [
      "spring",
      "summer"
    ],
    "lightRequirement": "bright-indirect",
    "wateringFrequency": "moderate",
    "difficulty": "medium",
    "regions": [
      "north",
      "south"
    ],
    "similarPlantSlugs": [
      "ficus-elastica",
      "pachira-aquatica"
    ],
    "status": "published"
  }
};

export const DATABASE_USERS = [
  {
    "email": "admin@greennest.com",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "fullName": "Elena Vu (Master Admin)",
    "avatar": "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&w=400&q=80",
    "role": "admin",
    "savedGardenSlugs": [
      "monstera-deliciosa",
      "calathea-orbifolia",
      "ficus-lyrata"
    ],
    "status": "active"
  },
  {
    "email": "alex.pham@example.com",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "fullName": "Alexandre Pham",
    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
    "role": "user",
    "savedGardenSlugs": [
      "sansevieria-trifasciata",
      "lavandula-angustifolia"
    ],
    "status": "active"
  },
  {
    "email": "user@demo.com",
    "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
    "fullName": "Demo Member",
    "avatar": "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80",
    "role": "user",
    "savedGardenSlugs": [
      "ficus-lyrata",
      "monstera-deliciosa"
    ],
    "status": "active"
  }
];

// List of canonical 20 plant slugs (excluding legacy aliases)
export const CANONICAL_PLANT_SLUGS = [
  "monstera-deliciosa",
  "sansevieria-trifasciata",
  "ficus-lyrata",
  "calathea-orbifolia",
  "lavandula-angustifolia",
  "epipremnum-aureum",
  "zamioculcas-zamiifolia",
  "spathiphyllum",
  "chlorophytum-comosum",
  "ficus-elastica",
  "philodendron-birkin",
  "alocasia-amazonica",
  "crassula-ovata",
  "strelitzia-reginae",
  "nephrolepis-exaltata",
  "senecio-rowleyanus",
  "hedera-helix",
  "aspidistra-elatior",
  "anthurium-andraeanum",
  "aloe-vera"
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
