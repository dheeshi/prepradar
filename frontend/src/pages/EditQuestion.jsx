import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const EditQuestion = () => {
  const [form, setForm] = useState({
    questionText: "",
    topic: "",
    difficulty: "EASY",
    correctAnswer: "",
    options: ["", "", "", ""]
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    API.get("/questions/all").then((res) => {
      const q = res.data.find((item) => item.id === id);
      if (q) setForm(q);
    });
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOptionChange = (i, val) => {
    const updated = [...form.options];
    updated[i] = val;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.put(`/questions/${id}`, form);
    toast.success("Question updated!");
    navigate("/admin/manage");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">✏️ Edit Question</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="questionText" value={form.questionText} onChange={handleChange} placeholder="Question text" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          <input name="topic" value={form.topic} onChange={handleChange} placeholder="Topic" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          <select name="difficulty" value={form.difficulty} onChange={handleChange} className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white">
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
          {form.options.map((opt, i) => (
            <input key={i} value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${i + 1}`} className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          ))}
          <input name="correctAnswer" value={form.correctAnswer} onChange={handleChange} placeholder="Correct Answer" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-md font-medium transition">Update Question</button>
        </form>
      </div>
    </div>
  );
};

export default EditQuestion;
