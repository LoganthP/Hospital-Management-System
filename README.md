<h1 align="center">MediCare - Premium Hospital Management System</h1>

<div align="center">

![MediCare](https://img.shields.io/badge/MediCare-v1.0.0-blue?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-green.svg?style=for-the-badge)
![Status](https://img.shields.io/badge/status-active-success.svg?style=for-the-badge)

**A State-of-the-Art, AI-Enhanced Hospital Management Platform with a Premium Medical Aesthetic**

</div>

---

## 🌍 About the Project

**MediCare** is a high-fidelity, comprehensive hospital management platform designed for the modern medical environment. It features a premium, glassmorphism-inspired dark theme with deep medical-blue accents, providing an elite user experience for administrators, doctors, and staff.

Built with **React 19** and **Vite**, the system is optimized for speed, responsiveness, and real-time data visualization.

---

## 💎 Premium Features

### 🔐 High-Fidelity Authentication
- **Dual-Pane Login**: A stunning entry experience with glassmorphism cards and smooth transitions.
- **Secure Sign-In/Up**: Role-based access for Admin and Tester accounts.

### 🏥 Advanced Ward Management
- **Real-time Occupancy Map**: Interactive, color-coded grid visualization of hospital wards and rooms (Available, Occupied, Cleaning, Reserved).
- **Dynamic Assignments**: Seamlessly assign patients and doctors to specific rooms with instant status updates.
- **Live Filtering**: Instantly filter wards by ICU, Emergency, General, or Private categories.

### 📊 Billing & Revenue Distribution
- **Standalone Billing Module**: A dedicated financial hub with high-fidelity data grids.
- **Revenue Intelligence**: Sophisticated charts powered by Recharts with monotone emerald curves.
- **Interactive Data Management**: Premium status filtering (Paid, Pending, Unpaid) and professional CSV export engine.

### ⚙️ Sophisticated Settings & Audit
- **Unified Branding**: Global "Hospital Context" for theme and color management.
- **Admin Audit Logs**: Real-time tracking of login history and system activity.
- **iOS-Style Preferences**: State-of-the-art notification toggles and minimalist configuration panels.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & Vanilla CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Context Management**: Custom `HospitalContext` for global application state.

---

## 🏗 Project Structure

```
Hospital-Management-System/
├── src/
│   ├── components/      # Atomic UI components (BillingTable, RoomCard, etc.)
│   ├── context/         # Global HospitalContext (Theme, State, Auth)
│   ├── pages/           # High-level route components (Dashboard, WardManagement, etc.)
│   ├── App.tsx          # Main routing & Auth guards
│   └── main.tsx         # App entry point
├── public/              # Static assets & brand media
├── tailwind.config.js   # Custom medical-blue theme config
└── package.json         # Modern Vite/React dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18.x or higher
- **npm**: 9.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LoganthP/Hospital-Management-System.git
   cd Hospital-Management-System
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Access the application:
   Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<div align="center">

⭐ Created for Excellence in Healthcare Management  
**Modern | Secure | Premium**

</div>
