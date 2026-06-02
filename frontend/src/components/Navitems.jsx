// src/components/Navitems.jsx

import { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import SideBar from "./SideBar";
import { LuBriefcaseBusiness } from "react-icons/lu";
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  FolderKanban,
  Folder,
  User,
  BarChart3,
  ListTodo,
  Mail,
  Shield,
  LogOut,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import NotificationBell from "./NotificationBell";

const navItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin", "manager"],
  },
  {
    label: "Clients",
    path: "/clients",
    icon: Users,
    roles: ["admin", "manager"],
  },
  {
    label: "Managers",
    path: "/addmanager",
    icon: UserCog,
    roles: ["admin"],
  },
  {
    label: "Employees",
    path: "/employees",
    icon: LuBriefcaseBusiness,
    roles: ["admin", "manager"],
  },
  {
    label: "Invoices",
    path: "/invoices",
    icon: FileText,
    roles: ["admin", "manager"],
  },
  {
    label: "Projects",
    path: "/project",
    icon: FolderKanban,
    roles: ["admin", "manager"],
  },
  {
    label: "TodoList",
    path: "/todolist",
    icon: ListTodo,
    roles: ["admin"],
  },
  {
    label: "Files",
    path: "/files",
    icon: Folder,
    roles: ["admin"],
  },
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    roles: ["admin"],
  },
];

const Navitems = ({ currentUser, loading }) => {
  const [showSidebar, setshowSidebar] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const { role, logout } = useAuth();

  const profileRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Logout function
  const handleLogout = () => {
    logout();

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    window.location.href = "/login";
  };

  return (
    <>
      <SideBar
        showSidebar={showSidebar}
        closeSidebar={() => setshowSidebar(false)}
      />

      <div className="fixed top-0 left-0 w-full z-30 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 sm:px-8 lg:px-12 h-12 bg-white">
          {/* Left Side */}
          <div className="flex items-center gap-2 min-w-0">
            <span
              className="mr-3 cursor-pointer flex-shrink-0"
              onClick={() => setshowSidebar(true)}
            >
              <Menu size={22} />
            </span>

            <NavLink
              to="/dashboard"
              className="inline-flex gap-2 items-center min-w-0"
            >
              <img
                src="/favicon.png"
                className="h-8 w-8 flex-shrink-0"
                alt="logo"
              />
              <span className="text-xl font-bold hidden xs:inline">
                FlowClient
              </span>
            </NavLink>
          </div>

      {/* Right Side */}
<div className="flex items-center gap-3 flex-shrink-0">
  {/* Notification Bell */}
  <NotificationBell />

  {/* Profile Dropdown */}
  <div ref={profileRef} className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="p-2 border rounded-full cursor-pointer bg-gray-100 hover:bg-gray-200 transition-all duration-300 flex items-center justify-center"
              >
                <User size={15} />
              </button>

              {/* Dropdown Card */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-50">
                  {/* Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-6 text-white">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center mb-4">
                      <User className="w-7 h-7" />
                    </div>

                    {loading ? (
                      <div className="h-6 w-32 bg-white/20 rounded animate-pulse mb-2" />
                    ) : (
                      <h3 className="text-xl font-bold">
                        {currentUser?.Name || "Unknown User"}
                      </h3>
                    )}

                    {loading ? (
                      <div className="h-4 w-24 bg-white/20 rounded animate-pulse mt-2" />
                    ) : (
                      <p className="text-blue-100 text-sm mt-1">
                        {currentUser?.role || role || "User"}
                      </p>
                    )}
                  </div>

                  {/* User Details */}
                  <div className="p-6 space-y-5">
                    {/* Email */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                        <Mail className="w-5 h-5 text-blue-600" />
                      </div>

                      <div className="flex-1">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Email
                        </p>

                        {loading ? (
                          <div className="h-4 w-full bg-gray-200 rounded animate-pulse mt-2" />
                        ) : (
                          <p className="text-sm font-medium text-gray-800 break-all">
                            {currentUser?.email || "No Email Found"}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Role */}
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                        <Shield className="w-5 h-5 text-purple-600" />
                      </div>

                      <div>
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          Role
                        </p>

                        {loading ? (
                          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mt-2" />
                        ) : (
                          <p className="text-sm font-medium text-gray-800">
                            {currentUser?.role || role || "User"}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Logout Button */}
                  <div className="px-6 pb-6">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 text-red-600 hover:bg-red-100 py-3 rounded-2xl font-semibold transition-all duration-300"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden tablet:flex justify-center items-center h-12 border-y bg-gray-50">
          <nav className="flex items-center gap-6">
            {navItems
              .filter((item) => item.roles.includes(role))
              .map(({ label, path, icon: Icon }) => (
                <NavLink
                  key={label}
                  to={path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 text-xs px-2 py-2 ${
                      isActive
                        ? "text-white bg-[#667CFA] border rounded-lg"
                        : "text-black"
                    }`
                  }
                >
                  <Icon size={16} />
                  {label}
                </NavLink>
              ))}
          </nav>
        </div>

        {/* Mobile Navigation */}
        <div
          className="flex tablet:hidden justify-center items-center h-12 border-y bg-gray-50"
          onClick={() => setshowSidebar(true)}
        >
          <div className="flex p-2 gap-4 hover:bg-gray-100 rounded-lg cursor-pointer transition">
            <Menu size={22} />
            <span className="font-bold">Menu</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navitems;