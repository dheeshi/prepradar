import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl text-white bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-10 text-center">
        <h1 className="text-4xl font-bold text-purple-300 mb-4">Admin Dashboard</h1>
        <p className="mb-6 text-gray-300">
          Manage your interview question content below:
        </p>

        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => navigate("/admin/add")}
            className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg w-64 transition"
          >
            ➕ Add New Question
          </button>
          <button
            onClick={() => navigate("/admin/manage")}
            className="bg-indigo-800 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg w-64 transition"
          >
            ✏️ Edit / Delete Questions
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
