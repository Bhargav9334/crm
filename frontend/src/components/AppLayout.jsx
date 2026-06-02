// src/components/AppLayout.jsx
// FINAL WORKING VERSION
// This file reads user and token from localStorage and passes
// Name, Email, and Role to Navitems.
// Works with your backend response:
//
// {
//   "token": "...",
//   "user": {
//     "email": "admin@gmail.com",
//     "Name": "Admin"
//   }
// }

import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Navitems from "./Navitems";

const AppLayout = () => {
  const [currentUser, setCurrentUser] = useState({
    Name: "Loading...",
    email: "Loading...",
    role: "User",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = () => {
      setLoading(true);

      try {
        // ==========================================
        // Get user and token from localStorage
        // ==========================================
        const userString = localStorage.getItem("user");
        const token = localStorage.getItem("token");

        // Default values
        let Name = "Loading...";
        let email = "Loading...";
        let role = "User";

        // ==========================================
        // Get Name and Email from localStorage user
        // ==========================================
        if (userString) {
          try {
            const user = JSON.parse(userString);

            Name =
              user?.Name ||
              user?.name ||
              user?.fullName ||
              "Unknown User";

            email =
              user?.email ||
              user?.Email ||
              "No Email Found";
          } catch (error) {
            console.error("Error parsing user:", error);
          }
        }

        // ==========================================
        // Decode JWT Token to get role + fallback email
        // ==========================================
        if (token) {
          try {
            const payloadBase64 = token.split(".")[1];

            // Convert Base64URL to Base64
            const normalized = payloadBase64
              .replace(/-/g, "+")
              .replace(/_/g, "/");

            const payload = JSON.parse(atob(normalized));

            // Get role from token
            if (payload?.role) {
              role =
                payload.role.charAt(0).toUpperCase() +
                payload.role.slice(1);
            }

            // Fallback email from token
            if (
              (email === "Loading..." ||
                email === "No Email Found") &&
              payload?.email
            ) {
              email = payload.email;
            }

            // Fallback Name from email
            if (
              (Name === "Loading..." ||
                Name === "Unknown User") &&
              payload?.email
            ) {
              Name =
                payload.email.split("@")[0]
                  .charAt(0)
                  .toUpperCase() +
                payload.email
                  .split("@")[0]
                  .slice(1);
            }
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }

        // ==========================================
        // Update state
        // ==========================================
        setCurrentUser({
          Name,
          email,
          role,
        });
      } catch (error) {
        console.error("Error loading user data:", error);

        setCurrentUser({
          Name: "Unknown User",
          email: "No Email Found",
          role: "User",
        });
      } finally {
        setLoading(false);
      }
    };

    // Load user data when component mounts
    getUserData();

    // Listen for updates after login:
    // window.dispatchEvent(new Event("userUpdated"));
    window.addEventListener("userUpdated", getUserData);

    // Listen for storage changes in other tabs
    window.addEventListener("storage", getUserData);

    // Cleanup
    return () => {
      window.removeEventListener("userUpdated", getUserData);
      window.removeEventListener("storage", getUserData);
    };
  }, []);

  return (
    <>
      {/* Pass data to Navitems */}
      <Navitems
        currentUser={currentUser}
        loading={loading}
      />

      {/* Main Page Content */}
      <main className="pt-24">
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;