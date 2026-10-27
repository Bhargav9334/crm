# 💼 CRM — Agency Management Platform

> An agency CRM platform to manage clients, employees, projects, proposals and invoices — with role-based dashboards and reporting.

![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white) ![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=chartdotjs&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

**🔗 Live Demo:** [crm-ivory-two-67.vercel.app](https://crm-ivory-two-67.vercel.app)

## 📖 Overview

A modern, responsive CRM front end built for creative and digital agencies. It brings client management, team management, project tracking, proposals, invoicing and reporting into a single dashboard, with separate views for admins, employees and clients. The app talks to a REST API configured through an environment variable.

## ✨ Features

- **Role-based access** — protected routes and separate dashboards for admins, employees and clients
- **Client management** — client list, client profiles and a client-facing dashboard
- **Employee management** — employee directory, profiles, onboarding and manager creation
- **Projects** — project tracking with employee project views
- **Proposals** — create, list and preview proposals in a modal
- **Invoices** — invoice tables with PDF export (jsPDF / html2pdf.js)
- **Reports & analytics** — interactive charts powered by Recharts
- **Productivity tools** — files, messages, to-do list and in-app notifications
- **CSV import** with PapaParse, skeleton loaders and smooth Framer Motion animations

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, React Router |
| Styling | Tailwind CSS, Headless UI, Radix UI |
| Data & Charts | Axios, Recharts, PapaParse |
| PDF Export | jsPDF, html2pdf.js |
| Deployment | Vercel |

## 📁 Project Structure

```
crm/
└── frontend/
    └── src/
        ├── components/   # Layout, sidebar, tables, modals, protected route
        ├── pages/        # Dashboard, Clients, Employees, Projects, Proposals, Invoices, Reports…
        ├── config/       # API endpoint configuration
        ├── utils/        # API fetch helper
        ├── App.jsx
        └── main.jsx
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/Bhargav9334/crm.git
cd crm
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=https://your-api-url.com
```

> Never commit `.env` files — keep them listed in `.gitignore`.

## 👤 Author

**Bhargav Sinha** — Software Engineer · Full-Stack MERN Developer

- GitHub: [@Bhargav9334](https://github.com/Bhargav9334)
- Portfolio: [bhargavsinha.vercel.app](https://bhargavsinha.vercel.app)
- Email: bhargavsinha93@gmail.com

If you found this project useful, consider giving it a ⭐
