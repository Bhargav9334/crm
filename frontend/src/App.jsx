import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";

// Pages
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Project from "./pages/Project";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Files from "./pages/Files";
import Proposals from "./pages/Proposals";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";
import Onboarding from "./pages/Onboarding";
import TodoList from "./pages/TodoList";
import AddManager from "./pages/AddManager";
import LoginPage from "./pages/LoginPage";
import EmployeeProfile from "./pages/EmployeeProfile";
import ClientProfile from "./pages/ClientProfile";
import EmployeeProjects from "./pages/EmployeeProjects";

// Dashboards
import ClientDashboard from "./pages/ClientDashboard";

import EmployeeDashboard from "./pages/EmployeeDashboard";

function App() {
  const managerAccess = ["admin", "manager"];
  const adminOnly = ["admin"];
  const clientOnly = ["client"];
  const employeeOnly = ["employee"];

  return (
    <AuthProvider>
      <Router
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        <Routes>

          {/* Login */}
          <Route
            path="/login"
            element={<LoginPage />}
          />

          {/* Root */}
          <Route
            path="/"
            element={<Navigate to="/login" replace />}
          />

          {/* Protected Layout */}
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >

            {/* ================= ADMIN + MANAGER ================= */}

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/clients"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Clients />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Employees />
                </ProtectedRoute>
              }
            />

            <Route
              path="/project"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Project />
                </ProtectedRoute>
              }
            />

            <Route
              path="/invoices"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Invoices />
                </ProtectedRoute>
              }
            />

            <Route
              path="/proposals"
              element={
                <ProtectedRoute
                  allowedRoles={managerAccess}
                >
                  <Proposals />
                </ProtectedRoute>
              }
            />

            {/* ================= ADMIN ONLY ================= */}

            <Route
              path="/reports"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <Reports />
                </ProtectedRoute>
              }
            />

            <Route
              path="/files"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <Files />
                </ProtectedRoute>
              }
            />

            <Route
              path="/addmanager"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <AddManager />
                </ProtectedRoute>
              }
            />

            <Route
              path="/onboarding"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <Onboarding />
                </ProtectedRoute>
              }
            />

            <Route
              path="/messages"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <Messages />
                </ProtectedRoute>
              }
            />

            <Route
              path="/contact"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <Contact />
                </ProtectedRoute>
              }
            />

            <Route
              path="/todolist"
              element={
                <ProtectedRoute
                  allowedRoles={adminOnly}
                >
                  <TodoList />
                </ProtectedRoute>
              }
            />

            {/* ================= CLIENT ================= */}

            <Route
              path="/client/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={clientOnly}
                >
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
  path="/client/profile"
  element={
    <ProtectedRoute
      allowedRoles={["client"]}
    >
      <ClientProfile />
    </ProtectedRoute>
  }
/>

            {/* ================= EMPLOYEE ================= */}

            <Route
              path="/employee/dashboard"
              element={
                <ProtectedRoute
                  allowedRoles={employeeOnly}
                >
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
  path="/employee/profile"
  element={
    <ProtectedRoute
      allowedRoles={["employee"]}
    >
      <EmployeeProfile />
    </ProtectedRoute>
  }
/>
<Route
  path="/employee/projects"
  element={<EmployeeProjects />}
/>

          </Route>

          {/* Fallback */}
          <Route
            path="*"
            element={
              <Navigate
                to="/login"
                replace
              />
            }
          />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;