import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setIsAdmin(payload?.role === "ADMIN");
      } catch {
        setIsAdmin(false);
      }
    } else {
      setIsAdmin(false);
    }
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const NavLink = ({ to, label }) => (
    <Link
      to={to}
      className={`px-3 py-2 rounded-md font-medium transition ${
        location.pathname === to
          ? "text-purple-300"
          : "text-white hover:text-purple-300"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
     <Logo />


        <div className="flex space-x-4 items-center">
          {isLoggedIn ? (
            <>
              <NavLink to="/" label="Home" />
              {!isAdmin && <NavLink to="/quiz" label="Quiz" />}
              {isAdmin && <NavLink to="/admin" label="Dashboard" />}
              <button
                onClick={handleLogout}
                className="text-red-400 hover:text-red-300 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" label="Login" />
              <NavLink to="/register" label="Sign up" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


