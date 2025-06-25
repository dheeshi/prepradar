import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Register = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      toast.success(res.data);
      navigate("/login");
    } catch {
      toast.error("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Sign up</h2>
        <p className="text-sm text-center mb-6 text-gray-300">Create a new account to get started</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">Username</label>
            <input
              type="text"
              name="username"
              onChange={handleChange}
              placeholder="Enter Username"
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="Enter Email"
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">Password</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-300">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-purple-300 hover:underline cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;


