import { useEffect, useState } from "react";
import API from "../services/api";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const AdminQuestionManager = () => {
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    try {
      const res = await API.get("/questions/all");
      setQuestions(res.data);
    } catch {
      setError("Access denied or not logged in as admin.");
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);


const handleDelete = async (id) => {
  toast.custom((t) => (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-xl border border-white/20 flex flex-col items-center w-[300px]">
      <p className="mb-4 text-center">Are you sure you want to delete this question?</p>
      <div className="flex justify-center gap-4">
        <button
          onClick={async () => {
            try {
              await API.delete(`/questions/${id}`);
              fetchQuestions();
              toast.dismiss(t.id);
              toast.success("Question deleted!");
            } catch {
              toast.error("Delete failed.");
            }
          }}
          className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded text-white font-medium transition"
        >
          Yes
        </button>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded text-white font-medium transition"
        >
          Cancel
        </button>
      </div>
    </div>
  ), { duration: 10000 });
};


  return (
    <div className="min-h-screen px-4 pt-20 pb-10 text-white bg-black/60 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-300">Manage Existing Questions</h2>
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <ul className="space-y-5">
          {questions.map((q) => (
            <li key={q.id} className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-xl shadow-lg">
              <p className="font-semibold">{q.questionText}</p>
              <p className="text-sm text-gray-300 mt-1">Topic: {q.topic} | Difficulty: {q.difficulty}</p>
              <p className="text-sm text-gray-400">Options: {q.options.join(", ")}</p>
              <p className="text-sm text-green-400">Answer: {q.correctAnswer}</p>
              <div className="mt-4 flex gap-3">
                <button onClick={() => navigate(`/admin/edit/${q.id}`)} className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded transition">Edit</button>
                <button onClick={() => handleDelete(q.id)} className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded transition">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminQuestionManager;


