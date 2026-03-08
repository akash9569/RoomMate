import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import "./AuthModal.css";

// Icons
const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const HomeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const AuthModal = ({ show, handleClose, isLogin, onSwitch, onLoginSuccess }) => {
  const { login } = useAuth();

  // ---- View states: login | register | forgot-password | verify-otp | reset-password ----
  const [view, setView] = useState(isLogin ? "login" : "register");

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  // OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);
  const [otpTimer, setOtpTimer] = useState(0);
  const timerRef = useRef(null);

  // Messages
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Reset on modal open
  useEffect(() => {
    if (show) {
      setView(isLogin ? "login" : "register");
      setError("");
      setSuccessMsg("");
      setOtp(["", "", "", "", "", ""]);
      setPassword("");
      setConfirmPassword("");
      clearInterval(timerRef.current);
      setOtpTimer(0);
    }
    return () => clearInterval(timerRef.current);
  }, [show, isLogin]);

  // OTP countdown
  const startTimer = () => {
    setOtpTimer(600); // 10 minutes
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) { clearInterval(timerRef.current); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const formatTimer = (s) => `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;

  // OTP input handlers
  const handleOtpChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return;
    const newOtp = [...otp];
    newOtp[idx] = val.slice(-1);
    setOtp(newOtp);
    if (val && idx < 5) otpRefs.current[idx + 1]?.focus();
  };

  const handleOtpKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      otpRefs.current[idx - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => { newOtp[i] = char; });
    setOtp(newOtp);
    otpRefs.current[Math.min(pasted.length, 5)]?.focus();
  };

  const getOtpValue = () => otp.join("");

  // ---- Submit handler ----
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setLoading(true);

    try {
      // LOGIN / REGISTER
      if (view === "login" || view === "register") {
        const endpoint = view === "login" ? "/api/auth/login" : "/api/auth/register";
        const payload = view === "login" ? { email, password } : { name, email, password, role };

        const res = await fetch(`http://localhost:3000${endpoint}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();

        if (res.ok) {
          login(data, data.token);
          if (onLoginSuccess) onLoginSuccess(true);
          handleClose();
        } else {
          setError(data.message || "Something went wrong");
        }

        // STEP 1: Send OTP
      } else if (view === "forgot-password") {
        const res = await fetch("http://localhost:3000/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const data = await res.json();

        if (res.ok) {
          setSuccessMsg("OTP sent! Check your email inbox.");
          startTimer();
          setView("verify-otp");
        } else {
          setError(data.message || "Something went wrong");
        }

        // STEP 2: Verify OTP
      } else if (view === "verify-otp") {
        const enteredOtp = getOtpValue();
        if (enteredOtp.length < 6) {
          setError("Please enter all 6 digits.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: enteredOtp }),
        });
        const data = await res.json();

        if (res.ok) {
          clearInterval(timerRef.current);
          setSuccessMsg("OTP verified! Now set your new password.");
          setView("reset-password");
        } else {
          setError(data.message || "Invalid OTP");
        }

        // STEP 3: Reset Password
      } else if (view === "reset-password") {
        if (password !== confirmPassword) {
          setError("Passwords do not match.");
          setLoading(false);
          return;
        }
        if (password.length < 8) {
          setError("Password must be at least 8 characters.");
          setLoading(false);
          return;
        }

        const res = await fetch("http://localhost:3000/api/auth/reset-password", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: getOtpValue(), password }),
        });
        const data = await res.json();

        if (res.ok) {
          setSuccessMsg("Password reset successfully! Redirecting to login...");
          setOtp(["", "", "", "", "", ""]);
          setPassword("");
          setConfirmPassword("");
          setTimeout(() => {
            setView("login");
            setSuccessMsg("");
          }, 2000);
        } else {
          setError(data.message || "Something went wrong");
        }
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setError("Failed to connect to server. Ensure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Resend OTP ----
  const handleResendOtp = async () => {
    setError("");
    setSuccessMsg("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtp(["", "", "", "", "", ""]);
        setSuccessMsg("A new OTP has been sent to your email!");
        startTimer();
      } else {
        setError(data.message);
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Modal title ----
  const getTitle = () => {
    if (view === "login") return "Welcome Back";
    if (view === "register") return "Create Account";
    if (view === "forgot-password") return "Forgot Password";
    if (view === "verify-otp") return "Verify OTP";
    if (view === "reset-password") return "New Password";
  };

  const getButtonLabel = () => {
    if (loading) return "Processing...";
    if (view === "login") return "Sign In";
    if (view === "register") return "Create Account";
    if (view === "forgot-password") return "Send OTP";
    if (view === "verify-otp") return "Verify OTP";
    return "Reset Password";
  };

  return (
    <Modal show={show} onHide={handleClose} centered contentClassName="auth-modal-content">
      <Modal.Header closeButton className="auth-modal-header">
        <Modal.Title className="auth-modal-title">{getTitle()}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="auth-modal-body">
        {error && <Alert variant="danger" className="py-2">{error}</Alert>}
        {successMsg && <Alert variant="success" className="py-2">{successMsg}</Alert>}

        <Form onSubmit={handleSubmit}>

          {/* ---- REGISTER: Name + Role ---- */}
          {view === "register" && (
            <>
              <Form.Group className="custom-input-group">
                <Form.Label className="custom-input-label">Full Name</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="text"
                  placeholder="e.g. Akash Singh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <div className="mb-4">
                <label className="role-selector-label">I want to...</label>
                <div className="role-options">
                  <label className="role-card">
                    <input type="radio" name="role" value="user" checked={role === "user"} onChange={(e) => setRole(e.target.value)} />
                    <div className="role-card-inner">
                      <div className="role-icon"><UserIcon /></div>
                      <div className="role-text">Find a Room</div>
                      <span className="role-subtext">Browse listings</span>
                    </div>
                  </label>
                  <label className="role-card">
                    <input type="radio" name="role" value="member" checked={role === "member"} onChange={(e) => setRole(e.target.value)} />
                    <div className="role-card-inner">
                      <div className="role-icon"><HomeIcon /></div>
                      <div className="role-text">List a Room</div>
                      <span className="role-subtext">Post your property</span>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          {/* ---- EMAIL (login / register / forgot-password) ---- */}
          {(view === "login" || view === "register" || view === "forgot-password") && (
            <Form.Group className="custom-input-group">
              <Form.Label className="custom-input-label">Email Address</Form.Label>
              <Form.Control
                className="custom-input"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {/* ---- FORGOT PASSWORD: Description ---- */}
          {view === "forgot-password" && (
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #9ca3af)", marginBottom: "1rem", marginTop: "-0.5rem" }}>
              We'll send a 6-digit OTP to your email. It expires in 10 minutes.
            </p>
          )}

          {/* ---- PASSWORD (login / register) ---- */}
          {(view === "login" || view === "register") && (
            <Form.Group className="custom-input-group">
              <Form.Label className="custom-input-label">Password</Form.Label>
              <Form.Control
                className="custom-input"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
          )}

          {/* ---- FORGOT PASSWORD LINK ---- */}
          {view === "login" && (
            <div className="text-end mb-3">
              <span
                className="auth-switch-link"
                style={{ fontSize: "0.85rem", cursor: "pointer" }}
                onClick={() => { setView("forgot-password"); setError(""); setSuccessMsg(""); }}
              >
                Forgot Password?
              </span>
            </div>
          )}

          {/* ---- OTP INPUT (verify-otp) ---- */}
          {view === "verify-otp" && (
            <div style={{ marginBottom: "1.5rem" }}>
              <p style={{ fontSize: "0.85rem", color: "var(--text-muted, #9ca3af)", marginBottom: "1.25rem" }}>
                Enter the 6-digit code sent to <strong style={{ color: "#06b6d4" }}>{email}</strong>
              </p>

              {/* OTP Boxes */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "center", marginBottom: "1rem" }} onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => (otpRefs.current[idx] = el)}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    style={{
                      width: "48px",
                      height: "56px",
                      textAlign: "center",
                      fontSize: "1.5rem",
                      fontWeight: "700",
                      borderRadius: "12px",
                      border: digit ? "2px solid #06b6d4" : "2px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#fff",
                      outline: "none",
                      transition: "border-color 0.2s",
                    }}
                  />
                ))}
              </div>

              {/* Timer + Resend */}
              <div style={{ textAlign: "center", fontSize: "0.82rem", color: "var(--text-muted, #9ca3af)" }}>
                {otpTimer > 0 ? (
                  <span>Code expires in <strong style={{ color: "#06b6d4" }}>{formatTimer(otpTimer)}</strong></span>
                ) : (
                  <span>
                    Code expired.{" "}
                    <span
                      onClick={handleResendOtp}
                      style={{ color: "#06b6d4", cursor: "pointer", textDecoration: "underline" }}
                    >
                      Resend OTP
                    </span>
                  </span>
                )}
              </div>
            </div>
          )}

          {/* ---- NEW PASSWORD (reset-password) ---- */}
          {view === "reset-password" && (
            <>
              <Form.Group className="custom-input-group">
                <Form.Label className="custom-input-label">New Password</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="custom-input-group">
                <Form.Label className="custom-input-label">Confirm Password</Form.Label>
                <Form.Control
                  className="custom-input"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}

          {/* ---- SUBMIT BUTTON ---- */}
          <Button type="submit" className="w-100 auth-btn" disabled={loading}>
            {getButtonLabel()}
          </Button>

          {/* ---- BOTTOM NAVIGATION ---- */}
          <div className="text-center mt-4 auth-switch-text">
            {view === "login" && (
              <>
                New to RoomMate?{" "}
                <span className="auth-switch-link" onClick={() => setView("register")}>Create an account</span>
              </>
            )}
            {view === "register" && (
              <>
                Already have an account?{" "}
                <span className="auth-switch-link" onClick={() => setView("login")}>Sign in</span>
              </>
            )}
            {(view === "forgot-password" || view === "verify-otp" || view === "reset-password") && (
              <span className="auth-switch-link" onClick={() => { setView("login"); setError(""); setSuccessMsg(""); clearInterval(timerRef.current); }}>
                ← Back to Sign in
              </span>
            )}
          </div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
