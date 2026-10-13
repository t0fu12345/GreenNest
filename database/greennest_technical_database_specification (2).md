# GreenNest — Technical Database Specification (MongoDB)

Bản phân tích và thiết kế Cơ sở dữ liệu MongoDB tối ưu dành cho Backend Developer và DBA. Cấu trúc đã được đơn giản hóa, tinh gọn các thẻ (`tags`), loại bỏ hẳn collection chuyên gia (`experts`), gộp toàn bộ hướng dẫn, vị trí trồng, chăm sóc và an toàn vào duy nhất **một sub-document `guide`**, bổ sung collection **`users`**, và cập nhật logic **Bộ sưu tập Mùa (Seasonal Collections)** gồm 4 mùa cố định.

---

## 1. Kiến trúc Tổng quan (Architecture & Entities)

Hệ thống Database gồm **3 Collections chính**:

1. **`plants`**: Lưu trữ toàn bộ thông tin chi tiết của cây, bao gồm trường `seasons` định danh mùa sinh trưởng thích hợp. Thông tin chăm sóc/an toàn/môi trường sống được gộp gọn trong sub-document `guide`.
2. **`users`**: Lưu trữ tài khoản người dùng, phân quyền (`user` / `admin`), và danh sách cây đã lưu (`savedGardenSlugs`).
3. **`plantCollections`**: Quản lý 4 Bộ sưu tập cố định tương ứng với 4 mùa (**Xuân, Hạ, Thu, Đông**).

---

## 2. Chi tiết Collection `plants`

### 2.1. Bảng Data Dictionary

| Field Name | Type | Rules & Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Auto-generated | Primary Key |
| `slug` | String | Unique, Lowercase, Required, Index | Định danh URL (VD: `monstera-deliciosa`) |
| `name` | String | Required, Trim | Tên tiếng Việt / Tên thông dụng |
| `botanicalName` | String | Required, Trim | Tên khoa học |
| `category` | String | Enum: `['foliage', 'flower', 'succulent', 'herb', 'fruit', 'tree']` | Nhóm cây chính |
| `description` | String | Required | Mô tả tổng quan ngắn |
| `light` | String | Enum: `['low', 'medium', 'bright-indirect', 'full-sun']` | Nhu cầu ánh sáng |
| `water` | String | Enum: `['low', 'moderate', 'high']` | Nhu cầu nước |
| `difficulty` | String | Enum: `['easy', 'medium', 'hard']` | Mức độ chăm sóc |
| `regions` | Array [String] | Items enum: `['north', 'central', 'south', 'highlands']` | Khu vực khí hậu |
| **`seasons`** | **Array [String]** | **Items enum: `['spring', 'summer', 'autumn', 'winter']`** | **Mùa sinh trưởng (Dùng để tự động phân loại Collection)** |
| `tags` | Array [String] | Index | Thẻ ngắn phục vụ lọc nhanh (VD: `pet-safe`, `indoor`) |
| `images` | Array [Object] | Min length: 1 | Danh sách ảnh (`url`, `alt`, `isPrimary`) |
| **`guide`** | **Object** | **Required (Sub-document)** | **GOM TẤT CẢ HƯỚNG DẪN, MÔI TRƯỜNG & AN TOÀN** |
| `guide.environments`| Array [String] | Items enum: `['indoor', 'office', 'balcony', 'garden', 'terrace']` | Vị trí / Môi trường trồng phù hợp |
| `guide.growthHabit` | String | Trim | Đặc tính / Hình thái phát triển |
| `guide.soil` | String | Required | Đất trồng |
| `guide.container` | String | Required | Chậu trồng & Thoát nước |
| `guide.watering` | String | Required | Hướng dẫn tưới chi tiết |
| `guide.routineCare` | String | Required | Chăm sóc định kỳ |
| `guide.toxicityCaution`| Object | Sub-document | Cảnh báo an toàn & nguồn trích dẫn |
| `guide.toxicityCaution.pets` | String | Enum: `['safe', 'caution', 'toxic']` | An toàn với thú cưng |
| `guide.toxicityCaution.humans` | String | Enum: `['safe', 'irritant', 'toxic']` | An toàn với người |
| `guide.toxicityCaution.note` | String | Trim | Chi tiết cảnh báo |
| `guide.toxicityCaution.source` | String | Trim | Nguồn trích dẫn (SRS) |
| `similarPlantSlugs` | Array [String] | Array of `slug` strings | Slugs cây có nhu cầu tương tự (SRS) |
| `status` | String | Enum: `['draft', 'published']`, Default: `'published'` | Trạng thái hiển thị |
| `createdAt / updatedAt` | Date | Auto timestamps | Thời gian tạo và cập nhật |

### 2.2. Indexes cho Collection `plants`

```js
// Unique index cho Slug
db.plants.createIndex({ slug: 1 }, { unique: true });

// Compound index cho Lọc & Tìm kiếm
db.plants.createIndex({ category: 1, light: 1, water: 1, difficulty: 1 });

// Multikey Index cho Vị trí, Mùa & Thẻ
db.plants.createIndex({ seasons: 1 });
db.plants.createIndex({ "guide.environments": 1 });
db.plants.createIndex({ tags: 1 });

// Text Index tìm kiếm nhanh
db.plants.createIndex(
  { name: "text", botanicalName: "text", description: "text" },
  { weights: { name: 10, botanicalName: 5, description: 1 }, name: "PlantSearch" }
);
```

---

## 3. Chi tiết Collection `users`

### 3.1. Bảng Data Dictionary

| Field Name | Type | Rules & Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Auto-generated | Primary Key |
| `email` | String | Unique, Lowercase, Required, Index, Trim | Email đăng nhập |
| `passwordHash` | String | Required, Select: false | Mật khẩu đã mã hóa (Bcrypt) |
| `fullName` | String | Required, Trim | Họ và tên người dùng |
| `avatar` | String | Default: `"/images/users/default.png"` | URL ảnh đại diện |
| `role` | String | Enum: `['user', 'admin']`, Default: `'user'` | Vai trò hệ thống |
| `savedGardenSlugs` | Array [String] | Array of `plants.slug` | Danh sách cây đã lưu (My Garden) |
| `createdAt / updatedAt` | Date | Auto timestamps | Thời gian tạo và cập nhật |

### 3.2. Indexes cho Collection `users`

```js
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
```

---

## 4. Chi tiết Collection `plantCollections` (Bộ Sưu Tập Mùa)

Hệ thống duy trì cố định 4 bộ sưu tập mùa tương ứng với: **Xuân (`spring`), Hạ (`summer`), Thu (`autumn`), Đông (`winter`)**.

### 4.1. Bảng Data Dictionary

| Field Name | Type | Rules & Constraints | Description |
| :--- | :--- | :--- | :--- |
| `_id` | ObjectId | Auto-generated | Primary Key |
| `slug` | String | Unique, Lowercase, Required, Index | Enum: `['spring-collection', 'summer-collection', 'autumn-collection', 'winter-collection']` |
| `seasonKey` | String | Enum: `['spring', 'summer', 'autumn', 'winter']` | Khóa xác định mùa tương ứng |
| `name` | String | Required, Trim | Tên hiển thị (VD: *Bộ Sưu Tập Mùa Xuân*) |
| `description` | String | Trim | Mô tả ngắn về bộ sưu tập mùa |
| `plantSlugs` | Array [String] | Array of `plants.slug` | Danh sách slug cây tự động thuộc về mùa này |
| `image` | String | Required | Ảnh đại diện mùa |
| `status` | String | Enum: `['published', 'draft']`, Default: `'published'` | Trạng thái |

### 4.2. Logic Phân Loại Tự Động (Add to Collection)

Khi hành động **Add to Collection** được kích hoạt cho một cây:
1. Hệ thống đọc danh sách mùa `plants.seasons` của cây đó.
2. Cây (`slug`) sẽ tự động được thêm vào trường `plantSlugs` của các Collection Mùa tương ứng bằng câu lệnh `$addToSet` trong MongoDB.

---

## 5. Mongoose Schemas (Node.js Reference Code)

```javascript
const mongoose = require('mongoose');

// 1. PLANT SCHEMA
const plantSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  name: { type: String, required: true, trim: true },
  botanicalName: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['foliage', 'flower', 'succulent', 'herb', 'fruit', 'tree'] 
  },
  description: { type: String, required: true },
  light: { type: String, required: true, enum: ['low', 'medium', 'bright-indirect', 'full-sun'] },
  water: { type: String, required: true, enum: ['low', 'moderate', 'high'] },
  difficulty: { type: String, required: true, enum: ['easy', 'medium', 'hard'] },
  regions: [{ type: String, enum: ['north', 'central', 'south', 'highlands'] }],
  seasons: [{ 
    type: String, 
    enum: ['spring', 'summer', 'autumn', 'winter'],
    required: true 
  }],
  tags: [{ type: String, trim: true }],
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    isPrimary: { type: Boolean, default: false }
  }],
  
  guide: {
    environments: [{ type: String, enum: ['indoor', 'office', 'balcony', 'garden', 'terrace'] }],
    growthHabit: { type: String, trim: true },
    soil: { type: String, required: true },
    container: { type: String, required: true },
    watering: { type: String, required: true },
    routineCare: { type: String, required: true },
    toxicityCaution: {
      pets: { type: String, enum: ['safe', 'caution', 'toxic'], default: 'safe' },
      humans: { type: String, enum: ['safe', 'irritant', 'toxic'], default: 'safe' },
      note: { type: String, trim: true },
      source: { type: String, trim: true }
    }
  },
  
  similarPlantSlugs: [{ type: String, trim: true }],
  status: { type: String, enum: ['draft', 'published'], default: 'published' }
}, { timestamps: true });

// 2. USER SCHEMA
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
  fullName: { type: String, required: true, trim: true },
  avatar: { type: String, default: "/images/users/default.png" },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  savedGardenSlugs: [{ type: String, trim: true }],
  status: { type: String, enum: ['active', 'blocked'], default: 'active' },
  lastLoginAt: { type: Date, default: null }
}, { timestamps: true });

// 3. PLANT COLLECTION SCHEMA (4 Mùa Cố Định)
const plantCollectionSchema = new mongoose.Schema({
  slug: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true, 
    enum: ['spring-collection', 'summer-collection', 'autumn-collection', 'winter-collection'] 
  },
  seasonKey: { 
    type: String, 
    required: true, 
    enum: ['spring', 'summer', 'autumn', 'winter'] 
  },
  name: { type: String, required: true, trim: true },
  description: { type: String },
  plantSlugs: [{ type: String, trim: true }],
  image: { type: String, required: true },
  status: { type: String, enum: ['published', 'draft'], default: 'published' }
}, { timestamps: true });

module.exports = {
  Plant: mongoose.model('Plant', plantSchema),
  User: mongoose.model('User', userSchema),
  PlantCollection: mongoose.model('PlantCollection', plantCollectionSchema)
};
```

---

## 6. Seed Data Reference (Sample JSON)

### 6.1. Document Mẫu `plants`
```json
{
  "slug": "monstera-deliciosa",
  "name": "Trầu bà lá xẻ",
  "botanicalName": "Monstera deliciosa",
  "category": "foliage",
  "description": "Cây cảnh nội thất phổ biến với phiến lá xẻ độc đáo.",
  "light": "bright-indirect",
  "water": "moderate",
  "difficulty": "easy",
  "regions": ["north", "south", "central"],
  "seasons": ["spring", "summer"],
  "tags": ["indoor", "easy-care"],
  "images": [
    {
      "url": "/images/plants/monstera-1.jpg",
      "alt": "Cây trầu bà lá xẻ",
      "isPrimary": true
    }
  ],
  "guide": {
    "environments": ["indoor", "office"],
    "growthHabit": "Dạng thân leo, lá xẻ sâu khi trưởng thành.",
    "soil": "Đất trồng giàu dinh dưỡng, tơi xốp, thoát nước tốt.",
    "container": "Chậu nhựa/gốm có lỗ thoát nước, đường kính > 25cm.",
    "watering": "Tưới 1-2 lần/tuần khi lớp đất mặt khô 2-3cm.",
    "routineCare": "Bón phân NPK loãng 1 tháng/lần. Lau lá thường xuyên.",
    "toxicityCaution": {
      "pets": "toxic",
      "humans": "irritant",
      "note": "Có thể gây kích ứng niêm mạc nếu nuốt phải.",
      "source": "ASPCA Animal Poison Control"
    }
  },
  "similarPlantSlugs": ["pothos-gold", "philodendron-birkin"],
  "status": "published"
}
```

### 6.2. Document Mẫu `users`
```json
{
  "email": "user@example.com",
  "passwordHash": "$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW",
  "fullName": "Nguyễn Văn A",
  "avatar": "/images/users/user-01.png",
  "role": "user",
  "savedGardenSlugs": ["monstera-deliciosa", "pothos-gold"],
  "status": "active"
}
```

### 6.3. Document Mẫu `plantCollections` (Mùa Xuân)
```json
{
  "slug": "spring-collection",
  "seasonKey": "spring",
  "name": "Bộ Sưu Tập Mùa Xuân",
  "description": "Danh sách các loại cây phát triển tốt nhất vào mùa xuân.",
  "plantSlugs": ["monstera-deliciosa"],
  "image": "/images/collections/spring.jpg",
  "status": "published"
}
```