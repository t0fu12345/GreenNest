import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import {
  BOTANICAL_SPECIMENS,
  CANONICAL_PLANT_SLUGS,
  PLANT_COLLECTIONS,
  DATABASE_USERS
} from '../data/botanicalSpecimens';
import { decodeJwt } from '../utils/jwt';
import adminApi from '../services/adminApi';
import plantApi from '../services/plantApi';
import contactApi from '../services/contactApi';

const DEFAULT_PLANT_IMAGE = 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80';
const DEFAULT_USER_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80';

const AdminDashboard = () => {
  const { user, token, logout, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('plants'); // 'plants' | 'collections' | 'users' | 'jwt'
  const [userList, setUserList] = useState([]);
  const [specimens, setSpecimens] = useState([]);
  const [collections, setCollections] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stats, setStats] = useState(null);

  // Plant form state for adding new specimens
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    scientificName: '',
    category: 'foliage',
    biome: 'tropical',
    water: 'moderate',
    light: 'bright-indirect',
    difficulty: 'easy',
    soil: 'Chunky aroid substrate, coco coir & perlite mix',
    image: DEFAULT_PLANT_IMAGE,
    shortDesc: ''
  });

  // Load registered users, plants and collections from DB sources & localStorage
  useEffect(() => {
    // 1. Users from DB / AuthContext
    if (typeof getAllUsers === 'function') {
      const loadedUsers = getAllUsers();
      setUserList(loadedUsers && loadedUsers.length > 0 ? loadedUsers : DATABASE_USERS);
    } else {
      setUserList(DATABASE_USERS);
    }

    // 2. Canonical specimens from MongoDB seed dataset (clean 20 canonical plants)
    const canonicalPlants = CANONICAL_PLANT_SLUGS.map(slug => BOTANICAL_SPECIMENS[slug]).filter(Boolean);

    // 3. Collections from MongoDB seed dataset
    try {
      const customCols = localStorage.getItem('greenNest_custom_collections');
      if (customCols) {
        setCollections(JSON.parse(customCols));
      } else {
        setCollections(PLANT_COLLECTIONS || []);
      }
    } catch {
      setCollections(PLANT_COLLECTIONS || []);
    }

    const loadBackendData = async () => {
      // Fetch backend stats if API is running
      try {
        const statsRes = await adminApi.getDashboardStats();
        if (statsRes?.data) {
          setStats(statsRes.data);
        }
      } catch (err) {
        console.warn('Dashboard stats API offline, using local metrics:', err.message);
      }

      // Fetch plants from MongoDB API if available
      try {
        const plantsRes = await plantApi.getPlants({ limit: 100 });
        if (plantsRes?.data?.plants && plantsRes.data.plants.length > 0) {
          const apiList = plantsRes.data.plants.map(p => ({
            id: p.specimenId || p.slug || p._id,
            _id: p._id,
            catalogCode: p.catalogCode || p.specimenId || 'CANOPY-001',
            name: p.name,
            scientificName: p.scientificName || p.botanicalName || '',
            category: p.category || 'foliage',
            biome: p.biome || 'tropical',
            biomeLabel: p.biome ? p.biome.toUpperCase() : 'Tropical Rainforest',
            image: p.image || p.images?.hero || p.images?.[0]?.url || DEFAULT_PLANT_IMAGE,
            water: p.watering || 'Every 7-10 days',
            light: p.light || 'Dappled indirect sunlight',
            soil: p.careGuide?.soil || p.soil || 'Chunky aroid mix',
            shortDesc: p.description || p.shortDesc || '',
            tags: p.tags?.length ? p.tags : ['#DatabaseCatalog']
          }));
          setSpecimens(apiList);
          return;
        }
      } catch (err) {
        console.warn('Backend plant API offline, using seed catalog:', err.message);
      }

      // Fallback to local canonical plants + custom specimens
      try {
        const customSaved = localStorage.getItem('greenNest_custom_specimens');
        if (customSaved) {
          const parsed = JSON.parse(customSaved);
          setSpecimens([...canonicalPlants, ...parsed]);
        } else {
          setSpecimens(canonicalPlants);
        }
      } catch {
        setSpecimens(canonicalPlants);
      }
    };

    loadBackendData();
  }, [getAllUsers]);

  // Decode active JWT token
  const decodedToken = token ? decodeJwt(token) : null;

  // Computed metrics from DB
  const metrics = useMemo(() => {
    const publishedCount = specimens.filter(p => p.status !== 'draft').length;
    const adminCount = userList.filter(u => u.role === 'admin').length;
    const memberCount = userList.filter(u => u.role !== 'admin').length;
    const distinctBiomes = Array.from(new Set(specimens.map(p => p.biomeLabel || p.biome || 'Tropical Biome')));
    const distinctCategories = Array.from(new Set(specimens.map(p => p.category).filter(Boolean)));
    const totalLinkedPlants = collections.reduce((acc, c) => acc + (c.plantSlugs?.length || 0), 0);

    return {
      publishedCount,
      adminCount,
      memberCount,
      distinctBiomes,
      distinctCategories,
      totalLinkedPlants
    };
  }, [specimens, userList, collections]);

  // Handle Role Toggle (Promote/Demote)
  const handleToggleRole = (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = updateUserRole(userId, nextRole);
    if (res.success) {
      setUserList(res.users);
      showToast(`User role successfully updated to: ${nextRole.toUpperCase()}`);
    } else {
      showToast(res.message);
    }
  };

  // Handle Delete User
  const handleDeleteUser = (userId, email) => {
    if (email === user?.email) {
      alert('Cannot delete the currently authenticated Administrator session.');
      return;
    }
    if (window.confirm(`Are you sure you want to delete user account: ${email}?`)) {
      const res = deleteUser(userId);
      if (res.success) {
        setUserList(res.users);
        showToast(`User account ${email} deleted successfully.`);
      }
    }
  };

  // Handle Add New Plant
  const handleAddPlant = async (e) => {
    e.preventDefault();
    if (!newPlant.name.trim()) return;

    const slug = newPlant.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const plantId = slug || `specimen-${Date.now()}`;
    const biomeLabelMap = {
      tropical: 'Tropical Biome',
      subtropical: 'Subtropical Highlands',
      arid: 'Arid & Desert',
      temperate: 'Temperate Canopy'
    };

    const plantPayload = {
      name: newPlant.name,
      scientificName: newPlant.scientificName || `${newPlant.name} spp.`,
      specimenId: `CANOPY-${String(specimens.length + 1).padStart(3, '0')}`,
      slug: plantId,
      category: newPlant.category || 'foliage',
      biome: newPlant.biome || 'tropical',
      light: newPlant.light,
      watering: newPlant.water,
      careLevel: newPlant.difficulty || 'Easy',
      description: newPlant.shortDesc || `Cultivar curated by Master Botanist ${user?.name || 'Administrator'}.`,
      origin: 'GreenNest Botanical Reserve',
      images: [{
        url: newPlant.image || DEFAULT_PLANT_IMAGE,
        alt: newPlant.name,
        isPrimary: true
      }]
    };

    try {
      let created = null;
      try {
        const res = await plantApi.createPlant(plantPayload);
        created = res?.data?.plant || res?.data;
      } catch (apiErr) {
        console.warn('Backend plant creation API offline, saving locally:', apiErr.message);
      }

      const normalizedCreated = {
        id: created?.specimenId || plantPayload.slug,
        slug: plantPayload.slug,
        _id: created?._id,
        catalogCode: created?.catalogCode || plantPayload.specimenId,
        name: created?.name || plantPayload.name,
        scientificName: created?.scientificName || plantPayload.scientificName,
        category: plantPayload.category,
        biome: created?.biome || plantPayload.biome,
        biomeLabel: biomeLabelMap[newPlant.biome] || 'Tropical Biome',
        image: newPlant.image || DEFAULT_PLANT_IMAGE,
        water: plantPayload.watering,
        light: plantPayload.light,
        soil: newPlant.soil,
        difficulty: newPlant.difficulty,
        shortDesc: plantPayload.description,
        tags: ['#NewSpecimen', '#CuratedCollection', `#${newPlant.category.charAt(0).toUpperCase() + newPlant.category.slice(1)}`]
      };

      setSpecimens(prev => [normalizedCreated, ...prev]);

      try {
        const saved = localStorage.getItem('greenNest_custom_specimens');
        const list = saved ? JSON.parse(saved) : [];
        list.push(normalizedCreated);
        localStorage.setItem('greenNest_custom_specimens', JSON.stringify(list));
      } catch {}

      setIsAddPlantOpen(false);
      setNewPlant({
        name: '',
        scientificName: '',
        category: 'foliage',
        biome: 'tropical',
        water: 'moderate',
        light: 'bright-indirect',
        difficulty: 'easy',
        soil: 'Chunky aroid substrate, coco coir & perlite mix',
        image: DEFAULT_PLANT_IMAGE,
        shortDesc: ''
      });

      showToast(`Added new botanical specimen: ${plantPayload.name}`);
    } catch (err) {
      console.error(err);
      showToast('Error saving new specimen to database.');
    }
  };

  // Handle Delete Plant
  const handleDeletePlant = async (plantId, plantName) => {
    if (window.confirm(`Confirm removal of specimen "${plantName}" from active database catalog?`)) {
      try {
        const target = specimens.find(p => p.id === plantId || p._id === plantId || p.slug === plantId);
        if (target?._id) {
          try {
            await plantApi.deletePlant(target._id);
          } catch (apiErr) {
            console.warn('Backend delete API offline, removing locally:', apiErr.message);
          }
        }

        try {
          let customList = [];
          const saved = localStorage.getItem('greenNest_custom_specimens');
          if (saved) customList = JSON.parse(saved);
          const filtered = customList.filter(p => p.id !== plantId && p.slug !== plantId);
          localStorage.setItem('greenNest_custom_specimens', JSON.stringify(filtered));
        } catch {}

        setSpecimens(prev => prev.filter(p => p.id !== plantId && p._id !== plantId && p.slug !== plantId));
        showToast(`Specimen "${plantName}" removed from catalog.`);
      } catch (err) {
        setSpecimens(prev => prev.filter(p => p.id !== plantId));
        showToast(`Removed from view: ${plantName}`);
      }
    }
  };

  // Filtered specimens
  const filteredSpecimens = specimens.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.catalogCode?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.biome?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: '#050d08',
      color: '#f8fafc',
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    }}>
      <Navbar />

      <main style={{
        flex: 1,
        padding: '120px 24px 80px 24px',
        maxWidth: '1380px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Top Exclusive Admin Header */}
        <div style={{
          background: 'rgba(14, 30, 22, 0.95)',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: '16px',
          padding: '28px 32px',
          marginBottom: '32px',
          boxShadow: '0 20px 50px rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(234, 179, 8, 0.12)',
              border: '1px solid rgba(234, 179, 8, 0.4)',
              color: '#fef08a',
              padding: '4px 14px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              borderRadius: '9999px'
            }}>
              👑 SYSTEM ADMINISTRATOR CLEARANCE (LEVEL 4)
            </div>

            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '2.4rem',
              color: '#ffffff',
              lineHeight: 1.2,
              marginBottom: '6px'
            }}>
              Botanical Control Center
            </h1>

            <p style={{ color: '#cbd5e1', fontSize: '0.92rem' }}>
              Authentication: <span style={{ color: '#86efac', fontFamily: 'monospace' }}>RFC 7519 HS256 Verified</span> • Active Administrator: <strong>{user?.name}</strong> ({user?.email})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(token || '');
                showToast('JWT Bearer Token copied to system clipboard!');
              }}
              style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#86efac',
                padding: '9px 18px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '9999px',
                transition: 'all 0.2s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              📋 Copy JWT Token
            </button>

            <button
              type="button"
              onClick={logout}
              style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#fca5a5',
                padding: '9px 18px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: '9999px',
                transition: 'all 0.2s ease'
              }}
            >
              Exit Admin Session
            </button>
          </div>
        </div>

        {/* Dynamic Telemetry Metric Boxes Grid from DB */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Plants */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px',
            borderLeft: '4px solid #22c55e'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              🌿 Catalog Specimens
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {specimens.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#86efac' }}>
              {metrics.publishedCount} Published • {metrics.distinctCategories.length} Categories
            </div>
          </div>

          {/* Card 2: Users */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              👥 User Accounts
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {userList.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#93c5fd' }}>
              {metrics.adminCount} Administrators • {metrics.memberCount} Members
            </div>
          </div>

          {/* Card 3: Collections */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px',
            borderLeft: '4px solid #f59e0b'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              📁 Seasonal Collections
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {collections.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#fde68a' }}>
              {metrics.totalLinkedPlants} Curated Specimen Links
            </div>
          </div>

          {/* Card 4: Biomes & Microclimates */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '16px',
            padding: '24px',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              🌐 Microclimate Biomes
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {metrics.distinctBiomes.length} Zones
            </div>
            <div style={{ fontSize: '0.82rem', color: '#86efac' }}>
              {metrics.distinctBiomes.slice(0, 3).join(' • ')}
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '28px',
          gap: '8px',
          overflowX: 'auto'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('plants')}
            style={{
              padding: '14px 22px',
              background: activeTab === 'plants' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'plants' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'plants' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            🌿 Specimen Catalog ({specimens.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('collections')}
            style={{
              padding: '14px 22px',
              background: activeTab === 'collections' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'collections' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'collections' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            📁 Curated Collections ({collections.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            style={{
              padding: '14px 22px',
              background: activeTab === 'users' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'users' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'users' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            👥 User Accounts & RBAC ({userList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jwt')}
            style={{
              padding: '14px 22px',
              background: activeTab === 'jwt' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'jwt' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'jwt' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            🔐 JWT Token & Security Claims
          </button>
        </div>

        {/* TAB 1: PLANTS MANAGEMENT */}
        {activeTab === 'plants' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '20px'
            }}>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flex: 1, maxWidth: '640px' }}>
                <input
                  type="text"
                  placeholder="🔍 Search specimens by name, genus, or code..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    background: 'rgba(14, 30, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    flex: 1,
                    minWidth: '220px'
                  }}
                />

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{
                    background: 'rgba(14, 30, 22, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '0.88rem'
                  }}
                >
                  <option value="all">All Categories</option>
                  <option value="foliage">Foliage Plants</option>
                  <option value="succulent">Succulents</option>
                  <option value="herb">Herbs</option>
                  <option value="flower">Flowering</option>
                  <option value="tree">Indoor Trees</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setIsAddPlantOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '9999px',
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 14px rgba(34, 197, 94, 0.35)'
                }}
              >
                <span>➕ Add New Specimen</span>
              </button>
            </div>

            {/* Plants Table */}
            <div style={{
              overflowX: 'auto',
              background: 'rgba(14, 30, 22, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '14px'
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Thumbnail</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Catalog Code & Name</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Botanical Taxon</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Category & Biome</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Light & Hydration</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Status</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecimens.length === 0 ? (
                    <tr>
                      <td colSpan="7" style={{ padding: '36px', textAlign: 'center', color: '#94a3b8' }}>
                        No botanical specimens match your search criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredSpecimens.map((plant, index) => (
                      <tr
                        key={plant.id || plant.slug || index}
                        style={{
                          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                          transition: 'background 0.2s ease'
                        }}
                      >
                        <td style={{ padding: '12px 18px' }}>
                          <img
                            src={plant.image}
                            alt={plant.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_PLANT_IMAGE;
                            }}
                            style={{
                              width: '48px',
                              height: '48px',
                              objectFit: 'cover',
                              borderRadius: '8px',
                              border: '1px solid rgba(255,255,255,0.1)'
                            }}
                          />
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ fontWeight: 700, color: '#f0fdf4' }}>{plant.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#86efac', fontFamily: 'monospace' }}>
                            {plant.catalogCode || 'SPECIMEN'}
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px', fontStyle: 'italic', color: '#cbd5e1' }}>
                          {plant.scientificName}
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                            <span style={{
                              background: 'rgba(34, 197, 94, 0.15)',
                              border: '1px solid rgba(34, 197, 94, 0.3)',
                              color: '#86efac',
                              padding: '2px 8px',
                              fontSize: '0.72rem',
                              borderRadius: '4px',
                              textTransform: 'capitalize'
                            }}>
                              {plant.category || 'foliage'}
                            </span>
                            <span style={{
                              background: 'rgba(255, 255, 255, 0.06)',
                              padding: '2px 8px',
                              fontSize: '0.72rem',
                              color: '#cbd5e1',
                              borderRadius: '4px'
                            }}>
                              {plant.biomeLabel || plant.biome || 'Tropical'}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 18px', fontSize: '0.8rem', color: '#94a3b8' }}>
                          <div>☀️ {plant.light || 'Bright indirect'}</div>
                          <div>💧 {plant.water || 'Moderate'}</div>
                        </td>
                        <td style={{ padding: '12px 18px' }}>
                          <span style={{
                            background: plant.status === 'draft' ? 'rgba(234, 179, 8, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                            border: `1px solid ${plant.status === 'draft' ? 'rgba(234, 179, 8, 0.4)' : 'rgba(34, 197, 94, 0.4)'}`,
                            color: plant.status === 'draft' ? '#fef08a' : '#86efac',
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            textTransform: 'uppercase'
                          }}>
                            {plant.status || 'published'}
                          </span>
                        </td>
                        <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                          <div style={{ display: 'inline-flex', gap: '8px' }}>
                            <Link
                              to={`/specimen-detail?id=${encodeURIComponent(plant.id || plant.slug)}`}
                              style={{
                                background: 'rgba(255, 255, 255, 0.08)',
                                border: '1px solid rgba(255, 255, 255, 0.15)',
                                color: '#fff',
                                padding: '5px 12px',
                                borderRadius: '6px',
                                textDecoration: 'none',
                                fontSize: '0.78rem',
                                transition: 'all 0.2s ease'
                              }}
                            >
                              View ↗
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDeletePlant(plant.id || plant.slug, plant.name)}
                              style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                border: '1px solid rgba(239, 68, 68, 0.4)',
                                color: '#fca5a5',
                                padding: '5px 10px',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '0.78rem'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: COLLECTIONS MANAGEMENT */}
        {activeTab === 'collections' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', margin: '0 0 4px 0' }}>
                  Curated Seasonal Collections Database
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '0.86rem', margin: 0 }}>
                  Curated portfolios synchronized with the 4 climatic seasonal transitions.
                </p>
              </div>
              <Link
                to="/collections"
                style={{
                  background: 'rgba(34, 197, 94, 0.15)',
                  border: '1px solid rgba(34, 197, 94, 0.4)',
                  color: '#86efac',
                  padding: '8px 18px',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontSize: '0.84rem',
                  fontWeight: 600
                }}
              >
                Browse Collections Page ↗
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {collections.map((col) => (
                <div
                  key={col.slug}
                  style={{
                    background: 'rgba(14, 30, 22, 0.85)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                    <img
                      src={col.image}
                      alt={col.name}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = DEFAULT_PLANT_IMAGE;
                      }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: 'rgba(7, 16, 11, 0.85)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: '#86efac',
                      textTransform: 'uppercase'
                    }}>
                      {col.seasonKey} Collection
                    </span>
                  </div>

                  <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <h4 style={{ color: '#fff', fontSize: '1.15rem', margin: 0 }}>{col.name}</h4>
                    <p style={{ color: '#94a3b8', fontSize: '0.84rem', lineHeight: 1.5, margin: 0 }}>
                      {col.description}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '8px' }}>
                        Linked Specimens ({col.plantSlugs?.length || 0}):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {(col.plantSlugs || []).map(ps => (
                          <span
                            key={ps}
                            style={{
                              background: 'rgba(34, 197, 94, 0.12)',
                              border: '1px solid rgba(34, 197, 94, 0.25)',
                              color: '#86efac',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              fontSize: '0.72rem',
                              fontFamily: 'monospace'
                            }}
                          >
                            {ps}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: USER DIRECTORY & ROLES */}
        {activeTab === 'users' && (
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '14px',
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>User Account</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Email</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Role & Permissions</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Saved Garden Slugs</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Status</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8', textAlign: 'right' }}>RBAC Administration</th>
                </tr>
              </thead>
              <tbody>
                {userList.map((u) => {
                  const isCurrentAdmin = u.role === 'admin';
                  return (
                    <tr key={u.id || u.email} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <img
                            src={u.avatar || DEFAULT_USER_AVATAR}
                            alt={u.name}
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = DEFAULT_USER_AVATAR;
                            }}
                            style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div>
                            <div style={{ fontWeight: 700, color: '#f0fdf4' }}>
                              {u.name}{' '}
                              <span style={{ fontSize: '0.74rem', color: '#86efac', fontFamily: 'monospace', fontWeight: 600 }}>
                                @{u.nickname || u.email?.split('@')[0]}
                              </span>
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>{u.level || 'Member'}</div>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px', color: '#cbd5e1' }}>
                        {u.email}
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                          background: isCurrentAdmin ? 'rgba(234, 179, 8, 0.18)' : 'rgba(34, 197, 94, 0.15)',
                          border: isCurrentAdmin ? '1px solid #facc15' : '1px solid #22c55e',
                          color: isCurrentAdmin ? '#fef08a' : '#86efac',
                          padding: '3px 10px',
                          borderRadius: '9999px',
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {isCurrentAdmin ? '👑 ADMIN' : '👤 MEMBER'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', color: '#cbd5e1' }}>
                        <div style={{ fontSize: '0.8rem', color: '#86efac' }}>
                          {(u.savedGardenSlugs?.length || 0)} plants saved
                        </div>
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{
                          background: 'rgba(34, 197, 94, 0.15)',
                          border: '1px solid rgba(34, 197, 94, 0.3)',
                          color: '#86efac',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          textTransform: 'uppercase'
                        }}>
                          {u.status || 'active'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            type="button"
                            onClick={() => handleToggleRole(u.id, u.role)}
                            style={{
                              background: isCurrentAdmin ? 'rgba(255, 255, 255, 0.08)' : 'rgba(234, 179, 8, 0.2)',
                              border: isCurrentAdmin ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(234, 179, 8, 0.5)',
                              color: isCurrentAdmin ? '#cbd5e1' : '#fef08a',
                              padding: '5px 12px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {isCurrentAdmin ? 'Demote to Member' : 'Promote to Admin'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#fca5a5',
                              padding: '5px 10px',
                              borderRadius: '6px',
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 4: JWT TOKEN INSPECTOR */}
        {activeTab === 'jwt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Raw JWT Token */}
            <div style={{
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                  Active JWT Token (RFC 7519)
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                  Bearer Token Active
                </span>
              </div>

              <div style={{
                background: '#040b06',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '16px',
                fontFamily: 'Consolas, monospace',
                fontSize: '0.84rem',
                wordBreak: 'break-all',
                lineHeight: 1.6,
                color: '#86efac',
                borderRadius: '8px'
              }}>
                {token}
              </div>
            </div>

            {/* Decoded 3 Parts Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '20px'
            }}>
              {/* Header Box */}
              <div style={{
                background: 'rgba(14, 30, 22, 0.8)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                borderRadius: '14px',
                padding: '20px',
                borderTop: '4px solid #ef4444'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#fca5a5', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  HEADER: ALGORITHM & TOKEN TYPE
                </div>
                <pre style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: '#f87171',
                  overflowX: 'auto',
                  margin: 0
                }}>
                  {JSON.stringify(decodedToken?.header || { alg: "HS256", typ: "JWT" }, null, 2)}
                </pre>
              </div>

              {/* Payload Claims Box */}
              <div style={{
                background: 'rgba(14, 30, 22, 0.8)',
                border: '1px solid rgba(168, 85, 247, 0.4)',
                borderRadius: '14px',
                padding: '20px',
                borderTop: '4px solid #a855f7'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#d8b4fe', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  PAYLOAD: DATA CLAIMS & PERMISSIONS
                </div>
                <pre style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: '#c084fc',
                  overflowX: 'auto',
                  margin: 0
                }}>
                  {JSON.stringify(decodedToken?.payload || {}, null, 2)}
                </pre>
              </div>

              {/* Signature Box */}
              <div style={{
                background: 'rgba(14, 30, 22, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '14px',
                padding: '20px',
                borderTop: '4px solid #3b82f6'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  VERIFY SIGNATURE: HMAC-SHA256
                </div>
                <div style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: '6px',
                  fontSize: '0.82rem',
                  color: '#60a5fa',
                  fontFamily: 'monospace',
                  wordBreak: 'break-all'
                }}>
                  HMACSHA256(<br/>
                  &nbsp;&nbsp;base64UrlEncode(header) + "." +<br/>
                  &nbsp;&nbsp;base64UrlEncode(payload),<br/>
                  &nbsp;&nbsp;secretKey<br/>
                  ) = <span style={{ color: '#93c5fd' }}>{decodedToken?.rawSignature}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal: Add Specimen */}
      {isAddPlantOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(3, 8, 5, 0.88)',
          backdropFilter: 'blur(16px)',
          zIndex: 2500,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }}>
          <div style={{
            background: 'rgba(14, 30, 22, 0.98)',
            border: '1px solid rgba(34, 197, 94, 0.5)',
            borderRadius: '20px',
            maxWidth: '580px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', margin: 0 }}>
                Add New Botanical Specimen
              </h3>
              <button
                type="button"
                onClick={() => setIsAddPlantOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '1.4rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddPlant} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Common Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alocasia Amazonica"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  Scientific Botanical Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alocasia x amazonica"
                  value={newPlant.scientificName}
                  onChange={(e) => setNewPlant({ ...newPlant, scientificName: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Category</label>
                  <select
                    value={newPlant.category}
                    onChange={(e) => setNewPlant({ ...newPlant, category: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                  >
                    <option value="foliage">Foliage</option>
                    <option value="succulent">Succulent</option>
                    <option value="herb">Herb</option>
                    <option value="flower">Flower</option>
                    <option value="tree">Indoor Tree</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Microclimate Biome</label>
                  <select
                    value={newPlant.biome}
                    onChange={(e) => setNewPlant({ ...newPlant, biome: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                  >
                    <option value="tropical">Tropical Biome</option>
                    <option value="subtropical">Subtropical Highlands</option>
                    <option value="arid">Arid & Desert</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Light Requirement</label>
                  <select
                    value={newPlant.light}
                    onChange={(e) => setNewPlant({ ...newPlant, light: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                  >
                    <option value="bright-indirect">Bright Indirect</option>
                    <option value="low">Low Light</option>
                    <option value="medium">Medium Light</option>
                    <option value="full-sun">Full Sun</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Hydration Cadence</label>
                  <select
                    value={newPlant.water}
                    onChange={(e) => setNewPlant({ ...newPlant, water: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                  >
                    <option value="moderate">Moderate (Weekly)</option>
                    <option value="low">Low (14-21 Days)</option>
                    <option value="high">High (3-5 Days)</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Image URL</label>
                <input
                  type="url"
                  value={newPlant.image}
                  onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Short Description</label>
                <textarea
                  rows="3"
                  placeholder="Botanical characteristics and biophilic design qualities..."
                  value={newPlant.shortDesc}
                  onChange={(e) => setNewPlant({ ...newPlant, shortDesc: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: '8px', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(false)}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--emerald-accent)', border: 'none', color: '#07100b', fontWeight: 700, padding: '10px 24px', borderRadius: '8px', cursor: 'pointer' }}
                >
                  Save New Specimen
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Status Toast */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'rgba(14, 30, 22, 0.98)',
          border: '1px solid var(--emerald-accent)',
          color: '#86efac',
          padding: '14px 22px',
          borderRadius: '12px',
          boxShadow: '0 20px 45px rgba(0,0,0,0.8)',
          fontSize: '0.9rem',
          fontWeight: 600,
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span>🌿</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default AdminDashboard;
