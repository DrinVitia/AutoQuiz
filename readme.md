# 🚗📱 Driving Exam Prep App

A mobile application built with **React Native** and **Expo**, styled using **native CSS (StyleSheet API)**, and powered by a **Prisma + Node.js** backend. The app helps users prepare for their driving theory exam through interactive quizzes, traffic sign training, and progress tracking.

---

## 🚀 Features

### 🧠 Learning Modes:

- 📚 **Practice Quizzes** by category (Traffic Laws, Signs, First Aid)
- 📝 **Simulated Exam** (40 timed questions like the real test)
- 🪧 **Traffic Sign Gallery** with filter and explanations
- 📈 **Progress Tracking** with statistics and history
- 🔔 **Daily Question Notification** (optional with push)

---

## 🧩 Tech Stack

### 📱 Frontend:

- **React Native** (via **Expo**)
- **JavaScript/TypeScript**
- **StyleSheet API** for styling (no Tailwind)
- **React Navigation**
- **AsyncStorage** for local storage

### 🖥️ Backend:

- **Node.js** with **Express**
- **Prisma ORM**
- **PostgreSQL** or **SQLite**
- **JWT Authentication** (optional)

---
---

## 🛠 Installation & Setup

### 🔹 1. Clone the Repository

```bash
git clone https://github.com/DrinVitia/Qizle.git
cd Quizle
```

### 🔹 2. Install Frontend Dependencies

```bash
cd app
npm install
cd ..
npm install cross-env --save-dev
```

### 🔹 3. Start the Expo App

```bash
npx expo start
```

Scan the QR code with your Expo Go app on Android or run on emulator/iOS simulator.

---

### 🔹 4. Backend Setup (Optional)

- Go to `/server`
- Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/drivingprep
JWT_SECRET=your_jwt_secret
```

- Install and run backend:

```bash
npm install
npx prisma migrate dev --name init
npm run dev
```

---

## ✨ Future Features

- Gamification (XP, levels, badges)
- Admin dashboard to upload questions
- Voice assistant for accessibility
- Offline support with SQLite or Realm
- Localization for multiple languages

---

## 📸 Screenshots

<img width="394" height="782" alt="image" src="https://github.com/user-attachments/assets/d565a473-4222-43d7-bd76-9e882cbcf19d" />


---

## 📤 Deployment

- **Mobile:** Expo builds via `eas build` or publish with `npx expo publish`
- **Backend:** Deploy to [Render](https://render.com), [Railway](https://railway.app), or [Vercel (API Routes)](https://vercel.com)

---

## 📬 Contact

**Author:** [Drin Vitia](https://www.linkedin.com/in/drin-vitia/)
📧 [drinvitia@gmail.com](mailto:drinvitia@gmail.com)
🌐 [Portfolio](https://drinvitia.vercel.app/)

---
