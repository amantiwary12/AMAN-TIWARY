import React, { useState } from "react";
import { Link } from "react-router-dom";

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  background: "var(--surface-2)",
  border: "1px solid var(--border)",
  borderRadius: "10px",
  color: "var(--text)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s",
};

const Login = () => {
  const [form, setForm]           = useState({ username: "", password: "" });
  const [errors, setErrors]       = useState({});
  const [loading, setLoading]     = useState(false);
  const [showPass, setShowPass]   = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.username.trim()) errs.username = "Username is required";
    if (!form.password)         errs.password = "Password is required";
    else if (form.password.length < 6) errs.password = "At least 6 characters";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => setLoading(false), 1500);
  };

  const focusStyle = (e) => (e.currentTarget.style.borderColor = "rgba(238,91,46,0.6)");
  const blurStyle  = (e) => (e.currentTarget.style.borderColor = "var(--border)");

  return (
    <main
      className="min-h-screen flex items-center justify-center px-4 pt-20"
      style={{ background: "var(--bg)" }}
    >
      <div className="w-full max-w-md">
        {/* Card */}
        <div
          className="rounded-2xl p-8"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black text-white mx-auto mb-4"
              style={{ background: "linear-gradient(135deg,#ee5b2e,#e0b464)" }}
            >
              AT
            </span>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
              Sign in to your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                Username or Email
              </label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your username"
                style={{ ...inputStyle, borderColor: errors.username ? "#ef4444" : "var(--border)" }}
                onFocus={focusStyle}
                onBlur={blurStyle}
              />
              {errors.username && (
                <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: "var(--muted)" }}>
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={{ ...inputStyle, paddingRight: "44px", borderColor: errors.password ? "#ef4444" : "var(--border)" }}
                  onFocus={focusStyle}
                  onBlur={blurStyle}
                />
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--muted)" }}
                >
                  {showPass ? (
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs mt-1.5" style={{ color: "#ef4444" }}>{errors.password}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-2"
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-xs mt-6" style={{ color: "var(--muted)" }}>
            Don't have an account?{" "}
            <Link to="/" className="font-semibold" style={{ color: "#e0b464" }}>
              Go Home
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
