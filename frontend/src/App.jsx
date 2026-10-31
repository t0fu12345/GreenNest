import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Plants from './pages/Plants';
import Gallery from './pages/Gallery';
import About from './pages/About';
import User from './pages/User';
import Garden from './pages/AtlasGarden';
import PersonalGallery from './pages/PersonalGallery';
import Collections from './pages/AtlasCollections';
import PlantMacro from './pages/AtlasPlantDetail';
import SpecimenDetail from './pages/AtlasPlantDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import ProtectedRoute from './components/ProtectedRoute';
import ChatbotWidget from './components/chatbot/ChatbotWidget';
import PublicRouteMotion from './components/PublicRouteMotion';

function App() {
  return (
    <AuthProvider>
      <Router>
        <PublicRouteMotion>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/user" element={<User />} />
          <Route 
            path="/garden" 
            element={
              <ProtectedRoute>
                <Garden />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/personal-gallery" 
            element={
              <ProtectedRoute>
                <PersonalGallery />
              </ProtectedRoute>
            } 
          />
          <Route path="/plant-macro" element={<PlantMacro />} />
          <Route path="/specimen-detail" element={<SpecimenDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/admin" 
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } 
          />
        </Routes>
        </PublicRouteMotion>
        <ChatbotWidget />
      </Router>
    </AuthProvider>
  );
}

export default App;
