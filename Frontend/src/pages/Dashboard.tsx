import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="bg-gray-800 min-h-screen">
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        {/* Welcome Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white">
            Welcome Back, <span className="text-indigo-700">Player</span>!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Here's what's happening in the world of chess today.
          </p>
        </header>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Active Games */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Active Games</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Game vs. Magnus</span>
                <span className="px-3 py-1 text-sm text-green-700 bg-green-100 rounded-full">
                  In Progress
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Game vs. AI</span>
                <span className="px-3 py-1 text-sm text-yellow-700 bg-yellow-100 rounded-full">
                  Your Move
                </span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Game vs. Friend</span>
                <span className="px-3 py-1 text-sm text-red-700 bg-red-100 rounded-full">
                  Checkmate
                </span>
              </li>
            </ul>
          </motion.div>

          {/* User Stats */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Your Stats</h2>
            <ul className="space-y-4">
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Games Played</span>
                <span className="font-bold text-gray-800">42</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Wins</span>
                <span className="font-bold text-gray-800">24</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="font-medium text-gray-700">Losses</span>
                <span className="font-bold text-gray-800">18</span>
              </li>
            </ul>
          </motion.div>

          {/* Recent Reviews */}
          <motion.div
            className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Reviews</h2>
            <ul className="space-y-4">
              <li className="border-b pb-3 text-gray-700">
                "Great match! Learned a lot!" -{" "}
                <span className="text-indigo-600 font-medium">User123</span>
              </li>
              <li className="border-b pb-3 text-gray-700">
                "What a game! Incredible strategy." -{" "}
                <span className="text-indigo-600 font-medium">ChessFan88</span>
              </li>
              <li className="text-gray-700">
                "AI opponents are tough but fair." -{" "}
                <span className="text-indigo-600 font-medium">ProGamer</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
