import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Quiz from "./pages/Quiz";
import AdminDashboard from "./pages/AdminDashboard";
import AdminQuestionManager from "./pages/AdminQuestionManager";
import ProtectedRoute from "./components/ProtectedRoute";
import AddQuestion from "./pages/AddQuestion";
import EditQuestion from "./pages/EditQuestion";

import { AnimatePresence } from "framer-motion";
import PageWrapper from "./components/PageWrapper";

function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-black/60 backdrop-blur-sm pt-16 pb-16 px-4">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route
              path="/"
              element={
                <PageWrapper>
                  <Home />
                </PageWrapper>
              }
            />
            <Route
              path="/login"
              element={
                <PageWrapper>
                  <Login />
                </PageWrapper>
              }
            />
            <Route
              path="/register"
              element={
                <PageWrapper>
                  <Register />
                </PageWrapper>
              }
            />
            <Route
              path="/quiz"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <Quiz />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <AdminDashboard />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/add"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <AddQuestion />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/manage"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <AdminQuestionManager />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/edit/:id"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <EditQuestion />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>
    </>
  );
}

export default App;
