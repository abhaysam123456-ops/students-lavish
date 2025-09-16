import React, { useState } from "react";
import { Building2 } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

const API_BASE = "https://bedd.in/backend"; // change if backend is elsewhere

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!credentials.email || !credentials.password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
        body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const text = await res.text();
      let data: any;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("Expected JSON from login.php, got:", text);
        throw new Error("Server returned invalid response");
      }

      console.log("login.php response:", data);

      if (!data || !data.success) {
        const msg = data?.message || data?.error || "Invalid email or password";
        setError(msg);
        setLoading(false);
        return;
      }

      const user = data.user;
      if (!user) {
        setError("Server did not return user object");
        setLoading(false);
        return;
      }

      // Remove any sensitive fields
      if (user.password) delete user.password;

      // store the full user object (so other components can read it)
      localStorage.setItem("lv_current_user", JSON.stringify(user));

      // dispatch event so other components update without reload
      window.dispatchEvent(new CustomEvent("lv_user_changed", { detail: { user } }));

      console.log("Stored user data:", user);

      setLoading(false);
      // call the parent callback (routing / UI state)
      onLogin();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Network/server error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="bg-blue-600 p-3 rounded-full">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Welcome to bedd.in</h2>
          <p className="mt-2 text-sm text-gray-600">Student Dashboard Login</p>
        </div>

        <form className="mt-8 space-y-6 bg-white p-6 rounded shadow-sm" onSubmit={handleSubmit}>
          {error && <div className="text-sm text-red-600">{error}</div>}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="student@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="text-center">
            <p className="text-xs text-gray-500">(Use credentials from your DB to login)</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
