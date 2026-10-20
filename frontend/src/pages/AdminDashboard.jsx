import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';
import { decodeJwt } from '../utils/jwt';
import adminApi from '../services/adminApi';
import plantApi from '../services/plantApi';
import contactApi from '../services/contactApi';

const AdminDashboard = () => {
  const { user, token, logout, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('plants'); // 'plants' | 'users' | 'jwt'
  const [userList, setUserList] = useState([]);
  const [specimens, setSpecimens] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState(null);

  // Plant form state
  const [isAddPlantOpen, setIsAddPlantOpen] = useState(false);
  const [newPlant, setNewPlant] = useState({
    name: '',
    scientificName: '',
    biome: 'tropical',
    water: 'Every 7-10 days',
    light: 'Dappled indirect sunlight',
    soil: 'Chunky aroid mix',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
    shortDesc: ''
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Load registered users, stats, and plants from MongoDB
  useEffect(() => {
    // Users
    if (typeof getAllUsers === 'function') {
      setUserList(getAllUsers());
    }

    // Default fallback list
    const defaultList = Object.values(BOTANICAL_SPECIMENS);

    const loadBackendData = async () => {
      // 1. Thống kê Dashboard
      try {
        const statsRes = await adminApi.getDashboardStats();
        if (statsRes?.data) {
          setStats(statsRes.data);
        }
      } catch (err) {
        console.warn('Chưa lấy được stats từ API:', err.message);
      }

      // 2. Danh sách cây từ MongoDB
      try {
        const plantsRes = await plantApi.getPlants({ limit: 100 });
        if (plantsRes?.data?.plants && plantsRes.data.plants.length > 0) {
          const apiList = plantsRes.data.plants.map(p => ({
            id: p.specimenId || p._id,
            _id: p._id,
            catalogCode: p.specimenId || 'CANOPY-001',
            name: p.name,
            scientificName: p.scientificName || p.botanicalName || '',
            biome: p.biome || 'tropical',
            biomeLabel: p.biome ? p.biome.toUpperCase() : 'Tropical Rainforest',
            image: p.images?.[0]?.url || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
            water: p.watering || 'Every 7-10 days',
            light: p.light || 'Dappled indirect sunlight',
            soil: p.careGuide?.soil || 'Chunky aroid mix',
            shortDesc: p.description || '',
            tags: p.tags?.length ? p.tags : ['#DatabaseCatalog']
          }));
          setSpecimens(apiList);
          return;
        }
      } catch (err) {
        console.warn('Dùng dữ liệu dự phòng cho admin plants:', err.message);
      }

      // Fallback
      setSpecimens(defaultList);
    };

    loadBackendData();
  }, [getAllUsers]);

  // Decode active JWT token
  const decodedToken = token ? decodeJwt(token) : null;

  // Handle Role Toggle (Promote/Demote)
  const handleToggleRole = (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = updateUserRole(userId, nextRole);
    if (res.success) {
      setUserList(res.users);
      showToast(`Đã cập nhật vai trò người dùng thành: ${nextRole.toUpperCase()}`);
    } else {
      showToast(res.message);
    }
  };

  // Handle Delete User
  const handleDeleteUser = (userId, email) => {
    if (email === user?.email) {
      alert('Không thể xóa tài khoản Admin đang đăng nhập hiện tại.');
      return;
    }
    if (window.confirm(`Bạn có chắc chắn muốn xóa tài khoản ${email}?`)) {
      const res = deleteUser(userId);
      if (res.success) {
        setUserList(res.users);
        showToast(`Đã xóa thành công người dùng: ${email}`);
      }
    }
  };

  // Handle Add New Plant
  const handleAddPlant = async (e) => {
    e.preventDefault();
    if (!newPlant.name.trim()) return;

    const plantPayload = {
      name: newPlant.name,
      scientificName: newPlant.scientificName || `${newPlant.name} spp.`,
      specimenId: `CANOPY-${Math.floor(100 + Math.random() * 900)}`,
      category: 'foliage',
      biome: newPlant.biome || 'tropical',
      light: newPlant.light,
      watering: newPlant.water,
      careLevel: 'medium',
      description: newPlant.shortDesc || `Cultivar curated by Master Botanist ${user?.name}.`,
      origin: 'GreenNest Botanical Reserve',
      images: [{
        url: newPlant.image,
        alt: newPlant.name,
        isPrimary: true
      }]
    };

    try {
      const res = await plantApi.createPlant(plantPayload);
      const created = res?.data?.plant || res?.data;
      const normalizedCreated = {
        id: created?.specimenId || plantPayload.specimenId,
        _id: created?._id,
        catalogCode: created?.specimenId || plantPayload.specimenId,
        name: created?.name || plantPayload.name,
        scientificName: created?.scientificName || plantPayload.scientificName,
        biome: created?.biome || plantPayload.biome,
        biomeLabel: (created?.biome || plantPayload.biome).toUpperCase(),
        image: plantPayload.images[0].url,
        water: plantPayload.watering,
        light: plantPayload.light,
        soil: newPlant.soil,
        shortDesc: plantPayload.description,
        tags: ['#NewSpecimen', '#CuratedCollection', '#AdminAdded']
      };

      setSpecimens(prev => [normalizedCreated, ...prev]);
      setIsAddPlantOpen(false);
      setNewPlant({
        name: '',
        scientificName: '',
        biome: 'tropical',
        water: 'Every 7-10 days',
        light: 'Dappled indirect sunlight',
        soil: 'Chunky aroid mix',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=800&q=80',
        shortDesc: ''
      });
      showToast(`Đã thêm cây trồng mới vào MongoDB: ${plantPayload.name}`);
    } catch (err) {
      showToast(err.message || 'Lỗi khi thêm cây trồng');
    }
  };

  // Handle Delete Plant
  const handleDeletePlant = async (plantId, plantName) => {
    if (window.confirm(`Xác nhận xóa cây trồng "${plantName}" khỏi hệ thống?`)) {
      try {
        const target = specimens.find(p => p.id === plantId || p._id === plantId);
        if (target?._id) {
          await plantApi.deletePlant(target._id);
        }
        setSpecimens(prev => prev.filter(p => p.id !== plantId && p._id !== plantId));
        showToast(`Đã xóa cây trồng "${plantName}" thành công!`);
      } catch (err) {
        setSpecimens(prev => prev.filter(p => p.id !== plantId));
        showToast(`Đã xóa khỏi giao diện: ${plantName}`);
      }
    }
  };

  const filteredSpecimens = specimens.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.biome?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        maxWidth: '1360px',
        width: '100%',
        margin: '0 auto'
      }}>
        {/* Top Exclusive Admin Header */}
        <div style={{
          background: 'rgba(14, 30, 22, 0.95)',
          border: '1px solid rgba(34, 197, 94, 0.35)',
          borderRadius: 0,
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
              padding: '4px 12px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              marginBottom: '10px',
              borderRadius: 0
            }}>
              👑 EXCLUSIVE CLEARANCE: LEVEL 4 SYSTEM ADMIN
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
              Xác thực JWT: <span style={{ color: '#86efac', fontFamily: 'monospace' }}>HS256 Verified</span> • Quản trị viên: <strong>{user?.name}</strong> ({user?.email})
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText(token || '');
                showToast('Đã sao chép chuỗi mã JWT Token vào bộ nhớ tạm!');
              }}
              style={{
                background: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                color: '#86efac',
                padding: '9px 18px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                borderRadius: 0,
                transition: 'all 0.2s ease'
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
                borderRadius: 0,
                transition: 'all 0.2s ease'
              }}
            >
              Thoát quyền Admin
            </button>
          </div>
        </div>

        {/* Telemetry Metric Boxes Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          {/* Card 1: Plants */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 0,
            padding: '24px',
            borderLeft: '4px solid #22c55e'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              🌿 Catalog Specimens
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {specimens.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#86efac' }}>
              Active living specimens in database
            </div>
          </div>

          {/* Card 2: Users */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 0,
            padding: '24px',
            borderLeft: '4px solid #3b82f6'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              👥 Registered Accounts
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              {userList.length}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#93c5fd' }}>
              {userList.filter(u => u.role === 'admin').length} Administrators • {userList.filter(u => u.role !== 'admin').length} Members
            </div>
          </div>

          {/* Card 3: JWT Security */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 0,
            padding: '24px',
            borderLeft: '4px solid #eab308'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              🛡️ Token Expiration
            </div>
            <div style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fef08a', margin: '14px 0 6px 0', fontFamily: 'monospace' }}>
              {decodedToken?.payload?.exp ? new Date(decodedToken.payload.exp * 1000).toLocaleDateString('vi-VN') : 'Active'}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#cbd5e1' }}>
              Algorithm: HS256 Standard JWT
            </div>
          </div>

          {/* Card 4: Biome Telemetry */}
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 0,
            padding: '24px',
            borderLeft: '4px solid #10b981'
          }}>
            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
              🌐 Microclimate Biomes
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, color: '#ffffff', margin: '8px 0 4px 0' }}>
              3 Zones
            </div>
            <div style={{ fontSize: '0.82rem', color: '#86efac' }}>
              Tropical • Subtropical • Arid
            </div>
          </div>
        </div>

        {/* Tab Navigation (Sharp Square Tabs) */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
          marginBottom: '28px',
          gap: '4px'
        }}>
          <button
            type="button"
            onClick={() => setActiveTab('plants')}
            style={{
              padding: '14px 24px',
              background: activeTab === 'plants' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'plants' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'plants' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.94rem',
              cursor: 'pointer',
              borderRadius: 0,
              transition: 'all 0.2s ease'
            }}
          >
            🌿 Quản lý Cây trồng ({specimens.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('users')}
            style={{
              padding: '14px 24px',
              background: activeTab === 'users' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'users' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'users' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.94rem',
              cursor: 'pointer',
              borderRadius: 0,
              transition: 'all 0.2s ease'
            }}
          >
            👥 Người dùng & Phân quyền ({userList.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('jwt')}
            style={{
              padding: '14px 24px',
              background: activeTab === 'jwt' ? 'rgba(34, 197, 94, 0.2)' : 'transparent',
              border: 'none',
              borderBottom: activeTab === 'jwt' ? '3px solid #22c55e' : '3px solid transparent',
              color: activeTab === 'jwt' ? '#ffffff' : '#94a3b8',
              fontWeight: 700,
              fontSize: '0.94rem',
              cursor: 'pointer',
              borderRadius: 0,
              transition: 'all 0.2s ease'
            }}
          >
            🔐 Cơ chế JWT Token & Claims
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
              <input
                type="text"
                placeholder="🔍 Tìm kiếm cây theo tên hoặc chi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  background: 'rgba(14, 30, 22, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#fff',
                  padding: '10px 16px',
                  borderRadius: 0,
                  fontSize: '0.9rem',
                  maxWidth: '360px',
                  width: '100%'
                }}
              />

              <button
                type="button"
                onClick={() => setIsAddPlantOpen(true)}
                style={{
                  background: 'linear-gradient(135deg, #22c55e 0%, #15803d 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 0,
                  padding: '10px 22px',
                  fontWeight: 700,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>➕ Thêm cây trồng mới</span>
              </button>
            </div>

            {/* Plants Table */}
            <div style={{
              overflowX: 'auto',
              background: 'rgba(14, 30, 22, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: 0
            }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Ảnh</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Mã & Tên cây</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Tên khoa học</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Hệ sinh thái</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Ánh sáng & Nước</th>
                    <th style={{ padding: '14px 18px', color: '#94a3b8', textAlign: 'right' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSpecimens.map((plant, index) => (
                    <tr
                      key={plant.id || index}
                      style={{
                        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                        transition: 'background 0.2s ease'
                      }}
                    >
                      <td style={{ padding: '12px 18px' }}>
                        <img
                          src={plant.image}
                          alt={plant.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: 0, border: '1px solid rgba(255,255,255,0.1)' }}
                        />
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <div style={{ fontWeight: 700, color: '#f0fdf4' }}>{plant.name}</div>
                        <div style={{ fontSize: '0.74rem', color: '#86efac', fontFamily: 'monospace' }}>{plant.catalogCode || 'SPECIMEN'}</div>
                      </td>
                      <td style={{ padding: '12px 18px', fontStyle: 'italic', color: '#cbd5e1' }}>
                        {plant.scientificName}
                      </td>
                      <td style={{ padding: '12px 18px' }}>
                        <span style={{
                          background: plant.biome === 'tropical' ? 'rgba(34, 197, 94, 0.15)' : (plant.biome === 'subtropical' ? 'rgba(59, 130, 246, 0.15)' : 'rgba(234, 179, 8, 0.15)'),
                          border: '1px solid rgba(255, 255, 255, 0.15)',
                          padding: '3px 8px',
                          fontSize: '0.75rem',
                          borderRadius: 0,
                          textTransform: 'capitalize'
                        }}>
                          {plant.biome}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', fontSize: '0.8rem', color: '#94a3b8' }}>
                        <div>☀️ {plant.light || 'Diffused'}</div>
                        <div>💧 {plant.water || 'Moderate'}</div>
                      </td>
                      <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <Link
                            to={`/specimen-detail?id=${encodeURIComponent(plant.id)}`}
                            style={{
                              background: 'rgba(255, 255, 255, 0.08)',
                              border: '1px solid rgba(255, 255, 255, 0.15)',
                              color: '#fff',
                              padding: '5px 10px',
                              borderRadius: 0,
                              textDecoration: 'none',
                              fontSize: '0.78rem'
                            }}
                          >
                            Xem ↗
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleDeletePlant(plant.id, plant.name)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#fca5a5',
                              padding: '5px 10px',
                              borderRadius: 0,
                              cursor: 'pointer',
                              fontSize: '0.78rem'
                            }}
                          >
                            Xóa
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: USER DIRECTORY & ROLES */}
        {activeTab === 'users' && (
          <div style={{
            background: 'rgba(14, 30, 22, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: 0,
            overflowX: 'auto'
          }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255, 255, 255, 0.12)' }}>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Người dùng</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Email</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Vai trò & Quyền</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Hệ sinh thái</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8' }}>Ngày tham gia</th>
                  <th style={{ padding: '14px 18px', color: '#94a3b8', textAlign: 'right' }}>Thao tác phân quyền</th>
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
                            src={u.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"}
                            alt={u.name}
                            style={{ width: '36px', height: '36px', borderRadius: 0, objectFit: 'cover' }}
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
                          borderRadius: 0,
                          fontSize: '0.76rem',
                          fontWeight: 700,
                          textTransform: 'uppercase'
                        }}>
                          {isCurrentAdmin ? '👑 ADMIN' : '👤 USER'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 18px', color: '#cbd5e1' }}>
                        {u.biome || 'Tropical Biome'}
                      </td>
                      <td style={{ padding: '12px 18px', color: '#94a3b8', fontSize: '0.8rem' }}>
                        {u.joinDate || 'March 2026'}
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
                              borderRadius: 0,
                              fontSize: '0.78rem',
                              fontWeight: 600,
                              cursor: 'pointer'
                            }}
                          >
                            {isCurrentAdmin ? 'Hạ cấp User' : 'Nâng cấp Admin'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteUser(u.id, u.email)}
                            style={{
                              background: 'rgba(239, 68, 68, 0.15)',
                              border: '1px solid rgba(239, 68, 68, 0.4)',
                              color: '#fca5a5',
                              padding: '5px 10px',
                              borderRadius: 0,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            Xóa
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

        {/* TAB 3: JWT TOKEN INSPECTOR */}
        {activeTab === 'jwt' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Raw JWT Token */}
            <div style={{
              background: 'rgba(14, 30, 22, 0.85)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: 0,
              padding: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <h3 style={{ color: '#fff', fontSize: '1.1rem', margin: 0 }}>
                  Chuỗi mã JWT Token (RFC 7519) hiện hành
                </h3>
                <span style={{ fontSize: '0.78rem', color: '#86efac', background: 'rgba(34, 197, 94, 0.15)', padding: '3px 8px', borderRadius: 0 }}>
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
                borderRadius: 0
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
                borderRadius: 0,
                padding: '20px',
                borderTop: '4px solid #ef4444'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#fca5a5', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  HEADER: ALGORITHM & TOKEN TYPE
                </div>
                <pre style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: 0,
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
                borderRadius: 0,
                padding: '20px',
                borderTop: '4px solid #a855f7'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#d8b4fe', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  PAYLOAD: DATA CLAIMS & PERMISSIONS
                </div>
                <pre style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: 0,
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
                borderRadius: 0,
                padding: '20px',
                borderTop: '4px solid #3b82f6'
              }}>
                <div style={{ fontSize: '0.76rem', color: '#93c5fd', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                  VERIFY SIGNATURE: HMAC-SHA256
                </div>
                <div style={{
                  background: '#040b06',
                  padding: '12px',
                  borderRadius: 0,
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

      {/* Modal: Add Specimen (Square Box) */}
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
            borderRadius: 0,
            maxWidth: '560px',
            width: '100%',
            padding: '32px',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', margin: 0 }}>
                Thêm Thực Vật Vào Danh Mục
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
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Tên Cây (Common Name)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alocasia Amazonica"
                  value={newPlant.name}
                  onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: 0 }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Tên Khoa Học (Scientific Name)</label>
                <input
                  type="text"
                  placeholder="e.g. Alocasia × amazonica"
                  value={newPlant.scientificName}
                  onChange={(e) => setNewPlant({ ...newPlant, scientificName: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: 0 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Hệ Sinh Thái (Biome)</label>
                  <select
                    value={newPlant.biome}
                    onChange={(e) => setNewPlant({ ...newPlant, biome: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: 0 }}
                  >
                    <option value="tropical">Tropical</option>
                    <option value="subtropical">Subtropical</option>
                    <option value="arid">Arid & Desert</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>Nhu Cầu Tưới (Water)</label>
                  <input
                    type="text"
                    value={newPlant.water}
                    onChange={(e) => setNewPlant({ ...newPlant, water: e.target.value })}
                    style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: 0 }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: '#cbd5e1', marginBottom: '6px' }}>URL Hình Ảnh (Unsplash / Online Image)</label>
                <input
                  type="url"
                  value={newPlant.image}
                  onChange={(e) => setNewPlant({ ...newPlant, image: e.target.value })}
                  style={{ width: '100%', background: '#07100b', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', padding: '10px 14px', borderRadius: 0 }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddPlantOpen(false)}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#cbd5e1', padding: '10px 20px', borderRadius: 0, cursor: 'pointer' }}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  style={{ background: 'var(--emerald-accent)', border: 'none', color: '#07100b', fontWeight: 700, padding: '10px 24px', borderRadius: 0, cursor: 'pointer' }}
                >
                  Lưu Cây Mới
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Floating Status Toast (Square box) */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          background: 'rgba(14, 30, 22, 0.98)',
          border: '1px solid var(--emerald-accent)',
          color: '#86efac',
          padding: '14px 22px',
          borderRadius: 0,
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
