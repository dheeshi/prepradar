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
| ![Home](![image](https://github.com/user-attachments/assets/ae9b076d-7d49-470d-be66-e948a995d591)
)             | ![Quiz](![Screenshot (109)](https://github.com/user-attachments/assets/46a075ce-d889-412c-a7a6-0de148ba5a86)
)              | ![Admin](![Screenshot (110)](https://github.com/user-attachments/assets/188c4959-46f1-4790-82aa-7fc7623dc6d9)
             |

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
