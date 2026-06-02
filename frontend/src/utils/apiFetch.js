export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const res = await fetch(endpoint, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  let data = null;

  try {
    data = await res.json();
  } catch {}

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    window.location.href = "/login";
    return;
  }

  if (!res.ok) {
    throw new Error(data?.message || "API error");
  }

  return data;
};