// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload?.role || "");
      } catch {
        setRole("");
      }
    }
  }, []);

  return (
    <div className="min-h-screen pt-28 px-6 bg-black/60 backdrop-blur-sm text-white">
      <div className="max-w-6xl mx-auto text-center">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-lg text-gray-300 uppercase tracking-wider mb-2">
            Welcome to Preparation Radar
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500">
            Ace Your Interviews with PrepRadar
          </h1>
          <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
            An AI-powered platform to practice, analyze, and master tech
            interview questions like a pro.
          </p>
          {role === "ADMIN" ? (
            <div className="mt-8">
              <a
                href="/admin"
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                🛠 Go to Admin Dashboard
              </a>
            </div>
          ) : (
            <div className="mt-8">
              <a
                href="/quiz"
                className="inline-block bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold transition"
              >
                🚀 Start Practicing
              </a>
            </div>
          )}

          <div className="mt-10 animate-bounce text-purple-400 text-xl">↓</div>
        </motion.div>
      </div>

      {/* Features Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="mt-24 grid gap-12 md:grid-cols-3 text-center max-w-6xl mx-auto"
      >
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow">
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            🔍 AI Feedback
          </h3>
          <p className="text-gray-300">
            Get instant insights and explanations after each question with
            AI-powered feedback.
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow">
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            📊 Analytics
          </h3>
          <p className="text-gray-300">
            Track your accuracy, speed, and improvement over time with smart
            analytics (coming soon).
          </p>
        </div>
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20 shadow">
          <h3 className="text-xl font-bold text-purple-300 mb-2">
            🧠 Real Questions
          </h3>
          <p className="text-gray-300">
            Practice with a curated set of real-world technical questions by
            topic and difficulty.
          </p>
        </div>
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
        className="mt-32 max-w-4xl mx-auto text-center"
      >
        <h2 className="text-3xl font-bold text-purple-300 mb-6">
          💬 What learners say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow">
            <p className="italic text-gray-300 mb-2">
              “PrepRadar helped me crack my first Java interview. The AI
              feedback is 🔥.”
            </p>
            <p className="text-purple-300 font-semibold">
              — Zandy, CS Student
            </p>
          </div>
          <div className="bg-white/10 p-6 rounded-xl border border-white/20 shadow">
            <p className="italic text-gray-300 mb-2">
              “The quiz format and feedback gave me real confidence.”
            </p>
            <p className="text-purple-300 font-semibold">
              — Deha, Fresher at Infosys
            </p>
          </div>
        </div>
      </motion.div>

      {/* About Section */}
      <div className="mt-32 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-purple-300 mb-4">
          ℹ️ About PrepRadar
        </h2>
        <p className="text-gray-300">
          PrepRadar is an AI-powered interview prep platform built for students,
          job seekers, and career switchers. We help you practice intelligently
          with topic-based questions, detailed feedback, and powerful insights.
        </p>
        <p className="mt-6 text-gray-400 text-sm">
          Built with ❤️ using React, Spring Boot, MongoDB & Tailwindcss.
        </p>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} PrepRadar. All rights reserved.
      </div>
    </div>
  );
};

export default Home;
