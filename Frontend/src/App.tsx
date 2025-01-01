import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import { useRecoilValue } from 'recoil';
import { userAtom } from './atoms/userAtom';
import Login from './pages/Login';
import Register from './pages/Register';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Profile = lazy(() => import('./pages/Profile'));

function App() {
  const user = useRecoilValue(userAtom);

  return (
    <div className="min-h-screen bg-gray-100">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }
      >
        {user ? (
          <>
            <Navbar />
            <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                {/* Add more authenticated routes here */}
              </Routes>
            </div>
          </>
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        )}
      </Suspense>
      <Footer />
    </div>
  );
}

export default App;
