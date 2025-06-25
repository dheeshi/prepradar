import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Listbox } from "@headlessui/react";

const difficulties = ["EASY", "MEDIUM", "HARD"];

const AddQuestion = () => {
  const [form, setForm] = useState({
    questionText: "",
    topic: "",
    difficulty: "EASY",
    correctAnswer: "",
    options: ["", "", "", ""]
  });

  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleOptionChange = (i, val) => {
    const updated = [...form.options];
    updated[i] = val;
    setForm({ ...form, options: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/questions/add", form);
      toast.success("Question added!");
      navigate("/admin/manage");
    } catch {
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-lg border border-white/20 text-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">➕ Add New Question</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="questionText" value={form.questionText} onChange={handleChange} placeholder="Question text" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          <input name="topic" value={form.topic} onChange={handleChange} placeholder="Topic" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />

          <div>
            <label className="block text-sm font-medium text-purple-300 mb-1">Difficulty</label>
            <Listbox
              value={form.difficulty}
              onChange={(value) => setForm({ ...form, difficulty: value })}
            >
              <div className="relative">
                <Listbox.Button className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white text-left">
                  {form.difficulty}
                </Listbox.Button>
                <Listbox.Options className="absolute mt-1 w-full bg-indigo-950 border border-white/20 rounded-md shadow-lg z-50">
                  {difficulties.map((diff) => (
                    <Listbox.Option
                      key={diff}
                      value={diff}
                      className={({ active }) =>
                        `cursor-pointer p-2 ${active ? "bg-purple-600 text-white" : "text-white"}`
                      }
                    >
                      {diff}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
          </div>

          {form.options.map((opt, i) => (
            <input key={i} value={opt} onChange={(e) => handleOptionChange(i, e.target.value)} placeholder={`Option ${i + 1}`} className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />
          ))}

          <input name="correctAnswer" value={form.correctAnswer} onChange={handleChange} placeholder="Correct Answer" className="w-full bg-white/20 border border-white/30 p-3 rounded-md text-white placeholder-gray-300" />

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-md font-medium transition">
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestion;

