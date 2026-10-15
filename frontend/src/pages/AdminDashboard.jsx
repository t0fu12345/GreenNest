import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BOTANICAL_SPECIMENS } from '../data/botanicalSpecimens';
import { decodeJwt } from '../utils/jwt';

// Initial plants matching stitch/admindashboard.html exactly
const INITIAL_STITCH_PLANTS = [
  {
    id: 'plant-monstera',
    name: 'Monstera Deliciosa',
    scientificName: 'Swiss Cheese Plant (Ráy xẻ lá)',
    category: 'Trong nhà / Bóng râm',
    light: '⛅ Ánh sáng gián tiếp',
    water: '💧 Tưới 2 lần/tuần',
    toxicity: '⚠️ Độc với thú cưng',
    toxicityType: 'warning',
    status: 'Đã đăng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTy8_ilbXtrPhZFt5WXybhhb2WyrJQdVAPoBIIItoPLEQDhwn5P1DRofcMrhQ6fwCMLvP7wlMtI-1ezfIdizNtl2dSrN0tetoDsp7HAIxkl6NXYxNDSRddUNFCPIRZSuevAELrDizAQyRf6Jv6BibzklOPGcUo4EvOEetrUjyVRMr_i_GuJ1PHm2QyHmkn-pLFjgTMc_mPdhauEcN9mBmA0LGRdgsUDSvxwB527WhOInrHa6LkdQ',
    fallbackImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'plant-succulent',
    name: 'Sen Đá Ngọc Bích',
    scientificName: 'Crassula Ovata',
    category: 'Để bàn / Nắng',
    light: '☀️ Nắng trực tiếp',
    water: '💧 Tưới 1 lần/tuần',
    toxicity: '✅ An toàn cho thú cưng',
    toxicityType: 'safe',
    status: 'Đã đăng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD180QHjXDvB2AJEONxKNOQA7th_OMZ0yJQI6XMwNMte58PZcQ11PyMTZIB3dRseXFNDiiYhcKkdHXLmZ0eFKuWqNvB0xA9Gd1GuRU4VpN4dz7JpUInTQDAUCoWUC3--rX4YUl29OVSHfBjHVGProse3CEHz4AO8DubQBzE1W7IrwmgWKq6OG_1uQ-3lHh_05rH3BpQym4oRKz8nQ33aLckYIPhM8akPJlFo9jrZnxfT9HHjzjvBQ',
    fallbackImage: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'plant-bonsai',
    name: 'Bonsai Cần Thăng',
    scientificName: 'Feoniella Lucida',
    category: 'Ngoài trời',
    light: '⛅ Nắng bán phần',
    water: '💧 Tưới hàng ngày',
    toxicity: '⚠️ Cần lưu ý khi có trẻ nhỏ',
    toxicityType: 'warning',
    status: 'Bản nháp',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKIR7GwJPJHcRC6Kn3349iTkfXV8K8ukpAvDAMcfNKJwEMq8jaT3pgRKeihpw0a8IFUNzoBwnr6trAStA-XTX49ZaVaKQ-FkBvFRDmsCJfGaB-V4InLEQStV-i9KkuYY_YmvbmV9YN4ulF_YeVn5njU1hVsWgKONPuWvb4E_s-WGx7a4H0jeRiGlb-JkKiSt4SWsZi2CAlR_bTutxww41F9_h7dsiEdALRPJykWcEnOcko31xrYg',
    fallbackImage: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'plant-snake',
    name: 'Cây Lưỡi Hổ',
    scientificName: 'Sansevieria Trifasciata',
    category: 'Lọc không khí',
    light: '🌙 Ánh sáng thấp',
    water: '🏜️ Chịu hạn tốt',
    toxicity: '⚠️ Độc nhẹ nếu nuốt',
    toxicityType: 'warning',
    status: 'Đã đăng',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO8fHP9Px7Hh69_WqNiOwqCciNzeWnRFW6sIfHsCRZ2AXu6z1RjGsn5TCmnuQh1HU0dcayP0ynBLez3iQUPbbzQi9anH3QzWEGqJxrwJ4gIuhkzQMzGDlMEnBvZL4i9MfDr1cuaneX8WGfP2IwJWTKtYyoILrooD4GiaUD7X_vTlXc9GHlDaltgXouC_Ct2iaS-NjfpTbYWyNkDY2Oqne5ioXU9UyyYjy15pHwM9XQ9clzNjejUA',
    fallbackImage: 'https://images.unsplash.com/photo-1593482892290-f54927ae1bf6?auto=format&fit=crop&w=400&q=80'
  }
];

const INITIAL_CONTACTS = [
  {
    id: 'cnt-1',
    name: 'Nguyễn Văn A',
    email: 'a@gmail.com',
    initial: 'A',
    color: 'bg-emerald-100 text-emerald-800',
    message: 'Tư vấn giúp mình cách chăm sóc cây Monstera bị vàng lá',
    time: '20 phút trước',
    status: 'Chờ xử lý'
  },
  {
    id: 'cnt-2',
    name: 'Trần Thị B',
    email: 'b@gmail.com',
    initial: 'B',
    color: 'bg-purple-100 text-purple-800',
    message: 'Cho mình hỏi chi phí giao hàng cây cảnh khu vực nội thành',
    time: '2 giờ trước',
    status: 'Đã xử lý'
  },
  {
    id: 'cnt-3',
    name: 'Lê Hoàng Nam',
    email: 'nam.le@flora.vn',
    initial: 'N',
    color: 'bg-sky-100 text-sky-800',
    message: 'Cần hỗ trợ đặt hàng sỉ 50 chậu Sen đá mini cho sự kiện công ty',
    time: '5 giờ trước',
    status: 'Chờ xử lý'
  }
];

const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    icon: '🌱',
    iconBg: 'bg-emerald-50 border-emerald-200',
    content: (
      <>
        <span className="font-semibold text-slate-950">Tài khoản Admin</span> vừa thêm cây mới{' '}
        <span className="font-semibold text-brand-700">Sen Đá Ngọc Bích</span>.
      </>
    ),
    time: '10 phút trước • Thao tác: Create'
  },
  {
    id: 'act-2',
    icon: '👨‍🌾',
    iconBg: 'bg-amber-50 border-amber-200',
    content: (
      <>
        Đã cập nhật thông tin Chuyên gia{' '}
        <span className="font-semibold text-slate-900">Nguyễn Văn C</span>.
      </>
    ),
    time: '45 phút trước • Thao tác: Update'
  },
  {
    id: 'act-3',
    icon: '🌻',
    iconBg: 'bg-yellow-50 border-yellow-200',
    content: (
      <>
        Xuất bản thành công bộ sưu tập{' '}
        <span className="font-semibold text-slate-900">"Cây cảnh lọc không khí mùa hè"</span> ra trang bán hàng.
      </>
    ),
    time: '3 giờ trước • Trạng thái: Live'
  },
  {
    id: 'act-4',
    icon: '🧟',
    iconBg: 'bg-rose-100 border-rose-300 text-sm',
    boxClass: 'bg-rose-50/60 border border-rose-100',
    content: (
      <>
        <span className="font-bold text-rose-900">Cảnh báo tường lửa:</span> Đã chặn 1 lượt truy cập trái phép từ IP Zombie khả nghi.
      </>
    ),
    time: 'Hôm qua 23:42 • Tường lửa Vườn Vững Chắc',
    timeClass: 'text-rose-500 font-semibold'
  }
];

const AdminDashboard = () => {
  const { user, token, logout, getAllUsers, updateUserRole, deleteUser } = useAuth();
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  // Active view tab: 'overview' | 'plants' | 'gardeners' | 'collections' | 'contacts' | 'users'
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [userList, setUserList] = useState([]);
  const [plants, setPlants] = useState([]);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  
  // UI filter & search states
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Tất cả danh mục');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Popovers & Dialogs
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [storeSelectorOpen, setStoreSelectorOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState('GreenNest Central');
  const [toastMessage, setToastMessage] = useState('');

  // Add / Edit Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlantId, setEditingPlantId] = useState(null);
  const [plantForm, setPlantForm] = useState({
    name: '',
    scientificName: '',
    category: 'Trong nhà / Bóng râm',
    light: '⛅ Ánh sáng gián tiếp',
    water: '💧 Tưới 2 lần/tuần',
    toxicity: '✅ An toàn cho thú cưng',
    toxicityType: 'safe',
    status: 'Đã đăng',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'
  });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // Keyboard shortcut ⌘K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Set document title
  useEffect(() => {
    document.title = 'GreenNest Admin - Hệ thống Quản trị Vườn Cây';
  }, []);

  // Load registered users and plants
  useEffect(() => {
    setUserList(getAllUsers());

    try {
      const saved = localStorage.getItem('greenNest_admin_plants_v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPlants(parsed);
          return;
        }
      }
    } catch {
      // fallback
    }
    setPlants(INITIAL_STITCH_PLANTS);
  }, [getAllUsers]);

  const savePlants = (newPlantList) => {
    setPlants(newPlantList);
    try {
      localStorage.setItem('greenNest_admin_plants_v2', JSON.stringify(newPlantList));
    } catch (e) {
      console.error(e);
    }
  };

  // Filter plants based on search and category
  const filteredPlants = plants.filter(plant => {
    const matchesSearch = 
      plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.scientificName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plant.category?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      categoryFilter === 'Tất cả danh mục' || plant.category.includes(categoryFilter.split(' / ')[0]);

    return matchesSearch && matchesCategory;
  });

  // Pagination slice
  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage) || 1;
  const currentPlants = filteredPlants.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Metrics counts
  const publishedCount = plants.filter(p => p.status === 'Đã đăng').length;
  const draftCount = plants.filter(p => p.status === 'Bản nháp').length;
  const adminCount = userList.filter(u => u.role === 'admin').length;
  const unreadContactsCount = contacts.filter(c => c.status === 'Chờ xử lý').length;

  // Handle open Add Modal
  const openAddPlantModal = () => {
    setEditingPlantId(null);
    setPlantForm({
      name: '',
      scientificName: '',
      category: 'Trong nhà / Bóng râm',
      light: '⛅ Ánh sáng gián tiếp',
      water: '💧 Tưới 2 lần/tuần',
      toxicity: '✅ An toàn cho thú cưng',
      toxicityType: 'safe',
      status: 'Đã đăng',
      image: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=400&q=80'
    });
    setIsModalOpen(true);
  };

  // Handle open Edit Modal
  const openEditPlantModal = (plant) => {
    setEditingPlantId(plant.id);
    setPlantForm({
      name: plant.name,
      scientificName: plant.scientificName || '',
      category: plant.category || 'Trong nhà / Bóng râm',
      light: plant.light || '⛅ Ánh sáng gián tiếp',
      water: plant.water || '💧 Tưới 2 lần/tuần',
      toxicity: plant.toxicity || '✅ An toàn cho thú cưng',
      toxicityType: plant.toxicityType || 'safe',
      status: plant.status || 'Đã đăng',
      image: plant.image || plant.fallbackImage || ''
    });
    setIsModalOpen(true);
  };

  // Handle Save Plant (Create or Update)
  const handleSavePlant = (e) => {
    e.preventDefault();
    if (!plantForm.name.trim()) return;

    if (editingPlantId) {
      // Update existing
      const updatedList = plants.map(p => {
        if (p.id === editingPlantId) {
          return {
            ...p,
            ...plantForm,
            toxicityType: plantForm.toxicity.includes('⚠️') ? 'warning' : 'safe'
          };
        }
        return p;
      });
      savePlants(updatedList);
      showToast(`Đã cập nhật thông tin cây: ${plantForm.name}`);

      // Add to activity log
      setActivities(prev => [
        {
          id: `act-${Date.now()}`,
          icon: '✏️',
          iconBg: 'bg-emerald-50 border-emerald-200',
          content: (
            <>
              <span className="font-semibold text-slate-950">Admin</span> vừa cập nhật cây trồng{' '}
              <span className="font-semibold text-brand-700">{plantForm.name}</span>.
            </>
          ),
          time: 'Vừa xong • Thao tác: Update'
        },
        ...prev
      ]);
    } else {
      // Create new
      const newPlantItem = {
        id: `plant-${Date.now()}`,
        ...plantForm,
        toxicityType: plantForm.toxicity.includes('⚠️') ? 'warning' : 'safe',
        fallbackImage: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80'
      };
      const updatedList = [newPlantItem, ...plants];
      savePlants(updatedList);
      showToast(`Đã thêm cây trồng mới: ${plantForm.name}`);

      // Add to activity log
      setActivities(prev => [
        {
          id: `act-${Date.now()}`,
          icon: '🌱',
          iconBg: 'bg-emerald-50 border-emerald-200',
          content: (
            <>
              <span className="font-semibold text-slate-950">Tài khoản Admin</span> vừa thêm cây mới{' '}
              <span className="font-semibold text-brand-700">{plantForm.name}</span>.
            </>
          ),
          time: 'Vừa xong • Thao tác: Create'
        },
        ...prev
      ]);
    }

    setIsModalOpen(false);
  };

  // Handle Delete Plant
  const handleDeletePlant = (plantId, plantName) => {
    if (window.confirm(`Xác nhận xóa cây trồng "${plantName}" khỏi hệ thống?`)) {
      const updatedList = plants.filter(p => p.id !== plantId);
      savePlants(updatedList);
      showToast(`Đã xóa cây trồng "${plantName}"`);

      // Add to activity log
      setActivities(prev => [
        {
          id: `act-${Date.now()}`,
          icon: '🗑️',
          iconBg: 'bg-rose-50 border-rose-200',
          content: (
            <>
              <span className="font-semibold text-slate-950">Admin</span> đã xóa cây trồng{' '}
              <span className="font-semibold text-rose-700">{plantName}</span>.
            </>
          ),
          time: 'Vừa xong • Thao tác: Delete'
        },
        ...prev
      ]);
    }
  };

  // Toggle Contact status
  const handleToggleContactStatus = (contactId) => {
    setContacts(prev => prev.map(c => {
      if (c.id === contactId) {
        const nextStatus = c.status === 'Chờ xử lý' ? 'Đã xử lý' : 'Chờ xử lý';
        showToast(`Tin nhắn của ${c.name} chuyển thành "${nextStatus}"`);
        return { ...c, status: nextStatus };
      }
      return c;
    }));
  };

  // Handle Role Toggle (Admin/User)
  const handleToggleRole = (userId, currentRole) => {
    const nextRole = currentRole === 'admin' ? 'user' : 'admin';
    const res = updateUserRole(userId, nextRole);
    if (res.success) {
      setUserList(res.users);
      showToast(`Đã cập nhật vai trò người dùng thành: ${nextRole.toUpperCase()}`);
      setActivities(prev => [
        {
          id: `act-${Date.now()}`,
          icon: '👥',
          iconBg: 'bg-teal-50 border-teal-200',
          content: (
            <>
              <span className="font-semibold text-slate-950">Phân quyền:</span> Cập nhật vai trò tài khoản thành {nextRole}.
            </>
          ),
          time: 'Vừa xong • Thao tác: Auth'
        },
        ...prev
      ]);
    } else {
      showToast(res.message);
    }
  };

  // Handle Delete User
  const handleDeleteUserAccount = (userId, email) => {
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

  // Handle Export Report
  const handleExportReport = () => {
    const reportData = {
      system: 'GreenNest Botanical CMS',
      exportDate: new Date().toISOString(),
      admin: user?.name,
      stats: {
        totalPlants: plants.length,
        published: publishedCount,
        draft: draftCount,
        users: userList.length,
        contactsPending: unreadContactsCount
      },
      plants: plants
    };
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `GreenNest-BaoCao-Admin-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã xuất báo cáo hệ thống thành công (JSON)!');
  };

  return (
    <div className="h-screen w-screen text-slate-800 antialiased flex flex-col md:flex-row overflow-hidden bg-[#f4f7f4] font-sans fixed inset-0 z-50">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-xl border border-emerald-500/40 animate-bounce">
          <span className="text-emerald-400 text-sm">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* =========================================================================
          BEGIN: LeftSidebar (Exact match with stitch/admindashboard.html)
          ========================================================================= */}
      <aside 
        className="w-full md:w-64 lg:w-72 bg-[#c9eed5]/90 border-r border-[#a8dfba] flex flex-col justify-between shrink-0 h-auto md:h-screen select-none z-20"
        data-purpose="sidebar-navigation"
      >
        <div className="flex flex-col h-full">
          {/* Brand Logo Header */}
          <div className="h-20 flex items-center gap-3 px-6 border-b border-[#a9deb8]">
            <Link 
              to="/" 
              title="Về Trang Chủ"
              className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-brand-600/20 transform hover:rotate-6 transition-transform"
            >
              {/* PvZ Sprout Leaf Icon */}
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C7.58 2 4 5.58 4 10c0 2.03.76 3.87 2 5.28V21c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-4h4v4c0 .55.45 1 1 1h2c.55 0 1-.45 1-1v-5.72c1.24-1.41 2-3.25 2-5.28 0-4.42-3.58-8-8-8zm-1 12H9v-2h2v2zm4 0h-2v-2h2v2zm-2-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
              </svg>
            </Link>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg text-emerald-950 tracking-tight">GreenNest</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-emerald-700 text-white">Admin</span>
              </div>
              <p className="text-xs text-emerald-800 font-medium flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Garden Manager v2.4
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav aria-label="Main Navigation" className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
            {/* Overview Link */}
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                activeTab === 'overview'
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-700/20'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`p-1 rounded-lg ${activeTab === 'overview' ? 'bg-white/20' : 'bg-emerald-600/10 text-emerald-800'}`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <rect height="9" rx="1" width="7" x="3" y="3"></rect>
                    <rect height="5" rx="1" width="7" x="14" y="3"></rect>
                    <rect height="9" rx="1" width="7" x="14" y="12"></rect>
                    <rect height="5" rx="1" width="7" x="3" y="16"></rect>
                  </svg>
                </span>
                <span>Tổng quan (Dashboard)</span>
              </div>
              {activeTab === 'overview' && <span className="w-2 h-2 rounded-full bg-yellow-300"></span>}
            </button>

            {/* Plants Navigation */}
            <button
              type="button"
              onClick={() => setActiveTab('plants')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'plants'
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">🪴</span>
                <span>Quản lý Cây trồng</span>
              </div>
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                activeTab === 'plants' ? 'bg-white text-emerald-800' : 'bg-emerald-100 text-emerald-800'
              }`}>
                {plants.length}
              </span>
            </button>

            {/* Gardeners Navigation */}
            <button
              type="button"
              onClick={() => setActiveTab('gardeners')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'gardeners'
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">👨‍🌾</span>
                <span>Quản lý Chuyên gia</span>
              </div>
              <span className="text-xs bg-emerald-100/70 text-emerald-800 font-bold px-2 py-0.5 rounded-full">15</span>
            </button>

            {/* Collections Navigation */}
            <button
              type="button"
              onClick={() => setActiveTab('collections')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'collections'
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">📚</span>
                <span>Quản lý Bộ sưu tập</span>
              </div>
              <span className="text-xs bg-emerald-100/70 text-emerald-800 font-bold px-2 py-0.5 rounded-full">8</span>
            </button>

            {/* Contacts Navigation with badge */}
            <button
              type="button"
              onClick={() => setActiveTab('contacts')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'contacts'
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">✉️</span>
                <span>Tin nhắn Liên hệ (Contacts)</span>
              </div>
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-sm">
                {unreadContactsCount} Chưa đọc
              </span>
            </button>

            {/* Users Navigation */}
            <button
              type="button"
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                activeTab === 'users'
                  ? 'bg-brand-600 text-white font-semibold shadow-sm'
                  : 'text-emerald-950 hover:bg-white/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-emerald-700 text-base">👤</span>
                <span>Quản lý Tài khoản (Users)</span>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                {userList.length}
              </span>
            </button>

            <div className="pt-4 border-t border-[#a9deb8]/60 my-2 space-y-1">
              {/* Back to Client Store */}
              <Link
                to="/"
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-900 hover:bg-white/70 transition-colors"
              >
                <span>🌿</span>
                <span>Về Website Khách Hàng</span>
              </Link>

              {/* Logout */}
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 transition-colors"
              >
                <span>🚪</span>
                <span>Đăng xuất Quản trị</span>
              </button>
            </div>
          </nav>

          {/* Sidebar Footer Card: Crazy Dave's Tip (PvZ Theme Easter Egg) */}
          <div className="p-4 m-3 rounded-2xl bg-gradient-to-br from-[#def3e5] to-[#c7eace] border border-emerald-300/80 shadow-sm">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center text-sm shadow-sm shrink-0">
                🌻
              </div>
              <div className="text-xs">
                <div className="font-bold text-emerald-950 flex items-center gap-1">
                  Mẹo chăm sóc cây GreenNest
                </div>
                <p className="text-emerald-800 mt-1 leading-relaxed">
                  Đảm bảo kiểm tra độ ẩm đất và ánh sáng trước khi tưới cây!
                </p>
              </div>
            </div>
          </div>
        </div>
      </aside>
      {/* END: LeftSidebar */}

      {/* =========================================================================
          BEGIN: MainContentArea
          ========================================================================= */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Header Navigation */}
        <header 
          className="h-20 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-6 flex items-center justify-between shrink-0 z-10"
          data-purpose="top-header"
        >
          {/* Search Input Container */}
          <div className="flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                </svg>
              </div>
              <input
                ref={searchInputRef}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-2 bg-slate-100/80 hover:bg-slate-100 focus:bg-white text-xs md:text-sm text-slate-800 placeholder-slate-400 rounded-xl border border-transparent focus:border-brand-500 focus:ring-2 focus:ring-brand-200 transition-all outline-none"
                placeholder="Tìm kiếm cây trồng, chuyên gia, bộ sưu tập, tin nhắn..."
                type="search"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-400 bg-white border border-slate-200 rounded-md shadow-xs">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Store Selector Dropdown Button */}
            <div className="hidden lg:flex items-center relative">
              <button
                type="button"
                onClick={() => setStoreSelectorOpen(!storeSelectorOpen)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-700 transition-colors"
              >
                <span>🏪 Store: {selectedStore}</span>
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>

              {storeSelectorOpen && (
                <div className="absolute left-0 top-11 mt-1 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-1.5 z-30">
                  {['GreenNest Central', 'GreenNest Sky Garden', 'GreenNest Eco Hub'].map((store) => (
                    <button
                      key={store}
                      type="button"
                      onClick={() => {
                        setSelectedStore(store);
                        setStoreSelectorOpen(false);
                        showToast(`Đã chuyển kho sang: ${store}`);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium hover:bg-emerald-50 ${
                        selectedStore === store ? 'text-brand-700 font-bold' : 'text-slate-700'
                      }`}
                    >
                      🏪 {store}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Header Actions & Crazy Dave Admin Profile */}
          <div className="flex items-center gap-3">
            {/* Primary Action Button */}
            <button
              type="button"
              onClick={openAddPlantModal}
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 active:scale-95 text-white font-semibold text-xs transition shadow-sm shadow-brand-700/20"
            >
              <span>🌱</span>
              <span>+ Thêm Cây Mới</span>
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button
                type="button"
                aria-label="Notifications"
                onClick={() => setNotificationOpen(!notificationOpen)}
                className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </button>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                3
              </span>

              {notificationOpen && (
                <div className="absolute right-0 top-12 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-40 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                    <span className="font-bold text-slate-900">Thông báo mới</span>
                    <span className="text-[10px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded font-semibold">3 Chưa đọc</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-900">
                      <p className="font-semibold">🌿 Cần cập nhật lịch tưới</p>
                      <p className="text-[11px] text-emerald-700">Monstera Deliciosa cần kiểm tra độ ẩm đất hôm nay.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 text-amber-900">
                      <p className="font-semibold">✉️ 5 yêu cầu liên hệ mới</p>
                      <p className="text-[11px] text-amber-700">Khách hàng hỏi giá sỉ sen đá sự kiện.</p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 text-slate-700">
                      <p className="font-semibold">🛡️ JWT Token hợp lệ</p>
                      <p className="text-[11px] text-slate-500">HS256 Session token đang hoạt động.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-1 hidden sm:block"></div>

            {/* Crazy Dave Admin Profile Capsule */}
            <div className="relative">
              <div 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-3 pl-1 sm:pl-2 cursor-pointer group select-none"
              >
                <div className="relative">
                  {/* Saucer pan / Crazy Dave Avatar illustration badge */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-200 via-amber-100 to-emerald-200 border-2 border-brand-500 flex items-center justify-center text-lg shadow-sm">
                    🧔🏻🍳
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-brand-500 border-2 border-white rounded-full"></span>
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 group-hover:text-brand-700 transition">
                    {user?.name || 'Admin GreenNest'}
                  </div>
                  <div className="text-[11px] text-slate-500">Quản trị viên</div>
                </div>
                <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="m19.5 8.25-7.5 7.5-7.5-7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
              </div>

              {profileDropdownOpen && (
                <div className="absolute right-0 top-12 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-40 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-2">
                    <div className="font-bold text-slate-900">{user?.name}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{user?.email}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                      <span className="bg-brand-100 text-brand-800 px-1.5 py-0.5 rounded font-bold">ADMIN L4</span>
                      <span className="text-slate-400">HS256 Verified</span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(token || '');
                        showToast('Đã sao chép chuỗi mã JWT Token vào bộ nhớ tạm!');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <span>📋</span>
                      <span>Sao chép JWT Token</span>
                    </button>

                    <Link
                      to="/"
                      className="w-full text-left px-3 py-2 rounded-lg font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      <span>🌿</span>
                      <span>Về Website chính</span>
                    </Link>

                    <div className="h-px bg-slate-100 my-1"></div>

                    <button
                      type="button"
                      onClick={logout}
                      className="w-full text-left px-3 py-2 rounded-lg font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                    >
                      <span>🚪</span>
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </header>

        {/* =========================================================================
            Scrollable Main Work Area
            ========================================================================= */}
        <main className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          
          {/* BEGIN: PageTitleArea */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4" data-purpose="page-title-banner">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {activeTab === 'overview' && 'Tổng quan Quản trị'}
                  {activeTab === 'plants' && 'Quản lý Danh mục Cây trồng'}
                  {activeTab === 'gardeners' && 'Quản lý Đội ngũ Chuyên gia'}
                  {activeTab === 'collections' && 'Quản lý Bộ sưu tập Vườn cảnh'}
                  {activeTab === 'contacts' && 'Hòm thư Khách hàng (Contacts)'}
                  {activeTab === 'users' && 'Quản lý Tài khoản & Phân quyền'}
                </h1>
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-100 text-brand-800 border border-brand-200">
                  <span>🌻 Hệ thống vận hành tốt</span>
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Hôm nay, 24 Tháng 10, 2024 • Báo cáo dữ liệu thời gian thực từ chuỗi vườn GreenNest.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                type="button"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>7 ngày qua</span>
              </button>

              <button 
                type="button"
                onClick={handleExportReport}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-xs transition"
              >
                <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" strokeLinecap="round" strokeLinejoin="round"></path>
                </svg>
                <span>Xuất Báo Cáo</span>
              </button>
            </div>
          </section>
          {/* END: PageTitleArea */}

          {/* BEGIN: KPIStatsCardsGrid (6 Cards from stitch/admindashboard.html) */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4" data-purpose="kpi-metrics-grid">
            
            {/* Metric Card 1: Plants */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Cây trồng (plants)</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {plants.length} <span className="text-xs font-normal text-slate-500">Cây</span>
                  </div>
                </div>
                {/* Peashooter sprout themed badge */}
                <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-lg text-brand-600 group-hover:scale-110 transition-transform">
                  🌱
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-semibold">{publishedCount} đã đăng</span>
                <span className="text-slate-400">{draftCount} nháp</span>
              </div>
            </div>

            {/* Metric Card 2: Gardeners */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Chuyên gia (gardeners)</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    15 <span className="text-xs font-normal text-slate-500">Người</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-lg text-amber-600 group-hover:scale-110 transition-transform">
                  👨‍🌾
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-semibold">12 trực tuyến</span>
                <span className="text-slate-400">3 vắng mặt</span>
              </div>
            </div>

            {/* Metric Card 3: Collections */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Bộ sưu tập</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    8 <span className="text-xs font-normal text-slate-500">Bộ</span>
                  </div>
                </div>
                {/* Sunflower themed badge */}
                <div className="w-9 h-9 rounded-xl bg-yellow-50 border border-yellow-200 flex items-center justify-center text-lg text-yellow-600 group-hover:scale-110 transition-transform">
                  🌻
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-yellow-700 font-semibold">3 Bộ Nổi bật</span>
                <span className="text-slate-400">5 Tiêu chuẩn</span>
              </div>
            </div>

            {/* Metric Card 4: Galleries */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Ảnh Thư viện</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    342 <span className="text-xs font-normal text-slate-500">Ảnh</span>
                  </div>
                </div>
                {/* Wall-nut themed defense / safe storage badge */}
                <div className="w-9 h-9 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-lg text-orange-600 group-hover:scale-110 transition-transform">
                  🌰
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-600 font-semibold">Bộ nhớ: 1.2 GB</span>
                <span className="text-emerald-600 font-medium">+14 tuần này</span>
              </div>
            </div>

            {/* Metric Card 5: Contacts */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Tin nhắn liên hệ (`contacts`)</span>
                  <div className="text-2xl font-bold text-amber-600 mt-1">
                    {unreadContactsCount} <span className="text-xs font-normal text-slate-500">Chưa đọc</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center text-lg text-rose-600 group-hover:scale-110 transition-transform">
                  ✉️
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-amber-600 font-semibold">+2 hôm nay</span>
                <span className="text-slate-400">Phản hồi 98%</span>
              </div>
            </div>

            {/* Metric Card 6: Users */}
            <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-soft hover:shadow-card transition flex flex-col justify-between relative overflow-hidden group">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500">Tài khoản người dùng (`users`)</span>
                  <div className="text-2xl font-bold text-slate-900 mt-1">
                    {userList.length} <span className="text-xs font-normal text-slate-500">Tài khoản</span>
                  </div>
                </div>
                <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-lg text-teal-600 group-hover:scale-110 transition-transform">
                  👥
                </div>
              </div>
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-emerald-600 font-semibold">(Admin: {adminCount})</span>
                <span className="text-emerald-500 font-semibold">+18% m/m</span>
              </div>
            </div>

          </section>
          {/* END: KPIStatsCardsGrid */}

          {/* =========================================================================
              VIEW: USERS MANAGEMENT (When activeTab === 'users')
              ========================================================================= */}
          {activeTab === 'users' ? (
            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">Danh sách Tài khoản Người dùng (`users` Collection)</h2>
                    <span className="bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-teal-200/60">
                      {userList.length} Tài khoản
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quản lý phân quyền Quản trị viên (Admin) và quyền người dùng thường trong hệ sinh thái GreenNest
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                      <th className="py-3 px-4">Tài khoản & Email</th>
                      <th className="py-3 px-4">Nickname</th>
                      <th className="py-3 px-4">Vai trò (Role)</th>
                      <th className="py-3 px-4">Quyền hạn (Permissions)</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {userList.map((usr) => (
                      <tr key={usr.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              alt={usr.name}
                              src={usr.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                              className="w-9 h-9 rounded-xl object-cover border border-slate-200 shadow-xs"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{usr.name}</div>
                              <div className="text-[11px] text-slate-400 font-mono">{usr.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-medium text-slate-800">
                          @{usr.nickname || 'user'}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                            usr.role === 'admin'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border-slate-200'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${usr.role === 'admin' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                            {usr.role === 'admin' ? 'Quản trị viên (Admin)' : 'Thành viên (User)'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex flex-wrap gap-1">
                            {(usr.permissions || ['garden:access']).map((perm, idx) => (
                              <span key={idx} className="bg-slate-100 text-slate-600 text-[10px] px-2 py-0.5 rounded font-mono">
                                {perm}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => handleToggleRole(usr.id, usr.role)}
                              className="px-2.5 py-1 rounded-lg font-medium text-brand-700 hover:bg-brand-50 transition border border-transparent hover:border-brand-200"
                            >
                              {usr.role === 'admin' ? 'Hạ cấp User' : 'Nâng cấp Admin'}
                            </button>
                            {usr.email !== user?.email && (
                              <button
                                type="button"
                                onClick={() => handleDeleteUserAccount(usr.id, usr.email)}
                                className="px-2.5 py-1 rounded-lg font-medium text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                              >
                                Xóa
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : (

            /* =========================================================================
                BEGIN: PlantManagementDataTable (From stitch/admindashboard.html)
                ========================================================================= */
            <section className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden" data-purpose="plants-data-table-container">
              {/* Table Action Header */}
              <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-slate-900">Danh sách Cây trồng (`plants` Collection)</h2>
                    <span className="bg-emerald-50 text-emerald-700 text-xs px-2 py-0.5 rounded-md font-semibold border border-emerald-200/60">
                      {filteredPlants.length} Cây hiển thị
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Quản lý chi tiết phân loại sinh học, độ độc hại đối với thú cưng và tình trạng kho hàng
                  </p>
                </div>

                {/* Controls & Filters Toolbar */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {/* Category Filter Dropdown */}
                  <select 
                    value={categoryFilter}
                    onChange={(e) => {
                      setCategoryFilter(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="text-xs font-medium py-2 pl-3 pr-8 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none cursor-pointer"
                  >
                    <option value="Tất cả danh mục">Tất cả danh mục</option>
                    <option value="Trong nhà / Bóng râm">Trong nhà / Bóng râm</option>
                    <option value="Để bàn / Nắng">Để bàn / Nắng</option>
                    <option value="Ngoài trời">Ngoài trời</option>
                    <option value="Lọc không khí">Lọc không khí</option>
                  </select>

                  {/* Table Search Input */}
                  <div className="relative">
                    <input
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="text-xs py-2 pl-8 pr-3 w-40 sm:w-48 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-1 focus:ring-brand-500 focus:border-brand-500 outline-none placeholder-slate-400"
                      placeholder="Lọc tên cây..."
                      type="text"
                    />
                    <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                    </svg>
                  </div>

                  {/* Add Plant Action Button */}
                  <button
                    type="button"
                    onClick={openAddPlantModal}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold text-xs shadow-sm transition"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M12 4.5v15m7.5-7.5h-15" strokeLinecap="round" strokeLinejoin="round"></path>
                    </svg>
                    <span>Thêm Cây Mới</span>
                  </button>
                </div>
              </div>

              {/* Responsive HTML Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                      <th className="py-3 px-4">Tên Cây / Tên Khoa Học</th>
                      <th className="py-3 px-4">DANH MỤC</th>
                      <th className="py-3 px-4">Ánh Sáng & Nước</th>
                      <th className="py-3 px-4">Cảnh Báo Độc Tính</th>
                      <th className="py-3 px-4">Trạng Thái</th>
                      <th className="py-3 px-4 text-right">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {currentPlants.map((plant) => (
                      <tr key={plant.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            {/* Plant Photo Thumbnail */}
                            <img
                              alt={plant.name}
                              src={plant.image}
                              onError={(e) => {
                                e.currentTarget.src = plant.fallbackImage || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=400&q=80';
                              }}
                              className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-xs shrink-0"
                            />
                            <div>
                              <div className="font-bold text-slate-900 text-sm">{plant.name}</div>
                              <div className="text-[11px] text-slate-400 italic">{plant.scientificName}</div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-medium text-slate-800">
                          {plant.category}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex flex-col gap-0.5">
                            <span className="flex items-center gap-1 text-slate-700">
                              {plant.light}
                            </span>
                            <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                              {plant.water}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-4">
                          {plant.toxicityType === 'safe' || plant.toxicity.includes('✅') ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              {plant.toxicity}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                              {plant.toxicity}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {plant.status === 'Đã đăng' ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              Đã đăng
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-yellow-50 text-yellow-800 border border-yellow-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
                              Bản nháp
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              type="button"
                              onClick={() => openEditPlantModal(plant)}
                              className="px-2.5 py-1 rounded-lg font-medium text-brand-700 hover:bg-brand-50 transition border border-transparent hover:border-brand-200"
                            >
                              Sửa
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeletePlant(plant.id, plant.name)}
                              className="px-2.5 py-1 rounded-lg font-medium text-rose-600 hover:bg-rose-50 transition border border-transparent hover:border-rose-200"
                            >
                              Xóa
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {currentPlants.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-8 text-center text-slate-400">
                          Không tìm thấy cây trồng phù hợp với bộ lọc hiện tại.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination & Quick Footer */}
              <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <span>
                    Hiển thị {filteredPlants.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} - {Math.min(currentPage * itemsPerPage, filteredPlants.length)} của {filteredPlants.length} cây trồng
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Trước
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setCurrentPage(num)}
                      className={`px-3 py-1.5 rounded-lg border text-xs font-semibold ${
                        currentPage === num
                          ? 'border-brand-500 bg-brand-600 text-white'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Sau
                  </button>
                </div>
              </div>
            </section>
          )}

          {/* =========================================================================
              BEGIN: BottomDualColumnSection (Contacts & System Activity Log)
              ========================================================================= */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-4" data-purpose="bottom-auxiliary-grid">
            
            {/* Left Column: Customer Messages / Contacts */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-emerald-50 text-brand-600 text-base">💬</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Tin nhắn Liên hệ gần đây (`contacts`)</h3>
                      <p className="text-[11px] text-slate-500">Yêu cầu tư vấn và hỗ trợ mua cây cảnh</p>
                    </div>
                  </div>
                  <button 
                    type="button"
                    onClick={() => setActiveTab('contacts')}
                    className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                  >
                    Xem tất cả →
                  </button>
                </div>

                {/* Messages List */}
                <div className="divide-y divide-slate-100 mt-2">
                  {contacts.map((contact) => (
                    <div key={contact.id} className="py-3 flex items-start justify-between gap-3 group">
                      <div className="flex items-start gap-3">
                        <div className={`w-8 h-8 rounded-full ${contact.color} font-bold flex items-center justify-center text-xs shrink-0 mt-0.5`}>
                          {contact.initial}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-xs text-slate-900">{contact.name}</span>
                            <span className="text-[11px] text-slate-400 font-mono">({contact.email})</span>
                          </div>
                          <p className="text-xs text-slate-600 font-medium mt-0.5 line-clamp-1">
                            {contact.message}
                          </p>
                          <span className="text-[10px] text-slate-400">{contact.time}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleContactStatus(contact.id)}
                        className={`shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full border transition cursor-pointer ${
                          contact.status === 'Chờ xử lý'
                            ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                            : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                        }`}
                        title="Bấm để đổi trạng thái"
                      >
                        {contact.status}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 mt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{unreadContactsCount}/{contacts.length} yêu cầu chưa được phản hồi</span>
                <button 
                  type="button" 
                  onClick={() => showToast('Đang mở hộp thư hỗ trợ khách hàng...')}
                  className="text-brand-700 font-bold hover:underline"
                >
                  Mở hòm thư
                </button>
              </div>
            </div>

            {/* Right Column: System & Garden Activity Log */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-brand-50 text-brand-600 text-base">📜</span>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Nhật ký Hoạt động Hệ thống</h3>
                      <p className="text-[11px] text-slate-500">Giám sát các thao tác cơ sở dữ liệu và bảo mật</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Live feed
                  </span>
                </div>

                {/* Activity Items Timeline */}
                <div className="mt-3 space-y-3.5">
                  {activities.slice(0, 4).map((activity) => (
                    <div 
                      key={activity.id} 
                      className={`flex items-start gap-3 ${activity.boxClass ? `p-2 rounded-xl ${activity.boxClass}` : ''}`}
                    >
                      <div className={`w-7 h-7 rounded-lg border flex items-center justify-center text-sm shrink-0 ${activity.iconBg}`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-800 leading-snug">
                          {activity.content}
                        </p>
                        <span className={`text-[10px] ${activity.timeClass || 'text-slate-400'}`}>
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 text-right">
                <button 
                  type="button"
                  onClick={() => showToast('Đã tải thêm 10 bản ghi nhật ký kiểm toán gần nhất.')}
                  className="text-xs font-semibold text-brand-700 hover:text-brand-800"
                >
                  Tải thêm nhật ký kiểm toán →
                </button>
              </div>
            </div>

          </section>
          {/* END: BottomDualColumnSection */}

        </main>
      </div>

      {/* =========================================================================
          MODAL: THÊM / CHỈNH SỬA CÂY TRỒNG
          ========================================================================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 animate-scaleIn">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🌱</span>
                <h3 className="font-bold text-slate-900 text-base">
                  {editingPlantId ? 'Chỉnh sửa Cây Trồng' : 'Thêm Cây Trồng Mới'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 flex items-center justify-center font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePlant} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tên cây trồng *</label>
                <input
                  required
                  type="text"
                  value={plantForm.name}
                  onChange={(e) => setPlantForm({ ...plantForm, name: e.target.value })}
                  placeholder="Ví dụ: Monstera Deliciosa, Sen Đá..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Tên khoa học / Chi</label>
                <input
                  type="text"
                  value={plantForm.scientificName}
                  onChange={(e) => setPlantForm({ ...plantForm, scientificName: e.target.value })}
                  placeholder="Ví dụ: Swiss Cheese Plant, Crassula Ovata..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Danh mục</label>
                  <select
                    value={plantForm.category}
                    onChange={(e) => setPlantForm({ ...plantForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  >
                    <option value="Trong nhà / Bóng râm">Trong nhà / Bóng râm</option>
                    <option value="Để bàn / Nắng">Để bàn / Nắng</option>
                    <option value="Ngoài trời">Ngoài trời</option>
                    <option value="Lọc không khí">Lọc không khí</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Trạng thái</label>
                  <select
                    value={plantForm.status}
                    onChange={(e) => setPlantForm({ ...plantForm, status: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  >
                    <option value="Đã đăng">Đã đăng (Published)</option>
                    <option value="Bản nháp">Bản nháp (Draft)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Ánh sáng</label>
                  <input
                    type="text"
                    value={plantForm.light}
                    onChange={(e) => setPlantForm({ ...plantForm, light: e.target.value })}
                    placeholder="⛅ Ánh sáng gián tiếp..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lượng nước & tưới</label>
                  <input
                    type="text"
                    value={plantForm.water}
                    onChange={(e) => setPlantForm({ ...plantForm, water: e.target.value })}
                    placeholder="💧 Tưới 2 lần/tuần..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Cảnh báo độc tính</label>
                <select
                  value={plantForm.toxicity}
                  onChange={(e) => setPlantForm({ ...plantForm, toxicity: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                >
                  <option value="✅ An toàn cho thú cưng">✅ An toàn cho thú cưng</option>
                  <option value="⚠️ Độc với thú cưng">⚠️ Độc với thú cưng</option>
                  <option value="⚠️ Cần lưu ý khi có trẻ nhỏ">⚠️ Cần lưu ý khi có trẻ nhỏ</option>
                  <option value="⚠️ Độc nhẹ nếu nuốt">⚠️ Độc nhẹ nếu nuốt</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Link ảnh thumbnail</label>
                <input
                  type="url"
                  value={plantForm.image}
                  onChange={(e) => setPlantForm({ ...plantForm, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 transition"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-semibold shadow-sm transition"
                >
                  {editingPlantId ? 'Lưu Thay Đổi' : 'Tạo Cây Trồng'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
