import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { X } from "lucide-react";
import { LuBriefcaseBusiness } from "react-icons/lu";

import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  FolderKanban,
  Folder,
  BarChart3,
  MessageSquare,
  Headset,
  User,
} from "lucide-react";

const navItems = [
  // ================= ADMIN =================

  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["admin"],
  },
  {
    label: "Clients",
    path: "/clients",
    icon: Users,
    roles: ["admin"],
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
    roles: ["admin"],
  },
  {
    label: "Projects",
    path: "/project",
    icon: FolderKanban,
    roles: ["admin"],
  },
  {
    label: "Invoices",
    path: "/invoices",
    icon: FileText,
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
  {
    label: "Proposals",
    path: "/proposals",
    icon: FileText,
    roles: ["admin"],
  },
  {
    label: "Messages",
    path: "/messages",
    icon: MessageSquare,
    roles: ["admin"],
  },
  {
    label: "Contact",
    path: "/contact",
    icon: Headset,
    roles: ["admin"],
  },

  // ================= MANAGER =================

  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    roles: ["manager"],
  },
  {
    label: "Clients",
    path: "/clients",
    icon: Users,
    roles: ["manager"],
  },
  {
    label: "Employees",
    path: "/employees",
    icon: LuBriefcaseBusiness,
    roles: ["manager"],
  },
  {
    label: "Projects",
    path: "/project",
    icon: FolderKanban,
    roles: ["manager"],
  },
  {
    label: "Invoices",
    path: "/invoices",
    icon: FileText,
    roles: ["manager"],
  },

  // ================= CLIENT =================

  {
    label: "Dashboard",
    path: "/client/dashboard",
    icon: LayoutDashboard,
    roles: ["client"],
  },
  {
  label: "My Profile",
  path: "/client/profile",
  icon: User,
  roles: ["client"],
},
  {
    label: "My Projects",
    path: "/client/projects",
    icon: FolderKanban,
    roles: ["client"],
  },
 
  {
    label: "Messages",
    path: "/client/messages",
    icon: MessageSquare,
    roles: ["client"],
  },
  {
    label: "Support",
    path: "/client/support",
    icon: Headset,
    roles: ["client"],
  },

  // ================= EMPLOYEE =================

  {
    label: "Dashboard",
    path: "/employee/dashboard",
    icon: LayoutDashboard,
    roles: ["employee"],
  },
  {
  label: "My Profile",
  path: "/employee/profile",
  icon: User,
  roles: ["employee"],
},
  {
    label: "My Projects",
    path: "/employee/projects",
    icon: FolderKanban,
    roles: ["employee"],
  },
 
];

function SideBar({ showSidebar, closeSidebar }) {
  const { role } = useAuth();

  if (!showSidebar) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50"
      onClick={closeSidebar}
    >
      <div
        className="absolute left-0 top-0 h-full w-80 bg-white shadow-2xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-5 border-b">
          <div className="flex items-center gap-3">
            <img
              src="/favicon.png"
              alt="logo"
              className="h-10 w-10"
            />

            <div>
              <h1 className="font-bold text-xl">
                FlowClient
              </h1>

              <p className="text-xs text-gray-500 capitalize">
                {role}
              </p>
            </div>
          </div>

          <button onClick={closeSidebar}>
            <X size={22} />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-2">
          {navItems
            .filter((item) =>
              item.roles.includes(role)
            )
            .map(({ label, path, icon: Icon }) => (
              <NavLink
                key={`${label}-${path}`}
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-[#667CFA] text-white shadow-md"
                      : "text-gray-700 hover:bg-gray-100"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
        </nav>
      </div>
    </div>
  );
}

export default SideBar;