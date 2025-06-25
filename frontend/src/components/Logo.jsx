import { Link } from "react-router-dom";
import { Radar } from "lucide-react"; // Optional: Lucide for modern icons

const Logo = () => {
  return (
    <Link
      to="/"
      className="flex items-center gap-2 text-2xl font-extrabold tracking-wide bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent hover:opacity-90 transition"
    >
      <Radar className="w-6 h-6 text-purple-400 animate-pulse" />
      PrepRadar
    </Link>
  );
};

export default Logo;
