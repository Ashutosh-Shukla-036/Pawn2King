import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userAtom } from "../atoms/userAtom";
import LogoChess from "../assets/LogoChess.png";
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const user = useRecoilValue(userAtom);
  const setUser = useSetRecoilState(userAtom);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
  };

  return (
    <nav className="bg-gradient-to-br from-teal-900 to-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and Main Links */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img className="h-14 w-auto" src={LogoChess} alt="Pawn2King" />
              <span className="ml-2 text-white text-xl font-bold tracking-wide">
                Pawn2King
              </span>
            </Link>
            <div className="hidden md:flex space-x-6 ml-10">
              <Link
                to="/dashboard"
                className="text-white text-sm font-medium hover:text-gray-300 transition duration-300"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-white text-sm font-medium hover:text-gray-300 transition duration-300"
              >
                Profile
              </Link>
              <Link
                to="/play"
                className="text-white text-sm font-medium hover:text-gray-300 transition duration-300"
              >
                Play Game
              </Link>
              <Link
                to="/import"
                className="text-white text-sm font-medium hover:text-gray-300 transition duration-300"
              >
                Import Game
              </Link>
              <Link
                to="/review"
                className="text-white text-sm font-medium hover:text-gray-300 transition duration-300"
              >
                Review Games
              </Link>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative flex items-center space-x-4">
                <FaUserCircle className="text-white text-2xl" />
                <span className="text-white text-sm font-medium">{user.username}</span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 text-sm font-medium rounded-md text-gray-800 bg-white hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-gradient-to-br from-teal-900 to-gray-900 px-4 py-2">
        <div className="flex flex-wrap space-x-4 justify-around">
          <Link to="/dashboard" className="text-white text-sm font-medium hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/profile" className="text-white text-sm font-medium hover:text-gray-300">
            Profile
          </Link>
          <Link to="/play" className="text-white text-sm font-medium hover:text-gray-300">
            Play Game
          </Link>
          <Link to="/import" className="text-white text-sm font-medium hover:text-gray-300">
            Import Game
          </Link>
          <Link to="/review" className="text-white text-sm font-medium hover:text-gray-300">
            Review Games
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
