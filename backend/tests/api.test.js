const app = require('../src/server');

const BASE_URL = 'http://localhost:5000/api';

let server;

function ensureServerRunning() {
  return new Promise((resolve) => {
    fetch(`${BASE_URL}/health`)
      .then(() => resolve())
      .catch(() => {
        try {
          server = app.listen(5000, () => {
            console.log('📡 Test runner đã khởi động Express server trên port 5000');
            setTimeout(resolve, 800);
          });
          server.on('error', (err) => {
            if (err.code === 'EADDRINUSE') resolve();
          });
        } catch (e) {
          resolve();
        }
      });
  });
}

async function runTests() {
  await ensureServerRunning();
  console.log('🧪 ========================================================');
  console.log('🧪 BẮT ĐẦU CHẠY BỘ KIỂM THỬ TỰ ĐỘNG GREENNEST RESTFUL API');
  console.log('🧪 ========================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  ❌ [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // 1. Health Check
    console.log('▶ [1/10] Kiểm tra Endpoint Sức khỏe (Health Check)');
    const resHealth = await fetch(`${BASE_URL}/health`);
    const health = await resHealth.json();
    assert(resHealth.status === 200 && health.status === 'UP', 'GET /api/health trả về status: UP');
    assert(health.architecture.includes('Modular MCS'), 'GET /api/health xác nhận kiến trúc Modular MCS');

    // 2. Metadata / Filters
    console.log('\n▶ [2/10] Kiểm tra Endpoint Metadata & Lookups');
    const resMeta = await fetch(`${BASE_URL}/metadata/filters`);
    const meta = await resMeta.json();
    assert(resMeta.status === 200 && meta.success === true, 'GET /api/metadata/filters trả về 200');
    assert(Array.isArray(meta.data.biomes) && meta.data.biomes.length > 0, 'Dữ liệu Biomes khả dụng');
    assert(Array.isArray(meta.data.categories) && meta.data.categories.length > 0, 'Dữ liệu Categories khả dụng');

    // 3. Auth Module - Validation, Register, Login
    console.log('\n▶ [3/10] Kiểm tra Phân hệ Xác thực (Auth Module)');
    // 3.1 Validation error khi đăng ký sai
    const resRegFail = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad-email', password: '123' })
    });
    assert(resRegFail.status === 422, 'POST /api/auth/register chặn dữ liệu lỗi với 422 Unprocessable Entity');

    // 3.2 Đăng nhập Admin
    const resAdminLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@greennest.vn', password: 'Admin@123456' })
    });
    const adminAuth = await resAdminLogin.json();
    assert(resAdminLogin.status === 200 && adminAuth.data.user.role === 'admin', 'POST /api/auth/login thành công với Admin');
    const adminToken = adminAuth.data.token;

    // 3.3 Đăng nhập User thường
    const resUserLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nam.le@greennest.vn', password: 'GreenNest@2026' })
    });
    const userAuth = await resUserLogin.json();
    assert(resUserLogin.status === 200 && userAuth.data.user.role === 'user', 'POST /api/auth/login thành công với Thành viên');
    const userToken = userAuth.data.token;

    // 3.4 Get Profile (Me)
    const resMe = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const meData = await resMe.json();
    assert(resMe.status === 200 && meData.data.email === 'nam.le@greennest.vn', 'GET /api/auth/me trả về đúng thông tin cá nhân');

    // 4. Plants Module - Query, Search, Detail, Related
    console.log('\n▶ [4/10] Kiểm tra Phân hệ Cây trồng (Plant Module)');
    const resPlants = await fetch(`${BASE_URL}/plants?limit=6`);
    const plantsData = await resPlants.json();
    assert(resPlants.status === 200 && plantsData.data.length === 6, 'GET /api/plants phân trang 6 cây');
    assert(plantsData.pagination.totalItems >= 20, `Tổng số cây trồng >= 20 (Hiện có: ${plantsData.pagination.totalItems})`);

    const firstPlant = plantsData.data[0];
    const resDetail = await fetch(`${BASE_URL}/plants/${firstPlant._id}`);
    const detailData = await resDetail.json();
    assert(resDetail.status === 200 && detailData.data.name === firstPlant.name, `GET /api/plants/:id chi tiết cây [${firstPlant.name}]`);

    const resRelated = await fetch(`${BASE_URL}/plants/${firstPlant._id}/related`);
    const relatedData = await resRelated.json();
    assert(resRelated.status === 200 && Array.isArray(relatedData.data), 'GET /api/plants/:id/related trả về danh sách cây tương tự');

    // 5. Gardeners Module
    console.log('\n▶ [5/10] Kiểm tra Phân hệ Chuyên gia (Gardener Module)');
    const resGardeners = await fetch(`${BASE_URL}/gardeners`);
    const gardenersData = await resGardeners.json();
    assert(resGardeners.status === 200 && gardenersData.data.length === 4, 'GET /api/gardeners trả về đủ 4 chuyên gia thực vật');

    // 6. Collections Module
    console.log('\n▶ [6/10] Kiểm tra Phân hệ Bộ sưu tập theo mùa (Collection Module)');
    const resCollections = await fetch(`${BASE_URL}/collections`);
    const collectionsData = await resCollections.json();
    assert(resCollections.status === 200 && collectionsData.data.length === 4, 'GET /api/collections trả về đủ 4 bộ sưu tập theo mùa');

    // 7. Gallery Module - Lightbox & Likes
    console.log('\n▶ [7/10] Kiểm tra Phân hệ Thư viện ảnh (Gallery Module)');
    const resGallery = await fetch(`${BASE_URL}/gallery?limit=10`);
    const galleryData = await resGallery.json();
    assert(resGallery.status === 200 && galleryData.data.length === 10, 'GET /api/gallery phân trang 10 ảnh');

    const firstImage = galleryData.data[0];

    // 7.1 Chưa đăng nhập -> Chặn 401
    const resUnauthLike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, { method: 'POST' });
    assert(resUnauthLike.status === 401, 'POST /api/gallery/:id/like chặn khách chưa đăng nhập với 401 Unauthorized');

    // 7.2 Đã đăng nhập -> Thả tim lần 1 (+1)
    const resLike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const likeData = await resLike.json();
    assert(resLike.status === 200 && likeData.data.liked === true, `POST /api/gallery/:id/like thả tim thành công (Lượt thích: ${likeData.data.likesCount})`);

    // 7.3 Đã đăng nhập -> Thả tim lần 2 (Hủy thả tim -1)
    const resUnlike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const unlikeData = await resUnlike.json();
    assert(resUnlike.status === 200 && unlikeData.data.liked === false, `POST /api/gallery/:id/like ấn lần 2 hủy thả tim thành công (Lượt thích: ${unlikeData.data.likesCount})`);

    // 8. User Garden Module - Hybrid Sync & Checklist
    console.log('\n▶ [8/10] Kiểm tra Vườn cá nhân & Hybrid Sync (Garden Module)');
    const resGarden = await fetch(`${BASE_URL}/garden`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const gardenData = await resGarden.json();
    assert(resGarden.status === 200 && Array.isArray(gardenData.data.garden), 'GET /api/garden trả về danh sách cây trong vườn');

    // Hybrid Sync test
    const resSync = await fetch(`${BASE_URL}/garden/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ plantIds: [firstPlant._id] })
    });
    const syncData = await resSync.json();
    assert(resSync.status === 200, `POST /api/garden/sync đồng bộ thành công`);

    // Update Checklist task
    const resChecklist = await fetch(`${BASE_URL}/garden/checklist`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        gardenItemId: firstPlant._id,
        taskName: 'water',
        completed: true
      })
    });
    assert(resChecklist.status === 200, 'PUT /api/garden/checklist đánh dấu hoàn thành tưới nước');

    // 9. Contact Module
    console.log('\n▶ [9/10] Kiểm tra Phân hệ Tin nhắn liên hệ (Contact Module)');
    const resContact = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Khách Thử Nghiệm',
        email: 'test.guest@gmail.com',
        subject: 'Hỏi về độ ẩm cho dương xỉ',
        message: 'Xin chào ban quản trị GreenNest, xin hướng dẫn độ ẩm phù hợp cho dương xỉ phòng ngủ.'
      })
    });
    const contactData = await resContact.json();
    assert(resContact.status === 201 && contactData.success === true, 'POST /api/contact gửi tin nhắn thành công');

    // 10. Admin Module & RBAC Security Guards
    console.log('\n▶ [10/10] Kiểm tra Phân quyền RBAC & Admin Dashboard');
    // 10.1 User thường truy cập Admin -> Chặn 403 Forbidden
    const resForbidden = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    assert(resForbidden.status === 403, 'RBAC chặn tài khoản thường truy cập Admin với 403 Forbidden');

    // 10.2 Admin truy cập Admin Dashboard -> 200 OK
    const resAdminStats = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminStatsData = await resAdminStats.json();
    assert(resAdminStats.status === 200, 'Admin lấy Dashboard stats thành công');
    assert(adminStatsData.data.totalPlants >= 20, `Dashboard: ${adminStatsData.data.totalPlants} cây trồng`);
    assert(adminStatsData.data.totalGardeners === 4, `Dashboard: ${adminStatsData.data.totalGardeners} chuyên gia`);
    assert(adminStatsData.data.totalCollections === 4, `Dashboard: ${adminStatsData.data.totalCollections} bộ sưu tập`);
    assert(adminStatsData.data.totalGalleryImages === 20, `Dashboard: ${adminStatsData.data.totalGalleryImages} ảnh gallery`);

    // 10.3 Admin duyệt inbox contact
    const resAdminContact = await fetch(`${BASE_URL}/contact`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminContactData = await resAdminContact.json();
    assert(resAdminContact.status === 200 && adminContactData.data.length > 0, 'Admin xem hòm thư liên hệ thành công');

    // Tổng kết
    console.log('\n========================================================');
    console.log(`🏁 TỔNG KẾT KIỂM THỬ: ${passed} PASS / ${failed} FAIL`);
    if (failed === 0) {
      console.log('🎉 TOÀN BỘ CÁC TIÊU CHUẨN BACKEND ĐÃ ĐẠT 100% HOÀN HẢO!');
    } else {
      console.error('⚠️ CÓ TEST CHƯA ĐẠT, VUI LÒNG KIỂM TRA LẠI.');
    }
    console.log('========================================================\n');

    if (server && server.listening) {
      server.close();
    }
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('💥 Lỗi ngoại lệ trong quá trình chạy test:', error);
    if (server && server.listening) {
      server.close();
    }
    process.exit(1);
  }
}

// Khởi chạy sau 1s để server mở port ổn định
setTimeout(runTests, 1000);
