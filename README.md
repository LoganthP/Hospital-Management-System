<h1 align="center">HealthHub Central - Hospital Management System</h1>

<div align="center">

![HealthHub Central](https://img.shields.io/badge/HealthHub-Central-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success.svg?style=for-the-badge)

**An AI-Enhanced Hospital Management Platform for Patient Care, Appointments, Billing, and Analytics**

</div>

---

## 🌍 About the Project

**HealthHub Central** is a modern **web-based hospital management system** built with Next.js, React, TypeScript, Tailwind CSS, and integrated backend services.  
It supports administrators, doctors, nurses, and patients in managing health records, appointments, billing, and clinical operations through a single unified dashboard.

---

## 🧠 Key Features

- 🩺 Patient records and medical data management  
- 🗓 Appointment scheduling and tracking  
- 📊 Dashboard analytics and reporting  
- 💳 Billing, payments & financial tracking  
- 🧑‍⚕️ Role-based dashboards for doctors, staff & patients  
- 🤖 AI-driven specialist recommendations and prescription assistance

---

## 🛠 Tech Stack

### Frontend
- React (Next.js)  
- TypeScript  
- Tailwind CSS  
- React Hooks & Context

### Backend Services
- Firebase Auth  
- Cloud Firestore / Realtime DB  
- Firebase Storage  
- AI workflows (GenKit / AI integration)

### Tooling
- ESLint & Prettier  
- Zod for validation  
- Tailwind CSS  
- React Hook Form  

---

## 🏗 System Architecture

```
Client (Next.js + React)
        │
        ▼
Frontend Logic (UI + Pages)
        │
        ▼
Firebase Services (Auth, DB, Storage)
        │
        ▼
AI & Analytics Engines (GenKit / AI APIs)
```

---

## 📁 Project Folder Structure

```
Hospital-Management-System/
│
├── public/                  # Static public assets
├── src/
│   ├── app/                 # Next.js app routes & pages
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Utilities and helper functions
│   ├── hooks/               # Custom React hooks
│   ├── styles/              # Tailwind / global CSS
│   └── ai/                  # AI logic and flows
│
├── .env.local.example       # Environment variable template
├── package.json             # JS dependencies & scripts
├── tailwind.config.js       # Tailwind config
├── next.config.js           # Next.js config
└── README.md                # Project documentation
```

---

## 📌 Important Source Code

### 🔹 Sample AI Specialist Finder Function

```ts
export async function findSpecialist(criteria) {
  return await fetch("/api/ai/specialist-finder", {
    method: "POST",
    body: JSON.stringify(criteria),
  }).then(res => res.json());
}
```

---

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm / yarn

---

### Setup Steps

```bash
git clone https://github.com/LoganthP/Hospital-Management-System.git
cd Hospital-Management-System
npm install
```

Create environment file:
```bash
cp .env.local.example .env.local
```

Add your Firebase & AI API keys inside `.env.local`.

---

## 📍 Running the App

```bash
npm run dev
```

Then open in browser:

```
http://localhost:9002/
```

---

## 📖 Usage

Use the system to:
- Register users (Admins / Doctors / Patients)
- Manage appointments & schedules
- Track billing and payments
- View analytics dashboards
- Use AI tools for smart recommendations

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

⭐ Built with Next.js, Firebase & AI components  
Efficient, Secure & Scalable Health Management

</div>
