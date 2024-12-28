import React from "react";
import LogoChess from "../assets/LogoChess.png";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaChessKing,
  FaChessQueen,
  FaChessBishop,
} from "react-icons/fa";

const Home: React.FC = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const floatingPieces = [
    { Icon: FaChessKing, delay: 0 },
    { Icon: FaChessQueen, delay: 0.2 },
  ];

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Hero Section with Animated Chess Pieces */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-teal-900 to-gray-900">
        <div className="absolute inset-0 overflow-hidden">
          {floatingPieces.map(({ Icon, delay }, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: -100,
              }}
              animate={{
                y: ["-10vh", "110vh"], // Smooth vertical float from off-screen top to bottom
                x: [
                  Math.random() * 300 - 150, // Slight horizontal sway
                  Math.random() * 300 - 150,
                ],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="text-white/10 w-24 h-24" />
            </motion.div>
          ))}
        </div>

        {/* Add the Logo */}
        <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <motion.img
            src={LogoChess}
            alt="Pawn2King Logo"
            className="w-40 h-40 mx-auto mb-8 cursor-pointer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
              scale: 1.1,
              rotate: 10,
              transition: { duration: 0.3 },
            }}
          />
          <motion.div initial="initial" animate="animate" variants={staggerChildren}>
            <motion.h1
              variants={fadeInUp}
              className="text-6xl md:text-7xl font-extrabold mb-6"
            >
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
                Pawn2King
              </span>
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12"
            >
              Master the game of kings. Analyze, learn, and dominate the board
              with our advanced chess platform.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <Link
                to="/register"
                className="group relative px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <span className="relative z-10 text-lg font-semibold">
                  Register
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
              </Link>

              <Link
                to="/login"
                className="group relative px-8 py-4 border-2 border-yellow-400 text-yellow-400 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              >
                <div className="absolute inset-0 bg-yellow-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200"></div>
                <span className="relative z-10 group-hover:text-gray-900">
                  Sign In
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Pawn2King Section */}
      <section className="py-24 px-6 bg-gray-900">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            About Pawn2King
          </h2>

          <p className="text-xl text-gray-300 text-center max-w-3xl mx-auto mb-12">
            Pawn2King is a comprehensive chess platform designed to provide players
            with an immersive and interactive experience. Whether you're a beginner
            or an expert, the platform helps you master the game of kings by
            offering powerful tools like AI-powered game analysis, learning
            resources from grandmasters, and insights into your gameplay.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-900">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-center text-white mb-16">
            Key Features of Pawn2King
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[ 
              {
                icon: FaChessKing,
                title: "Advanced Analysis",
                description: "AI-powered analysis to break down your moves and suggest improvements."
              },
              {
                icon: FaChessQueen,
                title: "Learn from Masters",
                description: "Access tutorials and games from top grandmasters to sharpen your skills."
              },
              {
                icon: FaChessBishop,
                title: "Track Your Progress",
                description: "Get detailed insights on your games and track your improvement over time."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 p-8 rounded-xl hover:bg-gray-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 text-yellow-400 mb-6" />
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-6 bg-gradient-to-br from-teal-900 to-gray-900">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to Master Chess?</h2>
          <p className="text-xl text-gray-300 mb-12">
            Join thousands of players and become a master of the game with Pawn2King. Start your journey today and improve your skills like never before.
          </p>
          <Link
            to="/register"
            className="inline-block px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            Get Started Now
          </Link>
        </motion.div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-teal-900 to-gray-900">
        <motion.div
          className="max-w-7xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold text-white mb-8">Choose Your Plan</h2>
          <p className="text-xl text-gray-300 mb-12">
            Choose a plan that fits your needs and unlock the full potential of Pawn2King. Enjoy exclusive tutorials, advanced AI analysis, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {/* Free Plan Card */}
            <div className="bg-gray-800 p-8 rounded-xl text-white w-full sm:w-1/2 lg:w-1/3">
              <h3 className="text-2xl font-semibold mb-6">Free Plan</h3>
              <p className="text-lg text-gray-300 mb-6">
                Access to basic features, including game tracking and limited AI analysis. 
                You can also leave up to 3 reviews per day on any chess game.
              </p>
              <ul className="text-gray-400 mb-6 space-y-2">
                <li>🎯 Game Tracking</li>
                <li>💡 Basic AI Analysis</li>
                <li>📅 3 Reviews per Day</li>
                <li>🛠️ Limited Features</li>
              </ul>
              <Link
                to="/subscribe"
                className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all duration-300 block text-center"
              >
                Get Started
              </Link>
            </div>

            {/* Premium Plan Card */}
            <div className="bg-gray-800 p-8 rounded-xl text-white w-full sm:w-1/2 lg:w-1/3">
              <h3 className="text-2xl font-semibold mb-6">Premium Plan</h3>
              <p className="text-lg text-gray-300 mb-6">
                Unlock all features, including unlimited AI analysis, personalized tutorials, and premium game reviews. 
                Cost: ₹100 for 3 months.
              </p>
              <ul className="text-gray-400 mb-6 space-y-2">
                <li>🎯 Advanced AI Analysis</li>
                <li>💡 Personalized Tutorials</li>
                <li>📅 Unlimited Reviews</li>
                <li>💳 ₹100 for 3 months</li>
              </ul>
              <Link
                to="/subscribe"
                className="px-6 py-3 bg-yellow-400 text-gray-900 rounded-lg hover:bg-yellow-500 transition-all duration-300 block text-center"
              >
                Subscribe Now
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
