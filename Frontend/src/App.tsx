import { Route, Routes, Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userAtom } from './atoms/userAtom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// ProtectedRoute Component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userAtom);
  return user ? children : <Navigate to="/login" replace />;
};

// PublicRoute Component
const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = useRecoilValue(userAtom);
  return user ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Catch-All */}
          <Route
            path="*"
            element={
              <Navigate to={user ? "/dashboard" : "/"} replace />
            }
          />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
