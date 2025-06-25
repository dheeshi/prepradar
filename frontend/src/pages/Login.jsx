import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Clear any previous token
      localStorage.removeItem("token");
      localStorage.removeItem("role");

      // Login API
      const res = await API.post("/auth/login", form);
      const token = res.data.token.replace("Bearer ", "");
      localStorage.setItem("token", token);

      toast.success("Logged in successfully!");

      // Fetch user role
      const userRes = await API.get("/auth/me");
      //console.log("User response:", userRes.data);
      const role = userRes.data.role;

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/quiz");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      toast.error("Login failed. Check credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Login</h2>
        <p className="text-sm text-center mb-6 text-gray-300">
          Already have an account? please login
        </p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter Email Address"
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-purple-300">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter Password"
              className="w-full p-3 rounded bg-white/20 text-white placeholder-gray-400 border border-white/30 focus:ring-2 focus:ring-purple-500 outline-none"
            />
            <p className="text-xs text-right mt-1 text-gray-300 cursor-pointer hover:underline">
              Forgot Password?
            </p>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Log In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-300">OR</p>
          <button className="mt-2 bg-white text-black px-4 py-2 rounded shadow flex items-center justify-center gap-2 mx-auto">
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            Sign in with Google
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-300">
          If you don't have an account,{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-purple-300 hover:underline cursor-pointer"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};
export default Login;
