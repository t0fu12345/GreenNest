import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Plants from './pages/Plants';
import Gallery from './pages/Gallery';
import About from './pages/About';
import User from './pages/User';
import Garden from './pages/Garden';
import PersonalGallery from './pages/PersonalGallery';
import Collections from './pages/Collections';
import PlantMacro from './pages/PlantMacro';
import SpecimenDetail from './pages/SpecimenDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plants" element={<Plants />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/user" element={<User />} />
          <Route path="/garden" element={<Garden />} />
          <Route path="/personal-gallery" element={<Collections />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
