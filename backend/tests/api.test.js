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
            console.log('📡 Test runner started Express server on port 5000');
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
  console.log('🧪 EXECUTING AUTOMATED GREENNEST RESTFUL API TEST SUITE');
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
    console.log('▶ [1/10] System Health Check Endpoint');
    const resHealth = await fetch(`${BASE_URL}/health`);
    const health = await resHealth.json();
    assert(resHealth.status === 200 && health.status === 'UP', 'GET /api/health returns status: UP');
    assert(health.architecture.includes('Modular MCS'), 'GET /api/health confirms Modular MCS architecture');

    // 2. Metadata / Filters
    console.log('\n▶ [2/10] Metadata & Filter Taxonomy Endpoint');
    const resMeta = await fetch(`${BASE_URL}/metadata/filters`);
    const meta = await resMeta.json();
    assert(resMeta.status === 200 && meta.success === true, 'GET /api/metadata/filters returns 200 OK');
    assert(Array.isArray(meta.data.biomes) && meta.data.biomes.length > 0, 'Biomes taxonomy available');
    assert(Array.isArray(meta.data.categories) && meta.data.categories.length > 0, 'Categories taxonomy available');

    // 3. Auth Module - Validation, Register, Login
    console.log('\n▶ [3/10] Authentication & Identity Module');
    // 3.1 Validation error when registering invalid data
    const resRegFail = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'bad-email', password: '123' })
    });
    assert(resRegFail.status === 422, 'POST /api/auth/register intercepts invalid payload with 422 Unprocessable Entity');

    // 3.2 Login Admin
    const resAdminLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'admin@greennest.vn', password: 'Admin@123456' })
    });
    const adminAuth = await resAdminLogin.json();
    assert(resAdminLogin.status === 200 && adminAuth.data.user.role === 'admin', 'POST /api/auth/login successful for Administrator');
    const adminToken = adminAuth.data.token;

    // 3.3 Login Member
    const resUserLogin = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'nam.le@greennest.vn', password: 'GreenNest@2026' })
    });
    const userAuth = await resUserLogin.json();
    assert(resUserLogin.status === 200 && userAuth.data.user.role === 'user', 'POST /api/auth/login successful for Standard Member');
    const userToken = userAuth.data.token;

    // 3.4 Get Profile (Me)
    const resMe = await fetch(`${BASE_URL}/auth/me`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const meData = await resMe.json();
    assert(resMe.status === 200 && meData.data.email === 'nam.le@greennest.vn', 'GET /api/auth/me returns valid user credentials');

    // 4. Plants Module - Query, Search, Detail, Related
    console.log('\n▶ [4/10] Botanical Plants & Specimen Catalog Module');
    const resPlants = await fetch(`${BASE_URL}/plants?limit=6`);
    const plantsData = await resPlants.json();
    assert(resPlants.status === 200 && plantsData.data.length === 6, 'GET /api/plants paginates 6 items');
    assert(plantsData.pagination.totalItems >= 20, `Total catalog specimens >= 20 (Count: ${plantsData.pagination.totalItems})`);

    const firstPlant = plantsData.data[0];
    const resDetail = await fetch(`${BASE_URL}/plants/${firstPlant._id}`);
    const detailData = await resDetail.json();
    assert(resDetail.status === 200 && detailData.data.name === firstPlant.name, `GET /api/plants/:id retrieves specimen [${firstPlant.name}]`);

    const resRelated = await fetch(`${BASE_URL}/plants/${firstPlant._id}/related`);
    const relatedData = await resRelated.json();
    assert(resRelated.status === 200 && Array.isArray(relatedData.data), 'GET /api/plants/:id/related returns affiliated species');

    // 5. Gardeners Module
    console.log('\n▶ [5/10] Botanists & Gardeners Module');
    const resGardeners = await fetch(`${BASE_URL}/gardeners`);
    const gardenersData = await resGardeners.json();
    assert(resGardeners.status === 200 && gardenersData.data.length === 4, 'GET /api/gardeners returns 4 master botanists');

    // 6. Collections Module
    console.log('\n▶ [6/10] Curated Seasonal Collections Module');
    const resCollections = await fetch(`${BASE_URL}/collections`);
    const collectionsData = await resCollections.json();
    assert(resCollections.status === 200 && collectionsData.data.length === 4, 'GET /api/collections returns 4 seasonal collections');

    // 7. Gallery Module - Lightbox & Likes
    console.log('\n▶ [7/10] Botanical Gallery Module');
    const resGallery = await fetch(`${BASE_URL}/gallery?limit=10`);
    const galleryData = await resGallery.json();
    assert(resGallery.status === 200 && galleryData.data.length === 10, 'GET /api/gallery paginates 10 images');

    const firstImage = galleryData.data[0];

    // 7.1 Unauthenticated -> 401
    const resUnauthLike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, { method: 'POST' });
    assert(resUnauthLike.status === 401, 'POST /api/gallery/:id/like guards unauthenticated guests with 401 Unauthorized');

    // 7.2 Authenticated -> Like (+1)
    const resLike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const likeData = await resLike.json();
    assert(resLike.status === 200 && likeData.data.liked === true, `POST /api/gallery/:id/like favorited successfully (Likes: ${likeData.data.likesCount})`);

    // 7.3 Authenticated -> Unlike (-1)
    const resUnlike = await fetch(`${BASE_URL}/gallery/${firstImage._id}/like`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const unlikeData = await resUnlike.json();
    assert(resUnlike.status === 200 && unlikeData.data.liked === false, `POST /api/gallery/:id/like unfavorited successfully on repeat click (Likes: ${unlikeData.data.likesCount})`);

    // 8. User Garden Module - Hybrid Sync & Checklist
    console.log('\n▶ [8/10] Living Garden Sanctuary & Care Schedule Module');
    const resGarden = await fetch(`${BASE_URL}/garden`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    const gardenData = await resGarden.json();
    assert(resGarden.status === 200 && Array.isArray(gardenData.data.garden), 'GET /api/garden returns user sanctuary specimens');

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
    assert(resSync.status === 200, `POST /api/garden/sync synchronizes specimens cleanly`);

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
    assert(resChecklist.status === 200, 'PUT /api/garden/checklist marks watering task completed');

    // 9. Contact Module
    console.log('\n▶ [9/10] Botanical Inquiries & Contact Module');
    const resContact = await fetch(`${BASE_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Test Guest',
        email: 'test.guest@gmail.com',
        subject: 'Humidity guidance for Boston Fern',
        message: 'Hello GreenNest team, please advise on optimal ambient humidity for bedroom fern cultivation.'
      })
    });
    const contactData = await resContact.json();
    assert(resContact.status === 201 && contactData.success === true, 'POST /api/contact submits inquiry successfully');

    // 10. Admin Module & RBAC Security Guards
    console.log('\n▶ [10/10] RBAC Access Control & Admin Telemetry Dashboard');
    const resUnauthorizedAdmin = await fetch(`${BASE_URL}/admin/dashboard/stats`);
    assert(resUnauthorizedAdmin.status === 401, 'RBAC intercepts anonymous admin access with 401 Unauthorized');

    // 10.1 Standard user accessing Admin -> 403 Forbidden
    const resForbidden = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${userToken}` }
    });
    assert(resForbidden.status === 403, 'RBAC intercepts non-admin account with 403 Forbidden');

    // 10.2 Admin accessing Admin Dashboard -> 200 OK
    const resAdminStats = await fetch(`${BASE_URL}/admin/dashboard/stats`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminStatsData = await resAdminStats.json();
    assert(resAdminStats.status === 200, 'Admin retrieves Dashboard statistics successfully');
    assert(adminStatsData.data.totalPlants >= 20, `Dashboard: ${adminStatsData.data.totalPlants} botanical plants`);
    assert(adminStatsData.data.totalGardeners === 4, `Dashboard: ${adminStatsData.data.totalGardeners} master botanists`);
    assert(adminStatsData.data.totalCollections === 4, `Dashboard: ${adminStatsData.data.totalCollections} curated collections`);
    assert(adminStatsData.data.totalGalleryImages === 20, `Dashboard: ${adminStatsData.data.totalGalleryImages} gallery photographs`);
    assert(typeof adminStatsData.data.publishedPlants === 'number', 'Dashboard exposes published plant count');
    assert(typeof adminStatsData.data.draftPlants === 'number', 'Dashboard exposes draft plant count');
    assert(typeof adminStatsData.data.totalAccounts === 'number', 'Dashboard exposes total account count');
    assert(typeof adminStatsData.data.totalAdmins === 'number', 'Dashboard exposes total administrator count');
    assert(typeof adminStatsData.data.resolvedContacts === 'number', 'Dashboard exposes resolved contact count');

    const draftSpecimenId = `admin-draft-${Date.now()}`;
    const resCreateDraft = await fetch(`${BASE_URL}/plants`, {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${adminToken}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        specimenId: draftSpecimenId,
        name: 'Admin Draft Visibility Test',
        scientificName: 'Testus administratus',
        category: 'Test specimen',
        biome: 'tropical',
        light: 'Indirect light',
        watering: 'Weekly',
        status: 'draft',
        images: { hero: 'https://example.com/admin-draft.jpg', gallery: [] }
      })
    });
    const createdDraftData = await resCreateDraft.json();
    assert(resCreateDraft.status === 201, 'Admin creates a draft plant for visibility verification');

    const resPublicAllPlants = await fetch(`${BASE_URL}/plants?status=all&limit=100`);
    const publicAllPlantsData = await resPublicAllPlants.json();
    assert(
      publicAllPlantsData.data.length === adminStatsData.data.publishedPlants,
      'Public catalog cannot expose draft plants through status=all'
    );

    const resPublicDraftPlants = await fetch(`${BASE_URL}/plants?status=draft&limit=100`);
    const publicDraftPlantsData = await resPublicDraftPlants.json();
    assert(
      publicDraftPlantsData.data.every(item => item.status === 'published'),
      'Public catalog cannot expose drafts through status=draft'
    );

    const resPublicDraftDetail = await fetch(`${BASE_URL}/plants/${createdDraftData.data._id}`);
    assert(resPublicDraftDetail.status === 404, 'Public visitors cannot retrieve draft plant details');

    const resAdminAllPlants = await fetch(`${BASE_URL}/plants?status=all&limit=100`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminAllPlantsData = await resAdminAllPlants.json();
    assert(
      adminAllPlantsData.data.length === adminStatsData.data.totalPlants + 1,
      'Admin plant listing includes published and draft records'
    );

    const resAdminDraftDetail = await fetch(`${BASE_URL}/plants/${createdDraftData.data._id}`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(resAdminDraftDetail.status === 200, 'Admin can retrieve draft plant details');

    const adminJsonHeaders = { 'Authorization': `Bearer ${adminToken}`, 'Content-Type': 'application/json' };
    const resCreateDraftCollection = await fetch(`${BASE_URL}/collections`, {
      method: 'POST', headers: adminJsonHeaders,
      body: JSON.stringify({ title: `Draft Collection ${Date.now()}`, description: 'Draft visibility test', coverImage: 'https://example.com/collection.jpg', plants: [createdDraftData.data._id] })
    });
    const draftCollectionData = await resCreateDraftCollection.json();
    const publicDraftCollection = await (await fetch(`${BASE_URL}/collections/${draftCollectionData.data._id}`)).json();
    const adminDraftCollection = await (await fetch(`${BASE_URL}/collections/${draftCollectionData.data._id}`, { headers: { 'Authorization': `Bearer ${adminToken}` } })).json();
    assert(publicDraftCollection.data.plants.length === 0, 'Public collections do not populate draft plant records');
    assert(adminDraftCollection.data.plants.length === 1, 'Admin collections retain draft plant references');

    const resCreateDraftGardener = await fetch(`${BASE_URL}/gardeners`, {
      method: 'POST', headers: adminJsonHeaders,
      body: JSON.stringify({ name: 'Draft Plant Curator', specialization: 'Draft testing', contactEmail: `draft-${Date.now()}@example.com`, associatedPlants: [createdDraftData.data._id] })
    });
    const draftGardenerData = await resCreateDraftGardener.json();
    const publicDraftGardener = await (await fetch(`${BASE_URL}/gardeners/${draftGardenerData.data._id}`)).json();
    const adminDraftGardener = await (await fetch(`${BASE_URL}/gardeners/${draftGardenerData.data._id}`, { headers: { 'Authorization': `Bearer ${adminToken}` } })).json();
    assert(publicDraftGardener.data.associatedPlants.length === 0, 'Public gardener profiles do not populate draft plants');
    assert(adminDraftGardener.data.associatedPlants.length === 1, 'Admin gardener profiles retain draft plant references');

    const resCreateDraftGallery = await fetch(`${BASE_URL}/gallery`, {
      method: 'POST', headers: adminJsonHeaders,
      body: JSON.stringify({ imageUrl: 'https://example.com/draft-gallery.jpg', alt: 'Draft gallery test', caption: 'Draft gallery test', plant: createdDraftData.data._id })
    });
    const draftGalleryData = await resCreateDraftGallery.json();
    const publicGalleryData = await (await fetch(`${BASE_URL}/gallery?limit=100`)).json();
    const adminGalleryData = await (await fetch(`${BASE_URL}/gallery?limit=100`, { headers: { 'Authorization': `Bearer ${adminToken}` } })).json();
    assert(publicGalleryData.data.find(item => item._id === draftGalleryData.data._id).plant === null, 'Public gallery does not populate draft plant data');
    assert(adminGalleryData.data.find(item => item._id === draftGalleryData.data._id).plant._id === createdDraftData.data._id, 'Admin gallery retains draft plant data');

    await fetch(`${BASE_URL}/collections/${draftCollectionData.data._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
    await fetch(`${BASE_URL}/gardeners/${draftGardenerData.data._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });
    await fetch(`${BASE_URL}/gallery/${draftGalleryData.data._id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${adminToken}` } });

    const resDeleteDraft = await fetch(`${BASE_URL}/plants/${createdDraftData.data._id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(resDeleteDraft.status === 200, 'Admin deletes the temporary draft plant');

    // 10.4 Admin user management
    const resAdminUsers = await fetch(`${BASE_URL}/admin/users?role=user&page=1&limit=5`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminUsersData = await resAdminUsers.json();
    assert(
      resAdminUsers.status === 200
        && Array.isArray(adminUsersData.data)
        && adminUsersData.pagination?.page === 1
        && adminUsersData.data.every(item => !Object.prototype.hasOwnProperty.call(item, 'password')),
      'Admin lists paginated users without password fields'
    );

    const adminId = adminAuth.data.user.id || adminAuth.data.user._id;
    const resSelfDemotion = await fetch(`${BASE_URL}/admin/users/${adminId}/role`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${adminToken}`
      },
      body: JSON.stringify({ role: 'user' })
    });
    assert(resSelfDemotion.status === 409, 'Admin cannot demote their own active account');

    const resSelfDelete = await fetch(`${BASE_URL}/admin/users/${adminId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(resSelfDelete.status === 409, 'Admin cannot delete their own active account');

    // 10.3 Admin browsing contact inbox
    const resAdminContact = await fetch(`${BASE_URL}/contact`, {
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    const adminContactData = await resAdminContact.json();
    assert(resAdminContact.status === 200 && adminContactData.data.length > 0, 'Admin browses contact inquiry inbox successfully');

    const createdContactId = contactData.data._id;
    const resDeleteContact = await fetch(`${BASE_URL}/contact/${createdContactId}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    assert(resDeleteContact.status === 200, 'Admin deletes a contact inquiry successfully');

    // Summary
    console.log('\n========================================================');
    console.log(`🏁 TEST EXECUTION SUMMARY: ${passed} PASS / ${failed} FAIL`);
    if (failed === 0) {
      console.log('🎉 ALL BACKEND STANDARDS MET WITH 100% SUCCESS!');
    } else {
      console.error('⚠️ SOME TESTS FAILED. PLEASE VERIFY.');
    }
    console.log('========================================================\n');

    if (server && server.listening) {
      server.close();
    }
    process.exit(failed === 0 ? 0 : 1);
  } catch (error) {
    console.error('💥 Exception during test execution:', error);
    if (server && server.listening) {
      server.close();
    }
    process.exit(1);
  }
}

setTimeout(runTests, 1000);
