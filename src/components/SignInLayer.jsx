import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

const SignInLayer = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch (error) {
      const data = error.response?.data;
      if (data?.errors) {
        Object.values(data.errors)
          .flat()
          .forEach((message) => toast.error(message));
      } else if (error.response?.status === 429) {
        toast.error("Too many login attempts. Please try again later.");
      } else if (error.response?.status === 401) {
        toast.error(data?.message || "Incorrect email or password.");
      } else if (!error.response && error.request) {
        toast.error("Cannot connect to the server. Please try again.");
      } else {
        toast.error(data?.message || error.message || "Unable to sign in.");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth bg-base d-flex flex-wrap">
      <div className="auth-left d-lg-block d-none">
        <div className="d-flex align-items-center flex-column h-100 justify-content-center">
          <img src="assets/images/auth/auth-img.png" alt="WowDash React Vite" />
        </div>
      </div>
      <div className="auth-right py-32 px-24 d-flex flex-column justify-content-center">
        <div className="max-w-464-px mx-auto w-100">
          <div>
            <Link to="/" className="mb-40 max-w-290-px">
              <img src="assets/images/logo.png" alt="WowDash React Vite" />
            </Link>
            <h4 className="mb-12">Sign In to your Account</h4>
            <p className="mb-32 text-secondary-light text-lg">
              Welcome back! please enter your detail
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="icon-field mb-16">
              <span className="icon top-50 translate-middle-y">
                <Icon icon="mage:email" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="username"
                className="form-control h-56-px bg-neutral-50 radius-12"
                placeholder="Email"
                required
              />
            </div>
            <div className="position-relative mb-20">
              <div className="icon-field">
                <span className="icon top-50 translate-middle-y">
                  <Icon icon="solar:lock-password-outline" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control h-56-px bg-neutral-50 radius-12"
                  id="your-password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  placeholder="Password"
                  required
                />
              </div>
              <button
                type="button"
                className="toggle-password position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light bg-transparent border-0 p-0"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                aria-pressed={showPassword}
              >
                <Icon
                  icon={
                    showPassword
                      ? "solar:eye-closed-outline"
                      : "solar:eye-outline"
                  }
                />
              </button>
            </div>
            <div className="">
              <div className="d-flex justify-content-between gap-2">
                <div className="form-check style-check d-flex align-items-center">
                  <input
                    className="form-check-input border border-neutral-300"
                    type="checkbox"
                    defaultValue=""
                    id="remeber"
                  />
                  <label className="form-check-label" htmlFor="remeber">
                    Remember me{" "}
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-primary-600 fw-medium"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary text-sm btn-sm px-12 py-16 w-100 radius-12 mt-32"
            >
              {" "}
              {submitting ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInLayer;
