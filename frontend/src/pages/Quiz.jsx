import { useEffect, useState } from "react";
import API from "../services/api";
import { toast } from "react-toastify";
import { Listbox } from "@headlessui/react";

const topicOptions = [
  "All Topics",
  "Java Basics",
  "OOPS",
  "Spring",
  "Java Exceptions",
  "Collections",
  "Multithreading",
  "Interfaces",
];

const difficultyOptions = ["All", "EASY", "MEDIUM", "HARD"];

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    topic: "Topics",
    difficulty: "Difficulty Level",
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await API.get("/quiz/start");
        setQuestions(res.data);
      } catch {
        toast.error("Failed to load quiz. Please log in.");
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleChange = (qid, ans) => {
    setAnswers({ ...answers, [qid]: ans });
  };

  const fetchFiltered = async () => {
    try {
      setLoading(true);

      const normalizedFilters = {
        topic:
          filters.topic === "All Topics" ? "" : filters.topic.toLowerCase(),
        difficulty:
          filters.difficulty === "All Difficulty"
            ? ""
            : filters.difficulty.toUpperCase(),
      };

      const res = await API.get("/quiz/start", { params: normalizedFilters });
      setQuestions(res.data);
    } catch {
      toast.error("Failed to load filtered quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length === 0) {
      toast.warn("Please answer at least one question.");
      return;
    }

    const payload = Object.keys(answers).map((qid) => ({
      questionId: qid,
      userAnswer: answers[qid],
    }));

    try {
      const res = await API.post("/quiz/submit", payload);
      setResult(res.data);
    } catch {
      toast.error("Quiz submission failed.");
    }
  };

  if (loading)
    return <div className="text-center mt-20 text-white">Loading...</div>;

  if (result) {
    return (
      <div className="min-h-screen px-4 py-12 bg-black/60 backdrop-blur-sm text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">
            Quiz Results
          </h2>
          <p className="mb-6 text-center text-lg text-gray-300">
            ✅ You scored <strong>{result.totalCorrect}</strong> out of{" "}
            <strong>{result.totalQuestions}</strong>
          </p>
          <div className="space-y-6">
            {result.feedbackList.map((item, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-lg p-5 rounded-xl border border-white/20 shadow"
              >
                <p className="text-lg font-medium mb-2">{item.question}</p>
                <p>
                  <strong>Your Answer:</strong> {item.userAnswer}
                </p>
                <p>
                  <strong>Correct Answer:</strong> {item.correctAnswer}
                </p>
                <p
                  className={`mt-1 ${
                    item.correct ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {item.correct
                    ? "✅ Keep Learning"
                    : "❌ Incorrect Answer! Try Again"}
                </p>
                <p className="mt-2 italic text-purple-300">
                  💡 AI Feedback: {item.aiFeedback}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
                setFilters((prev) => ({
                  topic: prev.topic || "Java Basics",
                  difficulty: prev.difficulty || "EASY",
                }));
                setLoading(true);
                API.get("/quiz/start")
                  .then((res) => {
                    setQuestions(res.data);
                    setLoading(false);
                  })
                  .catch(() => {
                    toast.error("Failed to reload quiz.");
                    setLoading(false);
                  });
              }}
              className="bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-medium shadow transition"
            >
              Retake
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-12 bg-black/60 backdrop-blur-sm text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-purple-300">
          Take Your Quiz
        </h2>

        {/* Custom Filters using Headless UI */}
        <div className="flex gap-4 p-6 justify-center mt-6">
          {/* Topic Dropdown */}
          <Listbox
            value={filters.topic}
            onChange={(val) => setFilters({ ...filters, topic: val })}
          >
            <div className="relative w-48">
              <Listbox.Button className="bg-white/10 text-white px-4 py-2 rounded-md border border-white/20 w-full text-left">
                {filters.topic}
              </Listbox.Button>
              <Listbox.Options className="absolute w-full mt-1 bg-black/90 text-white shadow-lg rounded-md z-50">
                {topicOptions.map((topic, i) => (
                  <Listbox.Option
                    key={i}
                    value={topic}
                    className="px-4 py-2 hover:bg-purple-600/30 cursor-pointer"
                  >
                    {topic}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          {/* Difficulty Dropdown */}
          <Listbox
            value={filters.difficulty}
            onChange={(val) => setFilters({ ...filters, difficulty: val })}
          >
            <div className="relative w-48">
              <Listbox.Button className="bg-white/10 text-white px-4 py-2 rounded-md border border-white/20 w-full text-left">
                {filters.difficulty}
              </Listbox.Button>
              <Listbox.Options className="absolute w-full mt-1 bg-black/90 text-white shadow-lg rounded-md z-50">
                {difficultyOptions.map((diff, i) => (
                  <Listbox.Option
                    key={i}
                    value={diff}
                    className="px-4 py-2 hover:bg-purple-600/30 cursor-pointer"
                  >
                    {diff}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>

          <button
            onClick={fetchFiltered}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500"
          >
            Apply Filters
          </button>
        </div>

        {questions.length === 0 ? (
          <p className="text-center text-red-400 mt-6">
            No questions available.
          </p>
        ) : (
          questions.map((q, index) => (
            <div
              key={q.id}
              className="mb-8 p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg"
            >
              <p className="text-lg font-semibold mb-4">
                {index + 1}. {q.questionText}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, i) => (
                  <label
                    key={i}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={opt}
                      onChange={() => handleChange(q.id, opt)}
                      checked={answers[q.id] === opt}
                      className="accent-purple-500"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          ))
        )}

        {questions.length > 0 && (
          <div className="text-center mt-6">
            <button
              onClick={handleSubmit}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3 rounded-lg text-lg font-semibold shadow transition"
            >
              Submit Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
