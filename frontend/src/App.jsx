import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
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
import Profile from './pages/Profile';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import UserRoute from './components/UserRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/specimen" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/user" 
            element={
              <UserRoute>
                <User />
              </UserRoute>
            } 
          />
          <Route 
            path="/garden" 
            element={
              <UserRoute>
                <Garden />
              </UserRoute>
            } 
          />
          <Route 
            path="/personal-gallery" 
            element={
              <UserRoute>
                <PersonalGallery />
              </UserRoute>
            } 
          />
          <Route path="/plant-macro" element={<PlantMacro />} />
          <Route path="/specimen-detail" element={<SpecimenDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
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
