import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userAtom } from "../atoms/userAtom";
import { playerStatsAtom } from "../atoms/playerStatsAtom";
import { GetPlayerStats } from "../api_calls/PlayerStatsAPI";

const Dashboard: React.FC = () => {
  const user = useRecoilValue(userAtom);
  const [playerStats, setPlayerStats] = useRecoilState(playerStatsAtom);

  // Placeholder data for Active Games and Stats
  const activeGames = [
    { opponent: "Magnus", status: "In Progress", statusColor: "green" },
    { opponent: "AI", status: "Your Move", statusColor: "yellow" },
    { opponent: "Friend", status: "Checkmate", statusColor: "red" },
  ];

  const reviews = [
    { review: "Great match! Learned a lot!", reviewer: "User123" },
    { review: "What a game! Incredible strategy.", reviewer: "ChessFan88" },
    { review: "AI opponents are tough but fair.", reviewer: "ProGamer" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      if (user) {
        try {
          const stats = await GetPlayerStats(user.id); // API call
          setPlayerStats(stats);
        } catch (error) {
          console.error("Error fetching player stats:", error);
        }
      }
    };

    fetchStats();
  }, [user, setPlayerStats]);

  return (
    <div className="bg-gray-800 min-h-screen">
      <main className="max-w-7xl mx-auto py-12 px-6 lg:px-8">
        {/* Welcome Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-extrabold text-white">
            Welcome Back, <span className="text-indigo-700">{user?.username || "Player"}</span>!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Here's what's happening in the world of chess today.
          </p>
        </header>

        {/* Dashboard Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Active Games */}
          <DashboardCard title="Active Games">
            <ul className="space-y-4">
              {activeGames.map((game, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center"
                >
                  <span className="font-medium text-gray-700">Game vs. {game.opponent}</span>
                  <span
                    className={`px-3 py-1 text-sm text-${game.statusColor}-700 bg-${game.statusColor}-100 rounded-full`}
                  >
                    {game.status}
                  </span>
                </li>
              ))}
            </ul>
          </DashboardCard>

          {/* User Stats */}
          <DashboardCard title="Your Stats">
            <ul className="space-y-4">
              <StatItem label="Games Played" value={playerStats?.gamesPlayed || 0} />
              <StatItem label="Wins" value={playerStats?.wins || 0} />
              <StatItem label="Losses" value={playerStats?.losses || 0} />
              <StatItem label="Draws" value={playerStats?.draws || 0} />
            </ul>
          </DashboardCard>

          {/* Recent Reviews */}
          <DashboardCard title="Recent Reviews">
            <ul className="space-y-4">
              {reviews.map((review, index) => (
                <li key={index} className={`${index < reviews.length - 1 ? "border-b pb-3" : ""} text-gray-700`}>
                  {`"${review.review}"`} -{" "}
                  <span className="text-indigo-600 font-medium">{review.reviewer}</span>
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </main>
    </div>
  );
};

// Reusable Card Component
const DashboardCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <motion.div
    className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition duration-300"
    whileHover={{ scale: 1.05 }}
  >
    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{title}</h2>
    {children}
  </motion.div>
);

// Reusable Stat Item Component
const StatItem: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
  <li className="flex justify-between items-center">
    <span className="font-medium text-gray-700">{label}</span>
    <span className="font-bold text-gray-800">{value}</span>
  </li>
);

export default Dashboard;
