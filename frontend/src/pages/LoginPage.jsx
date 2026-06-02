import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import {
Mail,
Lock,
LogIn,
Eye,
EyeOff,
} from "lucide-react";

import { apiFetch } from "../utils/apiFetch";
import { API } from "../config/api";

const LoginPage = () => {
const { login, token } = useAuth();
const navigate = useNavigate();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [showPassword, setShowPassword] =
useState(false);

const [loading, setLoading] =
useState(false);

const [error, setError] = useState("");

useEffect(() => {
if (!token) return;


const role = localStorage.getItem("role");

switch (role) {
  case "admin":
    navigate("/dashboard", {
      replace: true,
    });
    break;

  case "manager":
    navigate("/dashboard", {
      replace: true,
    });
    break;

  case "client":
    navigate("/client/dashboard", {
      replace: true,
    });
    break;

  case "employee":
    navigate("/employee/dashboard", {
      replace: true,
    });
    break;

  default:
    navigate("/login");
}


}, [token, navigate]);

const handleLogin = async (e) => {
e.preventDefault();


setError("");
setLoading(true);

try {
  const data = await apiFetch(
    API.login,
    {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

  if (!data?.token) {
    throw new Error(
      "Token not received from server"
    );
  }

  login(data.token);

  const payload = JSON.parse(
    atob(data.token.split(".")[1])
  );

  switch (payload.role) {
    case "admin":
      navigate("/dashboard");
      break;

    case "manager":
      navigate("/dashboard");
      break;

    case "client":
      navigate("/client/dashboard");
      break;

    case "employee":
      navigate("/employee/dashboard");
      break;

    default:
      setError(
        "Sorry! You are not allowed to access this CRM. Please contact your administrator."
      );
  }
} catch (err) {
  setError(
    "Sorry! You are not allowed to access this CRM. Please contact your administrator."
  );
   setTimeout(() => {
    setError("");
  }, 1000);
}



};

return ( <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4"> <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">


    {/* Header */}

    <div className="bg-gradient-to-r from-[#566BEA] to-[#667CFA] p-8 text-center">
      <img
        src="/favicon.png"
        alt="logo"
        className="h-16 w-16 mx-auto mb-4"
      />

      <h1 className="text-3xl font-bold text-white">
        FlowClient
      </h1>

      <p className="text-indigo-100 mt-2">
        Access your CRM workspace
      </p>
    </div>

    {/* Form */}

    <form
      onSubmit={handleLogin}
      className="p-8 space-y-5"
    >
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Email Address
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            placeholder="Enter Email"
            className="w-full border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-[#566BEA] outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-700">
          Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            required
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            placeholder="Enter Password"
            className="w-full border rounded-xl py-3 pl-10 pr-12 focus:ring-2 focus:ring-[#566BEA] outline-none"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#566BEA] hover:bg-[#4f63e5] text-white font-semibold py-3 rounded-xl transition-all disabled:opacity-70"
      >
        {loading ? (
          "Checking Access..."
        ) : (
          <span className="flex items-center justify-center gap-2">
            <LogIn size={18} />
            Access CRM
          </span>
        )}
      </button>

      {error && (
        <div className="mt-4 border border-red-200 bg-red-50 text-red-600 rounded-xl p-4 text-center">
          <h3 className="font-bold text-red-700">
            Access Denied
          </h3>

          <p className="text-sm mt-1">
            Sorry! You are not allowed to access this CRM.
            Please contact your administrator.
          </p>
        </div>
      )}
    </form>
  </div>
</div>


);
};

export default LoginPage;
