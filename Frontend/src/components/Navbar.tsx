import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import LogoChess from "../assets/LogoChess.png";
import { FaUserCircle } from "react-icons/fa";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isMobileMenuOpen]);

  return (
    <nav className="bg-gradient-to-r from-teal-600 to-gray-900 shadow-lg z-50 fixed w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img className="h-12" src={LogoChess} alt="Pawn2King" />
            <span className="text-white text-2xl font-semibold tracking-wide">
              Pawn2King
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 items-center">
            {user ? (
              <>
                <Link to="/dashboard" className="text-white hover:text-teal-300 transition duration-300">
                  Dashboard
                </Link>
                <Link to="/profile" className="text-white hover:text-teal-300 transition duration-300">
                  Profile
                </Link>
                <Link to="/play" className="text-white hover:text-teal-300 transition duration-300">
                  Play Game
                </Link>
                <Link to="/import" className="text-white hover:text-teal-300 transition duration-300">
                  Import Game
                </Link>
                <Link to="/review" className="text-white hover:text-teal-300 transition duration-300">
                  Review Games
                </Link>
              </>
            ) : null}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                <FaUserCircle className="text-white text-2xl" />
                <span className="text-white text-sm">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-300"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Hamburger Icon (Mobile) */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white text-2xl"
            >
              {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-In */}
      <div
        className={`${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } fixed top-0 right-0 bg-gradient-to-r from-teal-600 to-gray-900 w-64 h-full z-50 transform transition-all duration-300 ease-in-out`}
        ref={menuRef}
      >
        <div className="flex flex-col items-center py-6 space-y-8">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <Link
                to="/profile"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <Link
                to="/play"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Play Game
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <Link
                to="/import"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Import Game
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <Link
                to="/review"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Review Games
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-md transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
              <hr className="w-3/4 border-t border-gray-500" />
              <Link
                to="/register"
                className="text-white text-lg font-medium hover:text-teal-300 transition duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
