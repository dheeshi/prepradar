# 🧠 PrepRadar - AI-Powered Interview Preparation Platform

PrepRadar is a full-stack web application built to help programming students and job seekers practice interview questions.
With user login, admin panel, quiz functionality, and clean UI — it's your personal preparation radar 🚀.

## 🌐 Live Demo

- 🔗 Frontend: [https://prepradar.vercel.app](https://prepradar.vercel.app)
- 🔗 Backend API: [https://prepradar-backend.onrender.com](https://prepradar-backend.onrender.com)

---

## 📸 Screenshots

| Home Page                             | Quiz Page                             | Admin Dashboard                        |
|--------------------------------------|---------------------------------------|----------------------------------------|
| ![Home](assets/home.png)             | ![Quiz](assets/quiz.png)              | ![Admin](assets/admin.png)             |

---

## 💡 Features

### 👤 User
- Secure Register & Login using JWT Authentication
- Take quizzes based on real interview questions
- Get feedback with the help of cohere ai
- Filter questions by topic and difficulty
- Role-based routing
- Mobile-responsive UI

### 🛠️ Admin
- Add, Edit, Delete quiz questions
- Role-based access to dashboard
- Full CRUD operations on quiz questions stored in MongoDB
---

## 🛠️ Tech Stack

### 🔷 Frontend
- React + Vite
- Tailwind CSS
- React Router
- Axios
- Framer Motion, Toast Notifications
- Deployed on Vercel

### 🟩 Backend
- Spring Boot
- Spring Security (JWT Auth)
- MongoDB (Atlas)
- Render Deployment

---

## 📁 Project Structure

prepradar/
│
├── backend/ # Spring Boot API
│ ├── src/main/java/... # Controllers, Security, Repos
│ └── application.properties
│
├── frontend/ # React App
│ ├── public/
│ ├── src/
│ │ ├── pages/
│ │ ├── components/
│ │ └── App.jsx
│ └── vite.config.js



📌 How to Run Locally

# Clone repo
git clone https://github.com/dheeshi/prepradar.git
cd prepradar

# Start Backend
cd backend
./mvnw spring-boot:run

# Start Frontend
cd frontend
npm install
npm run dev
