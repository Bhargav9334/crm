// ===============================================
// src/pages/Dashboard.jsx
// PREMIUM ENTERPRISE DASHBOARD UI
// All functionality preserved exactly as before.
// Only design, styling, spacing, and animations upgraded.
// ===============================================

import {
  Users,
  TrendingUp,
  Folder,
  ListTodo,
  Receipt,
  MessageSquare,
  FileText,
  Plus,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import { apiFetch } from "../utils/apiFetch";
import ProjectTable from "../components/projectTable";

const Dashboard = () => {
  const navigate = useNavigate();

  // ==========================================
  // State
  // ==========================================
const [totalClients, setTotalClients] = useState(0);
const [totalProject, setTotalProject] = useState(0);
const [projects, setProjects] = useState([]);
const [activities, setActivities] = useState([]);

const [loadingClients, setLoadingClients] = useState(true);
const [loadingProjects, setLoadingProjects] = useState(true);
const [loadingActivities, setLoadingActivities] = useState(true);

  const DASHBOARD_LIMIT = 3;

  const recentProjects = Array.isArray(projects)
    ? projects.slice(0, DASHBOARD_LIMIT)
    : [];

  // ==========================================
  // API Calls (Unchanged)
  // ==========================================
 
  useEffect(() => {
  setLoadingClients(true);

  apiFetch(API.clientsCount)
    .then((data) => setTotalClients(data?.total ?? 0))
    .catch(console.error)
    .finally(() => setLoadingClients(false));
}, []);

useEffect(() => {
  setLoadingProjects(true);

  apiFetch(API.projectsCount)
    .then((data) => setTotalProject(data?.total ?? 0))
    .catch(console.error)
    .finally(() => setLoadingProjects(false));
}, []);
useEffect(() => {
  apiFetch(API.projects)
    .then((data) =>
      setProjects(Array.isArray(data) ? data : [])
    )
    .catch((err) =>
      console.error("Failed to fetch projects:", err)
    );
}, []);

 useEffect(() => {
  setLoadingActivities(true);

  apiFetch(API.activityRecent)
    .then((data) => setActivities(data ?? []))
    .catch((err) =>
      console.error("Failed to fetch activities:", err)
    )
    .finally(() => setLoadingActivities(false));
}, []);

  // ==========================================
  // JSX
  // ==========================================
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/3 right-10 w-96 h-96 bg-cyan-300/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 shadow-2xl">
            {/* Hero Background Effects */}
            <div className="absolute inset-0">
              <div className="absolute -top-10 -right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-300/20 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 px-8 md:px-12 py-10 md:py-12 text-white">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
                {/* Left Content */}
                <div>
                  

                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    Welcome Back 👋
                  </h1>

                  <p className="mt-4 text-indigo-100 text-lg max-w-2xl leading-relaxed">
                    Track clients, projects, activities, and
                    productivity in one beautifully designed
                    workspace.
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => navigate("/project")}
                  className="group inline-flex items-center justify-center gap-3 px-6 py-4 bg-white text-indigo-700 rounded-2xl font-semibold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                >
                  
                  Create Project
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          STATS SECTION
      ========================================== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            <StatsCard
              title="Active Clients"
              value={totalClients}
              description="Start by adding your first client"
              icon={Users}
              iconColor="text-blue-600"
              iconBgColor="bg-blue-100"
              onClick={() => navigate("/clients")}
            />

            <StatsCard
              title="Monthly Revenue"
              value="$0.00"
              description="This month"
              icon={TrendingUp}
              iconColor="text-green-600"
              iconBgColor="bg-green-100"
            />

            <StatsCard
              title="Active Projects"
              value={totalProject}
              description="In Progress"
              icon={Folder}
              iconColor="text-purple-600"
              iconBgColor="bg-purple-100"
              onClick={() => navigate("/project")}
            />

            <StatsCard
              title="Pending Todos"
              value={0}
              description="All caught up!"
              icon={ListTodo}
              iconColor="text-orange-600"
              iconBgColor="bg-orange-100"
              onClick={() => navigate("/todolist")}
            />
          </div>
        </div>
      </section>

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <section className="relative z-10 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* LEFT CONTENT */}
            <div className="lg:col-span-3 space-y-8">
              {/* Recent Activity */}
              <GlassCard>
                <SectionHeader
                  title="Recent Activity"
                  subtitle="Latest updates from your workspace"
                />

                <div className="space-y-5">
                  {activities.length === 0 ? (
                    <EmptyState
                      icon={Receipt}
                      message="No recent activity"
                    />
                  ) : (
                    activities.map((item) => (
                      <ActivityItem
                        key={item.id}
                        item={item}
                      />
                    ))
                  )}
                </div>
              </GlassCard>

              {/* Recent Projects */}
              <GlassCard>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <SectionHeader
                    title="Recent Projects"
                    subtitle="Your latest project updates"
                  />

                  <button
                    onClick={() => navigate("/project")}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-2xl font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
                  >
                    <Plus size={18} />
                    New Project
                  </button>
                </div>

                {recentProjects.length === 0 ? (
                  <EmptyState
                    icon={Folder}
                    message="No project yet"
                  />
                ) : (
                  <>
                    <ProjectTable projects={recentProjects} />

                    {projects.length > DASHBOARD_LIMIT && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={() =>
                            navigate("/project")
                          }
                          className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                        >
                          Show more
                          <ArrowRight size={16} />
                        </button>
                      </div>
                    )}
                  </>
                )}
              </GlassCard>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="space-y-8">
              {/* Quick Actions */}
              <GlassCard>
                <SectionHeader
                  title="Quick Actions"
                  subtitle="Access important tools"
                  centered
                />

                <div className="space-y-3">
                  <QuickButton
                    icon={Receipt}
                    text="Create Invoice"
                    onClick={() =>
                      navigate("/invoices")
                    }
                    primary
                  />
                  <QuickButton
                    icon={Users}
                    text="Add New Client"
                    onClick={() =>
                      navigate("/clients")
                    }
                  />
                  <QuickButton
                    icon={Folder}
                    text="New Project"
                    onClick={() =>
                      navigate("/project")
                    }
                  />
                  <QuickButton
                    icon={ListTodo}
                    text="Manage Todos"
                    onClick={() =>
                      navigate("/todolist")
                    }
                  />
                  <QuickButton
                    icon={MessageSquare}
                    text="Send Message"
                    onClick={() =>
                      navigate("/messages")
                    }
                  />
                </div>
              </GlassCard>

              {/* Recent Files */}
              <GlassCard>
                <SectionHeader
                  title="Recent Files"
                  subtitle="Documents and uploads"
                />
                <EmptyState
                  icon={FileText}
                  message="No files uploaded yet"
                />
              </GlassCard>

              {/* Messages */}
              <GlassCard>
                <SectionHeader
                  title="Messages"
                  subtitle="Team communication"
                />
                <EmptyState
                  icon={MessageSquare}
                  message="No messages yet"
                />
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// ===============================================
// REUSABLE COMPONENTS
// ===============================================

const GlassCard = ({ children }) => (
  <div className="bg-white/75 backdrop-blur-2xl border border-white/60 rounded-[2rem] p-6 md:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:shadow-[0_30px_80px_rgba(15,23,42,0.12)] transition-all duration-500">
    {children}
  </div>
);

const SectionHeader = ({
  title,
  subtitle,
  centered = false,
}) => (
  <div className={centered ? "text-center mb-6" : "mb-6"}>
    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
      {title}
    </h2>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-1">
        {subtitle}
      </p>
    )}
  </div>
);

const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  iconColor,
  iconBgColor,
  onClick,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const isNumber = typeof value === "number";

  useEffect(() => {
    if (!isNumber) return;

    let start = 0;
    const duration = 600;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value, isNumber]);

  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden cursor-pointer rounded-[2rem] border border-white/60 bg-white/80 backdrop-blur-2xl p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)] hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(79,70,229,0.15)] transition-all duration-500"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-500">
            {title}
          </p>

          <p className="text-4xl font-bold text-gray-900 mt-3 tracking-tight">
            {isNumber ? displayValue : value}
          </p>

          {description && (
            <p className="text-xs text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>

        <div
          className={`p-4 rounded-2xl ${iconBgColor} ${iconColor} shadow-sm group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon size={26} />
        </div>
      </div>
    </div>
  );
};

const ActivityItem = ({ item }) => {
  const Icon =
    item.type === "client"
      ? Users
      : item.type === "project"
      ? Folder
      : Receipt;

  const color =
    item.type === "client"
      ? "text-purple-600 bg-purple-100"
      : item.type === "project"
      ? "text-green-600 bg-green-100"
      : "text-blue-600 bg-blue-100";

  return (
    <div className="group flex gap-4 items-start rounded-2xl p-3 hover:bg-gray-50/80 transition-all duration-300">
      <div
        className={`w-11 h-11 rounded-2xl ${color} flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}
      >
        <Icon size={18} />
      </div>

      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-900">
          {item.message}
        </p>

        <p className="text-xs text-gray-500 mt-1">
          {item.createdAt?._seconds
            ? new Date(
                item.createdAt._seconds * 1000
              ).toLocaleString()
            : "Just now"}
        </p>
      </div>
    </div>
  );
};

const QuickButton = ({
  icon: Icon,
  text,
  onClick,
  primary = false,
}) => (
  <button
    onClick={onClick}
    className={`group w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
      primary
        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-xl hover:scale-[1.02]"
        : "bg-gray-50 text-gray-700 hover:bg-gray-100 hover:translate-x-1"
    }`}
  >
    <Icon
      size={18}
      className="group-hover:scale-110 transition-transform"
    />
    <span>{text}</span>
  </button>
);

const EmptyState = ({
  icon: Icon,
  message,
}) => (
  <div className="flex flex-col items-center justify-center py-12 text-center">
    <div className="w-14 h-14 rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center mb-4">
      <Icon size={24} />
    </div>
    <p className="text-gray-500 font-medium">{message}</p>
  </div>
);

export default Dashboard;