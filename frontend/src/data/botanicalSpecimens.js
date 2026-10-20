// Comprehensive Botanical Specimens Seed Data from MongoDB Dataset
// Contains all 20 standardized botanical specimens + 4 seasonal curated collections

export const PLANT_COLLECTIONS = [
  {
    "slug": "spring-collection",
    "seasonKey": "spring",
    "name": "Bộ Sưu Tập Mùa Xuân",
    "description": "Khoảng thời gian lý tưởng nhất để bắt đầu gieo trồng và nhân giống. Các loài cây đâm chồi nảy lộc và bắt đầu chu kỳ sinh trưởng mạnh mẽ.",
    "plantSlugs": [
      "monstera-deliciosa",
      "sansevieria-trifasciata",
      "ficus-lyrata",
      "calathea-orbifolia",
      "lavandula-angustifolia"
    ],
    "image": "https://images.unsplash.com/photo-1490750967868-88cb4ecb0713?auto=format&fit=crop&w=1200&q=80",
    "status": "published"
  },
  {
    "slug": "summer-collection",
    "seasonKey": "summer",
    "name": "Bộ Sưu Tập Mùa Hạ",
    "description": "Mùa rực rỡ với lượng ánh sáng dồi dào, phù hợp cho các loài ưa nhiệt đới phát triển bung xõa rực rỡ nhất.",
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
    "name": "Bộ Sưu Tập Mùa Thu",
    "description": "Tiết trời mát mẻ, ôn hòa. Đây là lúc tuyệt vời để đưa các loại cây ưa ẩm và cận nhiệt đới vào không gian sống.",
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
    "name": "Bộ Sưu Tập Mùa Đông",
    "description": "Bộ sưu tập những loại cây cứng cáp, chịu lạnh giỏi và đem lại sinh khí cho ngôi nhà trong những tháng thiếu nắng.",
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
    "name": "Trầu bà lá xẻ",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Cây trầu bà lá xẻ tổng thể",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1579730043132-1b1cbdfdcb2d?auto=format&fit=crop&w=800&q=80",
        "alt": "Chi tiết lá xẻ Monstera",
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
      "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành"
    ],
    "shortDesc": "Cây cảnh nội thất kinh điển với phiến lá xẻ độc đáo, mang đậm phong cách nhiệt đới hoang dã. Biểu tượng của không gian Biophilic.",
    "origin": "Vùng sinh trưởng: north, south, central",
    "purpose": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
    "water": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Trầu bà lá xẻ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng giàu mùn",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
      "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
      "container": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
      "watering": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
      "routineCare": "Bón phân NPK loãng 1 tháng/lần vào mùa Xuân/Hạ. Thường xuyên lau bụi trên lá bằng khăn ẩm.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Chứa tinh thể canxi oxalat. Gây sưng, rát miệng và buồn nôn nếu chó mèo ăn phải.",
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
    ]
  },
  "sansevieria-trifasciata": {
    "id": "sansevieria-trifasciata",
    "slug": "sansevieria-trifasciata",
    "catalogCode": "CANOPY-002",
    "name": "Lưỡi Hổ",
    "scientificName": "Dracaena trifasciata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1610630877758-c0b25e7144e7?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1610630877758-c0b25e7144e7?auto=format&fit=crop&w=800&q=80",
        "alt": "Chậu cây lưỡi hổ trong phòng ngủ",
        "isPrimary": true
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
      "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước"
    ],
    "shortDesc": "Loài cây vô cùng bền bỉ, nổi tiếng với khả năng lọc khí độc ban đêm. Phù hợp cho những người bận rộn nhất.",
    "origin": "Vùng sinh trưởng: north, central, south, highlands",
    "purpose": "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước.",
    "water": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "light": "Ánh sáng: low. Chịu bóng tốt, sống khỏe trong góc tối.",
    "soil": "Đất dành cho xương rồng/sen đá, thoát nước cực kỳ tốt, pha nhiều cát/đá pumice.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Lưỡi Hổ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "waterVol": "150 ml",
    "waterFreq": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho low",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất dành cho xương r",
    "soilBar": "85%",
    "soilSub": "Chậu đất nung (terracotta) giúp thoát hơi nước nhanh.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước.",
      "soil": "Đất dành cho xương rồng/sen đá, thoát nước cực kỳ tốt, pha nhiều cát/đá pumice.",
      "container": "Chậu đất nung (terracotta) giúp thoát hơi nước nhanh.",
      "watering": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
      "routineCare": "Tuyệt đối không để đọng nước ở lõi cây. Hiếm khi cần bón phân.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Gây rối loạn tiêu hóa nhẹ ở chó mèo nếu nhai phải lá.",
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
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "zz-plant",
      "aloe-vera"
    ]
  },
  "ficus-lyrata": {
    "id": "ficus-lyrata",
    "slug": "ficus-lyrata",
    "catalogCode": "CANOPY-003",
    "name": "Bàng Singapore",
    "scientificName": "Ficus lyrata",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1612474149814-c36da41753c1?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1612474149814-c36da41753c1?auto=format&fit=crop&w=800&q=80",
        "alt": "Bàng Singapore đặt cạnh cửa sổ",
        "isPrimary": true
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
      "Cây thân gỗ đứng, phát triển cao lớn"
    ],
    "shortDesc": "Sở hữu những chiếc lá to hình đàn tỳ bà, mang lại cấu trúc thẳng đứng mạnh mẽ và điểm nhấn kiến trúc cho mọi góc phòng.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Cây thân gỗ đứng, phát triển cao lớn. Lá to, mọc cách đều.",
    "water": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng tiêu chuẩn, giàu mùn hữu cơ và thông thoáng.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Bàng Singapore đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng tiêu chuẩn",
    "soilBar": "85%",
    "soilSub": "Chậu nặng, chắc chắn để giữ thăng bằng cho cây cao.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "terrace"
      ],
      "growthHabit": "Cây thân gỗ đứng, phát triển cao lớn. Lá to, mọc cách đều.",
      "soil": "Đất trồng tiêu chuẩn, giàu mùn hữu cơ và thông thoáng.",
      "container": "Chậu nặng, chắc chắn để giữ thăng bằng cho cây cao.",
      "watering": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
      "routineCare": "Thường xuyên xoay chậu 90 độ mỗi tháng để cây phát triển thẳng. Rất nhạy cảm với việc thay đổi vị trí.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Nhựa cây có thể gây kích ứng da nghiêm trọng và độc với thú cưng.",
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
    ]
  },
  "calathea-orbifolia": {
    "id": "calathea-orbifolia",
    "slug": "calathea-orbifolia",
    "catalogCode": "CANOPY-004",
    "name": "Đuôi Công Tròn",
    "scientificName": "Calathea orbifolia",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616690710400-a16d146927c5?auto=format&fit=crop&w=800&q=80",
        "alt": "Lá cây Đuôi công sọc bạc",
        "isPrimary": true
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
      "Phát triển theo bụi, lá di chuyển (cụp lại) vào ban đêm theo nhịp sinh học (Nyctinasty)"
    ],
    "shortDesc": "Nổi bật với những chiếc lá to bản có sọc bạc tinh tế. Loài cây khó tính nhưng vô cùng lộng lẫy, xứng đáng cho những người yêu thích sự hoàn mỹ.",
    "origin": "Vùng sinh trưởng: central, south",
    "purpose": "Phát triển theo bụi, lá di chuyển (cụp lại) vào ban đêm theo nhịp sinh học (Nyctinasty).",
    "water": "Yêu cầu nước lọc hoặc nước cất. Tưới ngay khi bề mặt đất vừa chớm khô, luôn giữ đất ẩm nhẹ.",
    "light": "Ánh sáng: medium. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất giữ ẩm tốt nhưng không được sũng nước (xơ dừa, perlite, mùn cưa).",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Đuôi Công Tròn đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Yêu cầu nước lọc hoặc nước cất. Tưới ngay khi bề mặt đất vừa chớm khô, luôn giữ đất ẩm nhẹ.",
    "waterVol": "350 ml",
    "waterFreq": "Yêu cầu nước lọc hoặc nước cất. Tưới ngay khi bề mặt đất vừa chớm khô, luôn giữ đất ẩm nhẹ.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho medium",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất giữ ẩm tốt nhưng",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa giữ ẩm tốt.",
    "guide": {
      "environments": [
        "indoor",
        "office"
      ],
      "growthHabit": "Phát triển theo bụi, lá di chuyển (cụp lại) vào ban đêm theo nhịp sinh học (Nyctinasty).",
      "soil": "Đất giữ ẩm tốt nhưng không được sũng nước (xơ dừa, perlite, mùn cưa).",
      "container": "Chậu nhựa giữ ẩm tốt.",
      "watering": "Yêu cầu nước lọc hoặc nước cất. Tưới ngay khi bề mặt đất vừa chớm khô, luôn giữ đất ẩm nhẹ.",
      "routineCare": "Đòi hỏi độ ẩm không khí rất cao (>60%). Cần dùng máy phun sương nếu dùng điều hòa.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Hoàn toàn an toàn cho mèo, chó và trẻ nhỏ.",
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
    ]
  },
  "lavandula-angustifolia": {
    "id": "lavandula-angustifolia",
    "slug": "lavandula-angustifolia",
    "catalogCode": "CANOPY-005",
    "name": "Hương Thảo Oải Hương (Lavender)",
    "scientificName": "Lavandula angustifolia",
    "category": "herb",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1595963955621-c167b0d778fb?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1595963955621-c167b0d778fb?auto=format&fit=crop&w=800&q=80",
        "alt": "Cánh đồng Oải Hương rực rỡ",
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
      "Cây bụi, phân nhánh nhiều, ưa gió và khô ráo"
    ],
    "shortDesc": "Thảo mộc ôn đới mang hương thơm thư giãn đặc trưng, cần rất nhiều nắng và môi trường thông thoáng. Trị liệu tuyệt vời cho giấc ngủ.",
    "origin": "Vùng sinh trưởng: highlands",
    "purpose": "Cây bụi, phân nhánh nhiều, ưa gió và khô ráo.",
    "water": "Để đất khô hoàn toàn giữa các lần tưới. Tuyệt đối tránh tưới lên lá gây nấm.",
    "light": "Ánh sáng: full-sun. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất kiềm tính, pha cực nhiều sỏi cát để thoát nước ngay lập tức.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Hương Thảo Oải Hương (Lavender) đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Để đất khô hoàn toàn giữa các lần tưới. Tuyệt đối tránh tưới lên lá gây nấm.",
    "waterVol": "150 ml",
    "waterFreq": "Để đất khô hoàn toàn giữa các lần tưới. Tuyệt đối tránh tưới lên lá gây nấm.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Cường độ quang phổ chuẩn cho full-sun",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất kiềm tính",
    "soilBar": "85%",
    "soilSub": "Chậu đất nung, chậu to có lớp sỏi lót đáy.",
    "guide": {
      "environments": [
        "balcony",
        "garden",
        "terrace"
      ],
      "growthHabit": "Cây bụi, phân nhánh nhiều, ưa gió và khô ráo.",
      "soil": "Đất kiềm tính, pha cực nhiều sỏi cát để thoát nước ngay lập tức.",
      "container": "Chậu đất nung, chậu to có lớp sỏi lót đáy.",
      "watering": "Để đất khô hoàn toàn giữa các lần tưới. Tuyệt đối tránh tưới lên lá gây nấm.",
      "routineCare": "Cắt tỉa 1/3 cây sau mỗi mùa hoa để kích thích mọc nhánh mới. Tránh nơi độ ẩm cao.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Chứa linalool và linalyl acetate có thể độc cho chó mèo.",
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
    ]
  },
  "epipremnum-aureum": {
    "id": "epipremnum-aureum",
    "slug": "epipremnum-aureum",
    "catalogCode": "CANOPY-006",
    "name": "Trầu Bà Vàng",
    "scientificName": "Epipremnum aureum",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1644485573429-1065b93d6d09?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1644485573429-1065b93d6d09?auto=format&fit=crop&w=800&q=80",
        "alt": "Dây trầu bà vàng leo trên kệ",
        "isPrimary": true
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
      "Thân leo dài, rễ phụ bám chắc"
    ],
    "shortDesc": "Cây leo vô cùng dễ trồng, mang đến sắc xanh tươi mát và thanh lọc không khí cực tốt. Phù hợp trồng treo hoặc thủy sinh.",
    "origin": "Vùng sinh trưởng: north, central, south, highlands",
    "purpose": "Thân leo dài, rễ phụ bám chắc. Cắt tỉa để nhánh um tùm hơn.",
    "water": "Tưới 1 lần/tuần, chịu hạn khá tốt.",
    "light": "Ánh sáng: low. Chịu bóng tốt, sống khỏe trong góc tối.",
    "soil": "Đất trồng cơ bản, thoát nước vừa phải.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Trầu Bà Vàng đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới 1 lần/tuần, chịu hạn khá tốt.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới 1 lần/tuần, chịu hạn khá tốt.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho low",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng cơ bản",
    "soilBar": "85%",
    "soilSub": "Chậu treo hoặc chậu để bàn, có thể trồng thủy sinh.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Thân leo dài, rễ phụ bám chắc. Cắt tỉa để nhánh um tùm hơn.",
      "soil": "Đất trồng cơ bản, thoát nước vừa phải.",
      "container": "Chậu treo hoặc chậu để bàn, có thể trồng thủy sinh.",
      "watering": "Tưới 1 lần/tuần, chịu hạn khá tốt.",
      "routineCare": "Bón phân dạng lỏng 2 tháng/lần.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Gây kích ứng miệng và nôn mửa cho vật nuôi.",
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
    ]
  },
  "zamioculcas-zamiifolia": {
    "id": "zamioculcas-zamiifolia",
    "slug": "zamioculcas-zamiifolia",
    "catalogCode": "CANOPY-007",
    "name": "Kim Tiền",
    "scientificName": "Zamioculcas zamiifolia",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1632207691143-643e2a9a9361?auto=format&fit=crop&w=800&q=80",
        "alt": "Chậu Kim Tiền xanh mướt",
        "isPrimary": true
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
      "Phát triển chậm, thân ngầm (rhizome) trữ nước"
    ],
    "shortDesc": "Loài cây nổi tiếng với khả năng sinh tồn mạnh mẽ, thân mọng nước và lá xanh bóng. Tượng trưng cho sự thịnh vượng.",
    "origin": "Vùng sinh trưởng: north, central, south",
    "purpose": "Phát triển chậm, thân ngầm (rhizome) trữ nước.",
    "water": "Chỉ tưới khi đất khô hoàn toàn (2-3 tuần/lần). Tránh tưới úng.",
    "light": "Ánh sáng: low. Chịu bóng tốt, sống khỏe trong góc tối.",
    "soil": "Đất trồng xương rồng/sen đá, thoát nước nhanh.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Kim Tiền đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Chỉ tưới khi đất khô hoàn toàn (2-3 tuần/lần). Tránh tưới úng.",
    "waterVol": "150 ml",
    "waterFreq": "Chỉ tưới khi đất khô hoàn toàn (2-3 tuần/lần). Tránh tưới úng.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho low",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng xương rồng",
    "soilBar": "85%",
    "soilSub": "Chậu gốm hoặc đất nung.",
    "guide": {
      "environments": [
        "indoor",
        "office"
      ],
      "growthHabit": "Phát triển chậm, thân ngầm (rhizome) trữ nước.",
      "soil": "Đất trồng xương rồng/sen đá, thoát nước nhanh.",
      "container": "Chậu gốm hoặc đất nung.",
      "watering": "Chỉ tưới khi đất khô hoàn toàn (2-3 tuần/lần). Tránh tưới úng.",
      "routineCare": "Lau sạch lá để tăng khả năng quang hợp.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Gây rát miệng, kích ứng da nhẹ.",
        "source": "Pet Poison Helpline"
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
    ]
  },
  "spathiphyllum": {
    "id": "spathiphyllum",
    "slug": "spathiphyllum",
    "catalogCode": "CANOPY-008",
    "name": "Lan Ý (Huệ Hòa Bình)",
    "scientificName": "Spathiphyllum wallisii",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1593691509543-c20fb144e117?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1593691509543-c20fb144e117?auto=format&fit=crop&w=800&q=80",
        "alt": "Hoa Lan Ý trắng muốt",
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
      "Mọc thành bụi, lá rủ xuống khi thiếu nước và tươi lại ngay khi được tưới"
    ],
    "shortDesc": "Cây lọc không khí cực tốt (đứng đầu danh sách NASA), ra hoa trắng thanh tao và có khả năng báo hiệu khi thiếu nước.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Mọc thành bụi, lá rủ xuống khi thiếu nước và tươi lại ngay khi được tưới.",
    "water": "Tưới 2-3 lần/tuần. Giữ đất luôn hơi ẩm nhưng không úng.",
    "light": "Ánh sáng: medium. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất giàu mùn, giữ ẩm tốt.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Lan Ý (Huệ Hòa Bình) đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Tưới 2-3 lần/tuần. Giữ đất luôn hơi ẩm nhưng không úng.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới 2-3 lần/tuần. Giữ đất luôn hơi ẩm nhưng không úng.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho medium",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất giàu mùn",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa hoặc gốm sứ.",
    "guide": {
      "environments": [
        "indoor",
        "office"
      ],
      "growthHabit": "Mọc thành bụi, lá rủ xuống khi thiếu nước và tươi lại ngay khi được tưới.",
      "soil": "Đất giàu mùn, giữ ẩm tốt.",
      "container": "Chậu nhựa hoặc gốm sứ.",
      "watering": "Tưới 2-3 lần/tuần. Giữ đất luôn hơi ẩm nhưng không úng.",
      "routineCare": "Cắt bỏ hoa tàn ở sát gốc để cây tập trung dinh dưỡng.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Gây kích ứng mạnh ở miệng do tinh thể canxi oxalat.",
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
    ]
  },
  "chlorophytum-comosum": {
    "id": "chlorophytum-comosum",
    "slug": "chlorophytum-comosum",
    "catalogCode": "CANOPY-009",
    "name": "Cỏ Lan Chi",
    "scientificName": "Chlorophytum comosum",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1616016769032-47533f0e8f00?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616016769032-47533f0e8f00?auto=format&fit=crop&w=800&q=80",
        "alt": "Cỏ Lan Chi trong giỏ treo",
        "isPrimary": true
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
      "Phát triển thành cụm rậm rạp, sinh ra nhánh cây con có rễ rủ xuống đung đưa"
    ],
    "shortDesc": "Một trong những loài cây dễ chăm sóc nhất thế giới, với những dải lá xanh sọc trắng duyên dáng và những cây con rủ xuống như mạng nhện.",
    "origin": "Vùng sinh trưởng: north, central, south, highlands",
    "purpose": "Phát triển thành cụm rậm rạp, sinh ra nhánh cây con có rễ rủ xuống đung đưa.",
    "water": "Tưới đều khi bề mặt đất khô 2cm. Nhạy cảm với nước chứa nhiều clo (sẽ làm cháy chóp lá).",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng cơ bản, thoát nước tốt.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Cỏ Lan Chi đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới đều khi bề mặt đất khô 2cm. Nhạy cảm với nước chứa nhiều clo (sẽ làm cháy chóp lá).",
    "waterVol": "350 ml",
    "waterFreq": "Tưới đều khi bề mặt đất khô 2cm. Nhạy cảm với nước chứa nhiều clo (sẽ làm cháy chóp lá).",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng cơ bản",
    "soilBar": "85%",
    "soilSub": "Giỏ treo hoặc chậu để kệ cao.",
    "guide": {
      "environments": [
        "indoor",
        "balcony",
        "office"
      ],
      "growthHabit": "Phát triển thành cụm rậm rạp, sinh ra nhánh cây con có rễ rủ xuống đung đưa.",
      "soil": "Đất trồng cơ bản, thoát nước tốt.",
      "container": "Giỏ treo hoặc chậu để kệ cao.",
      "watering": "Tưới đều khi bề mặt đất khô 2cm. Nhạy cảm với nước chứa nhiều clo (sẽ làm cháy chóp lá).",
      "routineCare": "Có thể ngắt cây con để nhân giống dễ dàng.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Hoàn toàn an toàn. Mèo rất thích chơi với lá của cây này.",
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
    ]
  },
  "ficus-elastica": {
    "id": "ficus-elastica",
    "slug": "ficus-elastica",
    "catalogCode": "CANOPY-010",
    "name": "Đa Búp Đỏ",
    "scientificName": "Ficus elastica",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1601111002341-b84784a92306?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1601111002341-b84784a92306?auto=format&fit=crop&w=800&q=80",
        "alt": "Lá Đa Búp Đỏ bóng bẩy",
        "isPrimary": true
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
      "Phát triển nhanh nếu đủ sáng"
    ],
    "shortDesc": "Cây thân gỗ nội thất với những chiếc lá dày bóng bẩy, màu sắc đậm đà. Mang lại vẻ đẹp mạnh mẽ và sang trọng.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Phát triển nhanh nếu đủ sáng. Có thể cắt ngọn để cây phân nhánh đâm chồi ngang.",
    "water": "Đợi đất thật khô rồi tưới đẫm. Dễ bị rụng lá nếu tưới quá dư.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất tơi xốp, thoát nước cực kỳ tốt.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Đa Búp Đỏ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Đợi đất thật khô rồi tưới đẫm. Dễ bị rụng lá nếu tưới quá dư.",
    "waterVol": "350 ml",
    "waterFreq": "Đợi đất thật khô rồi tưới đẫm. Dễ bị rụng lá nếu tưới quá dư.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất tơi xốp",
    "soilBar": "85%",
    "soilSub": "Chậu nặng đáy sâu để chịu được trọng lượng cây lớn.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Phát triển nhanh nếu đủ sáng. Có thể cắt ngọn để cây phân nhánh đâm chồi ngang.",
      "soil": "Đất tơi xốp, thoát nước cực kỳ tốt.",
      "container": "Chậu nặng đáy sâu để chịu được trọng lượng cây lớn.",
      "watering": "Đợi đất thật khô rồi tưới đẫm. Dễ bị rụng lá nếu tưới quá dư.",
      "routineCare": "Dùng khăn ẩm lau mặt lá thường xuyên để giữ độ bóng.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Nhựa mủ trắng (latex) gây kích ứng da, nôn mửa cho chó mèo.",
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
    ]
  },
  "philodendron-birkin": {
    "id": "philodendron-birkin",
    "slug": "philodendron-birkin",
    "catalogCode": "CANOPY-011",
    "name": "Trầu Bà Đế Vương Xọc (Birkin)",
    "scientificName": "Philodendron 'Birkin'",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1643194090729-3079db444a1e?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1643194090729-3079db444a1e?auto=format&fit=crop&w=800&q=80",
        "alt": "Lá sọc trắng của Philodendron Birkin",
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
      "Phát triển bụi thấp (compact), không vươn dài bám rêu như các dòng Philodendron khác"
    ],
    "shortDesc": "Giống cây đột biến tuyệt đẹp với những đường sọc trắng tinh tế trên nền lá xanh đậm, càng nhiều sáng vạch trắng càng dày.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Phát triển bụi thấp (compact), không vươn dài bám rêu như các dòng Philodendron khác.",
    "water": "Tưới khi 3cm đất mặt khô, yêu cầu độ ẩm trung bình cao.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất giàu mùn (peat moss), thông thoáng nhờ đá perlite.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Trầu Bà Đế Vương Xọc (Birkin) đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới khi 3cm đất mặt khô, yêu cầu độ ẩm trung bình cao.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới khi 3cm đất mặt khô, yêu cầu độ ẩm trung bình cao.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất giàu mùn (peat m",
    "soilBar": "85%",
    "soilSub": "Chậu vừa phải (size 12-15cm).",
    "guide": {
      "environments": [
        "indoor",
        "office"
      ],
      "growthHabit": "Phát triển bụi thấp (compact), không vươn dài bám rêu như các dòng Philodendron khác.",
      "soil": "Đất giàu mùn (peat moss), thông thoáng nhờ đá perlite.",
      "container": "Chậu vừa phải (size 12-15cm).",
      "watering": "Tưới khi 3cm đất mặt khô, yêu cầu độ ẩm trung bình cao.",
      "routineCare": "Tránh ánh nắng gắt trực tiếp làm cháy lá.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Độc tương tự các dòng họ Ráy (Araceae).",
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
    ]
  },
  "alocasia-amazonica": {
    "id": "alocasia-amazonica",
    "slug": "alocasia-amazonica",
    "catalogCode": "CANOPY-012",
    "name": "Môn Quan Âm",
    "scientificName": "Alocasia amazonica (Polly)",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1620601618146-52fcecefb060?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1620601618146-52fcecefb060?auto=format&fit=crop&w=800&q=80",
        "alt": "Cây Môn Quan Âm góc cận",
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
      "Mọc từ củ ngầm, thân đứng, có hiện tượng ngủ đông rụng lá vào mùa lạnh"
    ],
    "shortDesc": "Lá hình mũi tên ấn tượng với đường gân nổi trắng sáng, mép lá lượn sóng mang đến dáng vẻ nguyên thủy độc nhất.",
    "origin": "Vùng sinh trưởng: central, south",
    "purpose": "Mọc từ củ ngầm, thân đứng, có hiện tượng ngủ đông rụng lá vào mùa lạnh.",
    "water": "Cần tưới ngay khi bề mặt chớm khô, tuyệt đối không để bầu rễ khô khốc hoàn toàn.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất cực kỳ xốp nhưng giữ ẩm tốt (xơ dừa, perlite dồi dào).",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Môn Quan Âm đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Cần tưới ngay khi bề mặt chớm khô, tuyệt đối không để bầu rễ khô khốc hoàn toàn.",
    "waterVol": "350 ml",
    "waterFreq": "Cần tưới ngay khi bề mặt chớm khô, tuyệt đối không để bầu rễ khô khốc hoàn toàn.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất cực kỳ xốp nhưng",
    "soilBar": "85%",
    "soilSub": "Chậu sứ, lỗ thoát nước lớn.",
    "guide": {
      "environments": [
        "indoor",
        "terrace"
      ],
      "growthHabit": "Mọc từ củ ngầm, thân đứng, có hiện tượng ngủ đông rụng lá vào mùa lạnh.",
      "soil": "Đất cực kỳ xốp nhưng giữ ẩm tốt (xơ dừa, perlite dồi dào).",
      "container": "Chậu sứ, lỗ thoát nước lớn.",
      "watering": "Cần tưới ngay khi bề mặt chớm khô, tuyệt đối không để bầu rễ khô khốc hoàn toàn.",
      "routineCare": "Cần độ ẩm rất cao (>60%). Đề phòng nhện đỏ vào mùa hanh khô.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Rất độc, có thể gây tắc nghẽn đường thở nếu nuốt phải lượng lớn.",
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
    ]
  },
  "crassula-ovata": {
    "id": "crassula-ovata",
    "slug": "crassula-ovata",
    "catalogCode": "CANOPY-013",
    "name": "Ngọc Bích",
    "scientificName": "Crassula ovata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1632782343883-eb80c7db2eb2?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1632782343883-eb80c7db2eb2?auto=format&fit=crop&w=800&q=80",
        "alt": "Cây Ngọc Bích đầy đặn dưới nắng",
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
      "Thân gỗ, lớn chậm, có thể tạo dáng bonsai"
    ],
    "shortDesc": "Cây mọng nước dạng bụi cây gỗ nhỏ. Theo phong thủy mang ý nghĩa thu hút tài lộc và tuổi thọ.",
    "origin": "Vùng sinh trưởng: north, highlands, central, south",
    "purpose": "Thân gỗ, lớn chậm, có thể tạo dáng bonsai.",
    "water": "Thật hạn chế, tưới 1 lần/tháng vào mùa đông, 2 tuần/lần mùa hè khi đất thật khô.",
    "light": "Ánh sáng: full-sun. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất cho sen đá/xương rồng.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Ngọc Bích đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Thật hạn chế, tưới 1 lần/tháng vào mùa đông, 2 tuần/lần mùa hè khi đất thật khô.",
    "waterVol": "150 ml",
    "waterFreq": "Thật hạn chế, tưới 1 lần/tháng vào mùa đông, 2 tuần/lần mùa hè khi đất thật khô.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Cường độ quang phổ chuẩn cho full-sun",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất cho sen đá/xương",
    "soilBar": "85%",
    "soilSub": "Chậu đất nung nông vừa phải.",
    "guide": {
      "environments": [
        "balcony",
        "window-sill",
        "terrace"
      ],
      "growthHabit": "Thân gỗ, lớn chậm, có thể tạo dáng bonsai.",
      "soil": "Đất cho sen đá/xương rồng.",
      "container": "Chậu đất nung nông vừa phải.",
      "watering": "Thật hạn chế, tưới 1 lần/tháng vào mùa đông, 2 tuần/lần mùa hè khi đất thật khô.",
      "routineCare": "Phơi nắng trực tiếp vài giờ mỗi ngày sẽ giúp mép lá viền đỏ tươi rất đẹp.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Có thể gây trầm cảm, nôn mửa, nhịp tim bất thường cho chó mèo.",
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
    ]
  },
  "strelitzia-reginae": {
    "id": "strelitzia-reginae",
    "slug": "strelitzia-reginae",
    "catalogCode": "CANOPY-014",
    "name": "Thiên Điểu",
    "scientificName": "Strelitzia reginae",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1596700877894-3708e2ec05fb?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596700877894-3708e2ec05fb?auto=format&fit=crop&w=800&q=80",
        "alt": "Hoa Thiên Điểu rực rỡ dưới nắng",
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
      "Phát triển lớn, có thể cao tới 1"
    ],
    "shortDesc": "Loài cây nhiệt đới với bông hoa rực rỡ mang hình dáng chim thiên điểu đang bay. Tán lá lớn toát lên sự sang trọng.",
    "origin": "Vùng sinh trưởng: central, south",
    "purpose": "Phát triển lớn, có thể cao tới 1.5 - 2 mét. Hoa nở vào cuối đông/xuân nếu đủ sáng.",
    "water": "Giữ đất ẩm vào mùa Hè, giảm tưới mùa Đông.",
    "light": "Ánh sáng: full-sun. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất thịt màu mỡ pha cát.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Thiên Điểu đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Giữ đất ẩm vào mùa Hè, giảm tưới mùa Đông.",
    "waterVol": "350 ml",
    "waterFreq": "Giữ đất ẩm vào mùa Hè, giảm tưới mùa Đông.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Cường độ quang phổ chuẩn cho full-sun",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất thịt màu mỡ pha ",
    "soilBar": "85%",
    "soilSub": "Chậu rất lớn, nặng.",
    "guide": {
      "environments": [
        "garden",
        "balcony",
        "terrace"
      ],
      "growthHabit": "Phát triển lớn, có thể cao tới 1.5 - 2 mét. Hoa nở vào cuối đông/xuân nếu đủ sáng.",
      "soil": "Đất thịt màu mỡ pha cát.",
      "container": "Chậu rất lớn, nặng.",
      "watering": "Giữ đất ẩm vào mùa Hè, giảm tưới mùa Đông.",
      "routineCare": "Cần rất nhiều ánh sáng (ít nhất 4-6h nắng trực tiếp mỗi ngày) để ra hoa.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Quả/Hạt có chứa tannin độc hại. Lá gây kích ứng nhẹ.",
        "source": "Pet Poison Helpline"
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
    ]
  },
  "nephrolepis-exaltata": {
    "id": "nephrolepis-exaltata",
    "slug": "nephrolepis-exaltata",
    "catalogCode": "CANOPY-015",
    "name": "Dương Xỉ Boston",
    "scientificName": "Nephrolepis exaltata",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1616886470077-d35b1d564efc?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1616886470077-d35b1d564efc?auto=format&fit=crop&w=800&q=80",
        "alt": "Giỏ treo Dương xỉ Boston",
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
      "Mọc cụm, lá kép lông chim rủ dài"
    ],
    "shortDesc": "Tán lá mỏng, nhẹ và rủ xuống uyển chuyển. Chuyên gia lọc khí độc trong nhà và tạo độ ẩm tự nhiên.",
    "origin": "Vùng sinh trưởng: north, highlands, south",
    "purpose": "Mọc cụm, lá kép lông chim rủ dài.",
    "water": "Yêu cầu đất LUÔN ẨM (nhưng không sũng nước). Đừng bao giờ để đất khô kiệt.",
    "light": "Ánh sáng: medium. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất giàu mùn (peat moss) giữ ẩm cực tốt.",
    "humidity": "70% – 90%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "500 ml / 3 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Dương Xỉ Boston đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "500 ml",
    "waterBar": "92%",
    "waterSub": "Yêu cầu đất LUÔN ẨM (nhưng không sũng nước). Đừng bao giờ để đất khô kiệt.",
    "waterVol": "350 ml",
    "waterFreq": "Yêu cầu đất LUÔN ẨM (nhưng không sũng nước). Đừng bao giờ để đất khô kiệt.",
    "humidityVal": "78% RH",
    "humidityBar": "85%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho medium",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất giàu mùn (peat m",
    "soilBar": "85%",
    "soilSub": "Chậu treo nhựa hoặc gốm không men.",
    "guide": {
      "environments": [
        "indoor",
        "bathroom",
        "balcony"
      ],
      "growthHabit": "Mọc cụm, lá kép lông chim rủ dài.",
      "soil": "Đất giàu mùn (peat moss) giữ ẩm cực tốt.",
      "container": "Chậu treo nhựa hoặc gốm không men.",
      "watering": "Yêu cầu đất LUÔN ẨM (nhưng không sũng nước). Đừng bao giờ để đất khô kiệt.",
      "routineCare": "Thích hợp treo trong phòng tắm hoặc nơi có máy phun sương. Thường xuyên rụng lá khô.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Hoàn toàn an toàn cho thú cưng và con người.",
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
    ]
  },
  "senecio-rowleyanus": {
    "id": "senecio-rowleyanus",
    "slug": "senecio-rowleyanus",
    "catalogCode": "CANOPY-016",
    "name": "Chuỗi Ngọc",
    "scientificName": "Senecio rowleyanus",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=800&q=80",
        "alt": "Chuỗi ngọc buông thõng",
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
      "Mọc rủ rất dài (có thể tới 1 mét), rễ nông"
    ],
    "shortDesc": "Loại cây mọng nước dạng dây leo với những chiếc lá nhỏ nhắn hình hạt ngọc nối tiếp nhau rất đẹp mắt.",
    "origin": "Vùng sinh trưởng: highlands, central",
    "purpose": "Mọc rủ rất dài (có thể tới 1 mét), rễ nông.",
    "water": "Tưới thật ít, chỉ tưới khi các hạt ngọc có dấu hiệu hơi nhăn lại. Chết cực nhanh nếu dư nước.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất xương rồng, nhiều đá bọt/pumice.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Chuỗi Ngọc đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Tưới thật ít, chỉ tưới khi các hạt ngọc có dấu hiệu hơi nhăn lại. Chết cực nhanh nếu dư nước.",
    "waterVol": "150 ml",
    "waterFreq": "Tưới thật ít, chỉ tưới khi các hạt ngọc có dấu hiệu hơi nhăn lại. Chết cực nhanh nếu dư nước.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất xương rồng",
    "soilBar": "85%",
    "soilSub": "Chậu treo nông (shallow pot) vì rễ cây rất mỏng.",
    "guide": {
      "environments": [
        "indoor",
        "window-sill",
        "balcony"
      ],
      "growthHabit": "Mọc rủ rất dài (có thể tới 1 mét), rễ nông.",
      "soil": "Đất xương rồng, nhiều đá bọt/pumice.",
      "container": "Chậu treo nông (shallow pot) vì rễ cây rất mỏng.",
      "watering": "Tưới thật ít, chỉ tưới khi các hạt ngọc có dấu hiệu hơi nhăn lại. Chết cực nhanh nếu dư nước.",
      "routineCare": "Đảm bảo ánh sáng hắt sáng mạnh ở TẬN GỐC cây để gốc không bị thối.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Gây tiêu chảy và nôn mửa; nhựa cây gây ngứa rát ngoài da.",
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
    ]
  },
  "hedera-helix": {
    "id": "hedera-helix",
    "slug": "hedera-helix",
    "catalogCode": "CANOPY-017",
    "name": "Thường Xuân",
    "scientificName": "Hedera helix",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1628151016551-789a552528dc?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1628151016551-789a552528dc?auto=format&fit=crop&w=800&q=80",
        "alt": "Dây thường xuân leo mảng",
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
      "Leo bám tốt trên mặt tường hoặc rủ rậm rạp từ giỏ treo"
    ],
    "shortDesc": "Dây leo duyên dáng đậm chất châu Âu, khả năng chịu lạnh giỏi và giúp lọc loại bỏ nấm mốc trong không khí.",
    "origin": "Vùng sinh trưởng: north, highlands",
    "purpose": "Leo bám tốt trên mặt tường hoặc rủ rậm rạp từ giỏ treo.",
    "water": "Tưới khi bề mặt đất khô. Tránh để sũng nước.",
    "light": "Ánh sáng: medium. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất ẩm vừa phải, hơi phèn.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Thường Xuân đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới khi bề mặt đất khô. Tránh để sũng nước.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới khi bề mặt đất khô. Tránh để sũng nước.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho medium",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất ẩm vừa phải",
    "soilBar": "85%",
    "soilSub": "Chậu sứ, giỏ treo.",
    "guide": {
      "environments": [
        "indoor",
        "balcony",
        "garden"
      ],
      "growthHabit": "Leo bám tốt trên mặt tường hoặc rủ rậm rạp từ giỏ treo.",
      "soil": "Đất ẩm vừa phải, hơi phèn.",
      "container": "Chậu sứ, giỏ treo.",
      "watering": "Tưới khi bề mặt đất khô. Tránh để sũng nước.",
      "routineCare": "Hay bị nhện đỏ tấn công nếu không khí quá khô nóng.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Lá chứa triterpenoid saponins gây kích ứng tiêu hóa.",
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
    ]
  },
  "aspidistra-elatior": {
    "id": "aspidistra-elatior",
    "slug": "aspidistra-elatior",
    "catalogCode": "CANOPY-018",
    "name": "Cô Tòng (Tỏi Rừng)",
    "scientificName": "Aspidistra elatior",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1624897262529-577bfafdb7d7?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1624897262529-577bfafdb7d7?auto=format&fit=crop&w=800&q=80",
        "alt": "Khóm Cô Tòng xanh sẫm",
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
      "Mọc từ rễ củ (rhizome), lá xanh sẫm, vươn dài, phát triển siêu chậm"
    ],
    "shortDesc": "Được mệnh danh là 'Cast Iron Plant' (Cây Gang Thép) vì khả năng chịu đựng bóng tối dày đặc, khô hạn và sự bỏ bê.",
    "origin": "Vùng sinh trưởng: north, central, south",
    "purpose": "Mọc từ rễ củ (rhizome), lá xanh sẫm, vươn dài, phát triển siêu chậm.",
    "water": "Chịu hạn xuất sắc, có thể tưới 2 tuần 1 lần.",
    "light": "Ánh sáng: low. Chịu bóng tốt, sống khỏe trong góc tối.",
    "soil": "Đất cơ bản, thoát nước tốt.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Non-Toxic (Pet Safe)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Cô Tòng (Tỏi Rừng) đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Chịu hạn xuất sắc, có thể tưới 2 tuần 1 lần.",
    "waterVol": "150 ml",
    "waterFreq": "Chịu hạn xuất sắc, có thể tưới 2 tuần 1 lần.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho low",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất cơ bản",
    "soilBar": "85%",
    "soilSub": "Bất kỳ chậu nào có lỗ thoát nước.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "dark-corners"
      ],
      "growthHabit": "Mọc từ rễ củ (rhizome), lá xanh sẫm, vươn dài, phát triển siêu chậm.",
      "soil": "Đất cơ bản, thoát nước tốt.",
      "container": "Bất kỳ chậu nào có lỗ thoát nước.",
      "watering": "Chịu hạn xuất sắc, có thể tưới 2 tuần 1 lần.",
      "routineCare": "Lau bụi lá để giúp cây bắt sáng tốt hơn do trồng ở góc tối.",
      "toxicityCaution": {
        "pets": "safe",
        "humans": "safe",
        "note": "Hoàn toàn an toàn, lựa chọn tuyệt vời cho nhà nuôi thú cưng.",
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
    ]
  },
  "anthurium-andraeanum": {
    "id": "anthurium-andraeanum",
    "slug": "anthurium-andraeanum",
    "catalogCode": "CANOPY-019",
    "name": "Hồng Môn",
    "scientificName": "Anthurium andraeanum",
    "category": "flower",
    "biome": "subtropical",
    "biomeLabel": "Subtropical Highlands",
    "image": "https://images.unsplash.com/photo-1598270183186-068d83935391?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1598270183186-068d83935391?auto=format&fit=crop&w=800&q=80",
        "alt": "Hồng Môn đỏ rực rỡ",
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
      "Mọc thành cụm bụi nhỏ, rễ khí sinh đôi khi thò ra ngoài đất"
    ],
    "shortDesc": "Sở hữu những chiếc 'hoa' (thực chất là mo lá) màu đỏ rực rỡ hình trái tim, ra hoa liên tục quanh năm nếu đủ sáng.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Mọc thành cụm bụi nhỏ, rễ khí sinh đôi khi thò ra ngoài đất.",
    "water": "Giữ ẩm nhẹ nhưng phải cực kỳ thông thoáng khí ở rễ.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Giống với lan (phối trộn xơ dừa, dớn, vỏ thông, than củi).",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Hồng Môn đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Giữ ẩm nhẹ nhưng phải cực kỳ thông thoáng khí ở rễ.",
    "waterVol": "350 ml",
    "waterFreq": "Giữ ẩm nhẹ nhưng phải cực kỳ thông thoáng khí ở rễ.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Giống với lan (phối ",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa/sứ nhỏ gọn.",
    "guide": {
      "environments": [
        "indoor",
        "office"
      ],
      "growthHabit": "Mọc thành cụm bụi nhỏ, rễ khí sinh đôi khi thò ra ngoài đất.",
      "soil": "Giống với lan (phối trộn xơ dừa, dớn, vỏ thông, than củi).",
      "container": "Chậu nhựa/sứ nhỏ gọn.",
      "watering": "Giữ ẩm nhẹ nhưng phải cực kỳ thông thoáng khí ở rễ.",
      "routineCare": "Bón phân dạng lỏng pha thật loãng hàng tuần vào mùa sinh trưởng.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Chứa canxi oxalat, gây sưng miệng, lưỡi và họng.",
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
    ]
  },
  "aloe-vera": {
    "id": "aloe-vera",
    "slug": "aloe-vera",
    "catalogCode": "CANOPY-020",
    "name": "Nha Đam (Lô Hội)",
    "scientificName": "Aloe vera",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1596547609652-9cb5d4d7308e?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1596547609652-9cb5d4d7308e?auto=format&fit=crop&w=800&q=80",
        "alt": "Nha đam mọng nước xanh tốt",
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
      "Lá mọc vươn dài thành hình hoa thị, sinh nhiều cây con ở gốc"
    ],
    "shortDesc": "Thực vật mọng nước nổi danh toàn cầu về công dụng y tế (trị phỏng, làm dịu da). Sống cực kỳ bền trong nhà.",
    "origin": "Vùng sinh trưởng: north, central, south, highlands",
    "purpose": "Lá mọc vươn dài thành hình hoa thị, sinh nhiều cây con ở gốc.",
    "water": "Tưới thật thưa (2-3 tuần/lần). Chết rất nhanh nếu ngâm rễ trong nước.",
    "light": "Ánh sáng: full-sun. Ưa sáng mạnh và nắng trực tiếp.",
    "soil": "Đất cát pha sỏi, thoát nước tức thì.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Nha Đam (Lô Hội) đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Tưới thật thưa (2-3 tuần/lần). Chết rất nhanh nếu ngâm rễ trong nước.",
    "waterVol": "150 ml",
    "waterFreq": "Tưới thật thưa (2-3 tuần/lần). Chết rất nhanh nếu ngâm rễ trong nước.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "3,000 FC",
    "envBar": "95%",
    "envSub": "Cường độ quang phổ chuẩn cho full-sun",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất cát pha sỏi",
    "soilBar": "85%",
    "soilSub": "Chậu đất nung rộng bề ngang.",
    "guide": {
      "environments": [
        "balcony",
        "window-sill",
        "kitchen"
      ],
      "growthHabit": "Lá mọc vươn dài thành hình hoa thị, sinh nhiều cây con ở gốc.",
      "soil": "Đất cát pha sỏi, thoát nước tức thì.",
      "container": "Chậu đất nung rộng bề ngang.",
      "watering": "Tưới thật thưa (2-3 tuần/lần). Chết rất nhanh nếu ngâm rễ trong nước.",
      "routineCare": "Nên đặt cạnh bậu cửa sổ ngập nắng. Có thể tách cây con sang chậu mới.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Gel trong thì tốt cho da người, nhưng phần vỏ nhựa (latex) vàng chứa saponin độc cho chó mèo.",
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
    ]
  },
  "specimen-monstera": {
    "id": "monstera-deliciosa",
    "slug": "monstera-deliciosa",
    "catalogCode": "CANOPY-001",
    "name": "Trầu bà lá xẻ",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Cây trầu bà lá xẻ tổng thể",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1579730043132-1b1cbdfdcb2d?auto=format&fit=crop&w=800&q=80",
        "alt": "Chi tiết lá xẻ Monstera",
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
      "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành"
    ],
    "shortDesc": "Cây cảnh nội thất kinh điển với phiến lá xẻ độc đáo, mang đậm phong cách nhiệt đới hoang dã. Biểu tượng của không gian Biophilic.",
    "origin": "Vùng sinh trưởng: north, south, central",
    "purpose": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
    "water": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Trầu bà lá xẻ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng giàu mùn",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
      "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
      "container": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
      "watering": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
      "routineCare": "Bón phân NPK loãng 1 tháng/lần vào mùa Xuân/Hạ. Thường xuyên lau bụi trên lá bằng khăn ẩm.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Chứa tinh thể canxi oxalat. Gây sưng, rát miệng và buồn nôn nếu chó mèo ăn phải.",
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
    ]
  },
  "specimen-red-rose": {
    "id": "monstera-deliciosa",
    "slug": "monstera-deliciosa",
    "catalogCode": "CANOPY-001",
    "name": "Trầu bà lá xẻ",
    "scientificName": "Monstera deliciosa",
    "category": "foliage",
    "biome": "tropical",
    "biomeLabel": "Tropical Biome",
    "image": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80",
        "alt": "Cây trầu bà lá xẻ tổng thể",
        "isPrimary": true
      },
      {
        "url": "https://images.unsplash.com/photo-1579730043132-1b1cbdfdcb2d?auto=format&fit=crop&w=800&q=80",
        "alt": "Chi tiết lá xẻ Monstera",
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
      "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành"
    ],
    "shortDesc": "Cây cảnh nội thất kinh điển với phiến lá xẻ độc đáo, mang đậm phong cách nhiệt đới hoang dã. Biểu tượng của không gian Biophilic.",
    "origin": "Vùng sinh trưởng: north, south, central",
    "purpose": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
    "water": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Trầu bà lá xẻ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng giàu mùn",
    "soilBar": "85%",
    "soilSub": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "balcony"
      ],
      "growthHabit": "Dạng thân leo vươn dài, lá xẻ sâu khi trưởng thành. Cần cọc dớn để leo.",
      "soil": "Đất trồng giàu mùn, tơi xốp, kết hợp xơ dừa và đá perlite để thoát nước tốt.",
      "container": "Chậu nhựa hoặc gốm sứ có lỗ thoát nước, đường kính tối thiểu 25cm.",
      "watering": "Tưới 1-2 lần/tuần. Để lớp đất mặt khô 3-5cm trước khi tưới đẫm nước tiếp theo.",
      "routineCare": "Bón phân NPK loãng 1 tháng/lần vào mùa Xuân/Hạ. Thường xuyên lau bụi trên lá bằng khăn ẩm.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Chứa tinh thể canxi oxalat. Gây sưng, rát miệng và buồn nôn nếu chó mèo ăn phải.",
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
    ]
  },
  "specimen-snake-plant": {
    "id": "sansevieria-trifasciata",
    "slug": "sansevieria-trifasciata",
    "catalogCode": "CANOPY-002",
    "name": "Lưỡi Hổ",
    "scientificName": "Dracaena trifasciata",
    "category": "succulent",
    "biome": "arid",
    "biomeLabel": "Arid & Desert",
    "image": "https://images.unsplash.com/photo-1610630877758-c0b25e7144e7?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1610630877758-c0b25e7144e7?auto=format&fit=crop&w=800&q=80",
        "alt": "Chậu cây lưỡi hổ trong phòng ngủ",
        "isPrimary": true
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
      "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước"
    ],
    "shortDesc": "Loài cây vô cùng bền bỉ, nổi tiếng với khả năng lọc khí độc ban đêm. Phù hợp cho những người bận rộn nhất.",
    "origin": "Vùng sinh trưởng: north, central, south, highlands",
    "purpose": "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước.",
    "water": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "light": "Ánh sáng: low. Chịu bóng tốt, sống khỏe trong góc tối.",
    "soil": "Đất dành cho xương rồng/sen đá, thoát nước cực kỳ tốt, pha nhiều cát/đá pumice.",
    "humidity": "30% – 50%",
    "temp": "18°C – 28°C",
    "growth": "Phát triển khỏe / Dễ trồng",
    "toxicity": "Pet Caution (Toxic to Pets)",
    "waterDaily": "150 ml / 14 Days",
    "waterStatus": "Chịu hạn tốt",
    "notifMsg": "Lưỡi Hổ đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "150 ml",
    "waterBar": "45%",
    "waterSub": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "waterVol": "150 ml",
    "waterFreq": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Không cần phun sương",
    "envVal": "800 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho low",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất dành cho xương r",
    "soilBar": "85%",
    "soilSub": "Chậu đất nung (terracotta) giúp thoát hơi nước nhanh.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "bedroom"
      ],
      "growthHabit": "Mọc thẳng đứng, dạng cụm rễ ngầm, lá dày trữ nước.",
      "soil": "Đất dành cho xương rồng/sen đá, thoát nước cực kỳ tốt, pha nhiều cát/đá pumice.",
      "container": "Chậu đất nung (terracotta) giúp thoát hơi nước nhanh.",
      "watering": "Rất ít tưới. Chỉ tưới khi toàn bộ bầu đất đã khô hoàn toàn (khoảng 2-3 tuần/lần).",
      "routineCare": "Tuyệt đối không để đọng nước ở lõi cây. Hiếm khi cần bón phân.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "safe",
        "note": "Gây rối loạn tiêu hóa nhẹ ở chó mèo nếu nhai phải lá.",
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
      "south",
      "highlands"
    ],
    "similarPlantSlugs": [
      "zz-plant",
      "aloe-vera"
    ]
  },
  "specimen-fiddle-leaf": {
    "id": "ficus-lyrata",
    "slug": "ficus-lyrata",
    "catalogCode": "CANOPY-003",
    "name": "Bàng Singapore",
    "scientificName": "Ficus lyrata",
    "category": "tree",
    "biome": "tropical",
    "biomeLabel": "Tropical Rainforest",
    "image": "https://images.unsplash.com/photo-1612474149814-c36da41753c1?auto=format&fit=crop&w=800&q=80",
    "images": [
      {
        "url": "https://images.unsplash.com/photo-1612474149814-c36da41753c1?auto=format&fit=crop&w=800&q=80",
        "alt": "Bàng Singapore đặt cạnh cửa sổ",
        "isPrimary": true
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
      "Cây thân gỗ đứng, phát triển cao lớn"
    ],
    "shortDesc": "Sở hữu những chiếc lá to hình đàn tỳ bà, mang lại cấu trúc thẳng đứng mạnh mẽ và điểm nhấn kiến trúc cho mọi góc phòng.",
    "origin": "Vùng sinh trưởng: north, south",
    "purpose": "Cây thân gỗ đứng, phát triển cao lớn. Lá to, mọc cách đều.",
    "water": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "light": "Ánh sáng: bright-indirect. Ánh sáng tán xạ gián tiếp dồi dào.",
    "soil": "Đất trồng tiêu chuẩn, giàu mùn hữu cơ và thông thoáng.",
    "humidity": "50% – 70%",
    "temp": "18°C – 28°C",
    "growth": "Trung bình",
    "toxicity": "Pet Caution (Toxic to Pets / Irritant)",
    "waterDaily": "350 ml / 7 Days",
    "waterStatus": "Độ ẩm tối ưu",
    "notifMsg": "Bàng Singapore đang hấp thụ ánh sáng và trao đổi chất ổn định.",
    "waterVal": "350 ml",
    "waterBar": "75%",
    "waterSub": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "waterVol": "350 ml",
    "waterFreq": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
    "humidityVal": "62% RH",
    "humidityBar": "68%",
    "humiditySub": "Độ thoát hơi nước qua lá duy trì ổn định.",
    "humidityTarget": "55% – 80% RH",
    "mistCadence": "Phun sương lá 3-4 ngày/lần",
    "envVal": "1,500 FC",
    "envBar": "80%",
    "envSub": "Cường độ quang phổ chuẩn cho bright-indirect",
    "tempRange": "18°C tối thiểu ban đêm / 28°C tối đa ban ngày",
    "soilVal": "Đất trồng tiêu chuẩn",
    "soilBar": "85%",
    "soilSub": "Chậu nặng, chắc chắn để giữ thăng bằng cho cây cao.",
    "guide": {
      "environments": [
        "indoor",
        "office",
        "terrace"
      ],
      "growthHabit": "Cây thân gỗ đứng, phát triển cao lớn. Lá to, mọc cách đều.",
      "soil": "Đất trồng tiêu chuẩn, giàu mùn hữu cơ và thông thoáng.",
      "container": "Chậu nặng, chắc chắn để giữ thăng bằng cho cây cao.",
      "watering": "Tưới đều đặn nhưng không để úng nước. Tưới khi 5cm đất mặt đã khô.",
      "routineCare": "Thường xuyên xoay chậu 90 độ mỗi tháng để cây phát triển thẳng. Rất nhạy cảm với việc thay đổi vị trí.",
      "toxicityCaution": {
        "pets": "toxic",
        "humans": "irritant",
        "note": "Nhựa cây có thể gây kích ứng da nghiêm trọng và độc với thú cưng.",
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
    ]
  }
};

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
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(STARRED_STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setStarredPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STARRED_STORAGE_KEY, JSON.stringify(ids || []));
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
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(GARDEN_STORAGE_KEY);
  if (!stored) return [];
  try {
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    return [];
  }
}

export function setGardenPlantIds(ids) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GARDEN_STORAGE_KEY, JSON.stringify(ids || []));
}
