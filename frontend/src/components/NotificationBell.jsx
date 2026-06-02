import { useEffect, useRef, useState } from "react";
import {
  Bell,
  CheckCheck,
  Loader2,
  X,
} from "lucide-react";

import { apiFetch } from "../utils/apiFetch";
import { API } from "../config/api";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  const dropdownRef = useRef(null);

  // Fetch Notifications
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const data = await apiFetch(API.notifications);

      setNotifications(data || []);
    } catch (err) {
      console.error("Notification fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Open Dropdown
  const handleOpen = () => {
    setOpen((prev) => !prev);

    if (!open) {
      fetchNotifications();
    }
  };

  // Mark Single Notification as Read
  const markAsRead = async (id) => {
    try {
      await apiFetch(`${API.notifications}/${id}/read`, {
        method: "PATCH",
      });

      setNotifications((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isRead: true }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  // Mark All as Read
  const markAllAsRead = () => {
  setNotifications((prev) =>
    prev.map((item) => ({
      ...item,
      isRead: true,
    }))
  );
};

  // Close Dropdown on Outside Click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // Unread Count
  const unreadCount = notifications.filter(
    (item) => !item.isRead
  ).length;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={handleOpen}
        className="relative p-2 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <Bell
          size={22}
          className="text-gray-700"
        />

        {/* Badge */}
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1
            rounded-full bg-red-500 text-white text-xs
            flex items-center justify-center font-semibold
            animate-pulse"
          >
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute right-0 mt-3 w-[360px]
          bg-white rounded-2xl shadow-2xl border
          border-gray-100 overflow-hidden z-50"
        >
          {/* Header */}
          <div
            className="flex items-center justify-between
            px-5 py-4 border-b bg-gradient-to-r
            from-[#566BEA] to-[#667CFA]"
          >
            <h2 className="text-white font-semibold text-lg">
              Notifications
            </h2>

            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Action */}
          {notifications.length > 0 && (
            <div className="px-4 py-3 border-b bg-gray-50">
              <button
                onClick={markAllAsRead}
                className="flex items-center gap-2
                text-sm text-[#566BEA] font-medium
                hover:underline"
              >
                <CheckCheck size={16} />
                Mark all as read
              </button>
            </div>
          )}

          {/* Body */}
          <div className="max-h-[450px] overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2
                  size={24}
                  className="animate-spin text-[#566BEA]"
                />
              </div>
            ) : notifications.length === 0 ? (
              <div className="text-center py-12 px-4">
                <Bell
                  size={38}
                  className="mx-auto text-gray-300 mb-3"
                />

                <p className="text-gray-500 text-sm">
                  No notifications available
                </p>
              </div>
            ) : (
              <div className="divide-y">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() =>
                      markAsRead(item.id)
                    }
                    className={`p-4 cursor-pointer transition-all duration-200
                    hover:bg-gray-50 ${
                      !item.isRead
                        ? "bg-blue-50"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {/* Dot */}
                      {!item.isRead && (
                        <div
                          className="w-2 h-2 rounded-full
                          bg-[#566BEA] mt-2"
                        />
                      )}

                      <div className="flex-1">
                        <h3
                          className={`text-sm ${
                            !item.isRead
                              ? "font-semibold text-gray-800"
                              : "font-medium text-gray-700"
                          }`}
                        >
                          {item.title}
                        </h3>

                                <p className="text-sm text-gray-500 mt-1">
                                    {item.message}
                                </p>

                                <p className="text-xs text-gray-400 mt-2">
                                    {(() => {
                                        const createdAt = item.createdAt;

                                        if (!createdAt) {
                                            return "Date not available";
                                        }

                                        try {
                                            let date;

                                            // Firestore Timestamp from frontend SDK
                                            // Example: { seconds: 1716100000, nanoseconds: 0 }
                                            if (typeof createdAt.seconds === "number") {
                                                date = new Date(createdAt.seconds * 1000);
                                            }

                                            // Firestore Timestamp from Admin SDK when serialized
                                            // Example: { _seconds: 1716100000, _nanoseconds: 0 }
                                            else if (typeof createdAt._seconds === "number") {
                                                date = new Date(createdAt._seconds * 1000);
                                            }

                                            // Firestore Timestamp object with toDate() method
                                            else if (typeof createdAt.toDate === "function") {
                                                date = createdAt.toDate();
                                            }

                                            // ISO string or normal date string
                                            else {
                                                date = new Date(createdAt);
                                            }

                                            // Validate date
                                            if (isNaN(date.getTime())) {
                                                return "Date not available";
                                            }

                                            // Format for Indian locale
                                            return date.toLocaleString("en-IN", {
                                                dateStyle: "medium",
                                                timeStyle: "short",
                                            });
                                        } catch (error) {
                                            console.error("Date formatting error:", error, createdAt);
                                            return "Date not available";
                                        }
                                    })()}
                                </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;