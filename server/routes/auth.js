import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({
            name,
            email,
            password,
            role: role || "user",
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                aadhar: user.aadhar,
                profilePicture: user.profilePicture,
                pushNotifications: user.pushNotifications !== undefined ? user.pushNotifications : true,
                emailNotifications: user.emailNotifications !== undefined ? user.emailNotifications : true,
                favorites: user.favorites,
                isAdmin: user.isAdmin,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log("Login attempt for:", email);
        console.log("User found:", user);

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                location: user.location,
                aadhar: user.aadhar,
                profilePicture: user.profilePicture,
                pushNotifications: user.pushNotifications !== undefined ? user.pushNotifications : true,
                emailNotifications: user.emailNotifications !== undefined ? user.emailNotifications : true,
                favorites: user.favorites,
                isAdmin: user.isAdmin,
                role: user.role,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: "Invalid email or password" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
router.get("/profile", async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id).select("-password").populate("favorites");

            res.json(user);
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});
// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put("/profile", async (req, res) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);

            if (user) {
                user.name = req.body.name || user.name;
                user.email = req.body.email || user.email;
                user.phone = req.body.phone || user.phone;
                user.location = req.body.location || user.location;
                user.aadhar = req.body.aadhar || user.aadhar;
                if (req.body.profilePicture !== undefined) {
                    user.profilePicture = req.body.profilePicture;
                }
                if (req.body.pushNotifications !== undefined) {
                    user.pushNotifications = req.body.pushNotifications;
                }
                if (req.body.emailNotifications !== undefined) {
                    user.emailNotifications = req.body.emailNotifications;
                }

                if (req.body.password) {
                    user.password = req.body.password;
                }

                const updatedUser = await user.save();

                res.json({
                    _id: updatedUser._id,
                    name: updatedUser.name,
                    email: updatedUser.email,
                    phone: updatedUser.phone,
                    location: updatedUser.location,
                    aadhar: updatedUser.aadhar,
                    profilePicture: updatedUser.profilePicture,
                    pushNotifications: updatedUser.pushNotifications,
                    emailNotifications: updatedUser.emailNotifications,
                    favorites: updatedUser.favorites,
                    isAdmin: updatedUser.isAdmin,
                    token: generateToken(updatedUser._id),
                });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    if (!token) {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

// @desc    Delete user account
// @route   DELETE /api/auth/profile
// @access  Private
router.delete("/profile", async (req, res) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const user = await User.findById(decoded.id);
            if (user) {
                await user.deleteOne();
                res.status(200).json({ message: "Account deleted successfully" });
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

// @desc    Add listing to favorites
// @route   PUT /api/auth/favorites/:listingId
// @access  Private
router.put("/favorites/:listingId", async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const listingId = req.params.listingId;

            const updatedUser = await User.findByIdAndUpdate(
                decoded.id,
                { $addToSet: { favorites: listingId } },
                { new: true }
            ).populate("favorites");

            if (updatedUser) {
                res.json(updatedUser.favorites);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error adding favorite:", error);
            res.status(500).json({ message: "Failed to update favorites" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

// @desc    Remove listing from favorites
// @route   DELETE /api/auth/favorites/:listingId
// @access  Private
router.delete("/favorites/:listingId", async (req, res) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            const listingId = req.params.listingId;

            const updatedUser = await User.findByIdAndUpdate(
                decoded.id,
                { $pull: { favorites: listingId } },
                { new: true }
            ).populate("favorites");

            if (updatedUser) {
                res.json(updatedUser.favorites);
            } else {
                res.status(404).json({ message: "User not found" });
            }
        } catch (error) {
            console.error("Error removing favorite:", error);
            res.status(500).json({ message: "Failed to update favorites" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
});

// ====================== OTP FORGOT PASSWORD ======================

// Nodemailer transporter — created lazily so env vars are always resolved at call time
const getTransporter = () => nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Helper: generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Beautiful OTP Email HTML Template
const otpEmailTemplate = (name, otp) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RoomMate OTP</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    body { margin: 0; padding: 0; background: #0a0a0a; font-family: 'Inter', Arial, sans-serif; }
    .wrapper { max-width: 580px; margin: 40px auto; background: #111827; border-radius: 20px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08); }
    .hero { background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); padding: 48px 40px 36px; text-align: center; }
    .logo { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px; }
    .logo-icon { width: 44px; height: 44px; background: rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; }
    .logo-text { font-size: 22px; font-weight: 800; color: #fff; letter-spacing: -0.5px; }
    .hero-title { font-size: 28px; font-weight: 800; color: #fff; margin: 0 0 8px; }
    .hero-sub { font-size: 15px; color: rgba(255,255,255,0.8); margin: 0; }
    .body { padding: 40px; }
    .greeting { font-size: 16px; color: #e5e7eb; margin-bottom: 8px; }
    .message { font-size: 15px; color: #9ca3af; line-height: 1.6; margin-bottom: 32px; }
    .otp-box { background: linear-gradient(135deg, rgba(6,182,212,0.1), rgba(139,92,246,0.1)); border: 1px solid rgba(6,182,212,0.3); border-radius: 16px; padding: 32px; text-align: center; margin-bottom: 32px; }
    .otp-label { font-size: 12px; font-weight: 600; color: #06b6d4; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 16px; }
    .otp-code { font-size: 52px; font-weight: 800; letter-spacing: 12px; color: #fff; background: linear-gradient(135deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; margin: 0; }
    .otp-expiry { font-size: 13px; color: #6b7280; margin-top: 12px; }
    .divider { height: 1px; background: rgba(255,255,255,0.08); margin: 32px 0; }
    .warning-box { background: rgba(251,191,36,0.08); border: 1px solid rgba(251,191,36,0.2); border-radius: 12px; padding: 16px 20px; }
    .warning-title { font-size: 13px; font-weight: 600; color: #fbbf24; margin-bottom: 6px; }
    .warning-text { font-size: 13px; color: #9ca3af; line-height: 1.5; margin: 0; }
    .footer { background: #0d1117; padding: 24px 40px; text-align: center; }
    .footer-text { font-size: 13px; color: #4b5563; line-height: 1.6; }
    .footer-brand { color: #06b6d4; font-weight: 600; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="hero">
      <div class="logo">
        <span class="logo-text">🏠 RoomMate</span>
      </div>
      <h1 class="hero-title">Verify Your Identity</h1>
      <p class="hero-sub">One-Time Password for password reset</p>
    </div>
    <div class="body">
      <p class="greeting">Hi <strong>${name || 'there'}</strong> 👋</p>
      <p class="message">We received a request to reset your password. Use the OTP below to verify your identity. This code is valid for <strong>10 minutes</strong>.</p>
      <div class="otp-box">
        <div class="otp-label">Your One-Time Password</div>
        <div class="otp-code">${otp}</div>
        <div class="otp-expiry">⏱ Expires in 10 minutes</div>
      </div>
      <div class="warning-box">
        <div class="warning-title">⚠️ Security Notice</div>
        <p class="warning-text">If you did not request this, please ignore this email. Your password will remain unchanged. Never share this code with anyone.</p>
      </div>
      <div class="divider"></div>
      <p style="font-size: 14px; color: #6b7280; text-align: center; margin: 0;">Having trouble? Contact us at <a href="mailto:room25mate@gmail.com" style="color: #06b6d4;">room25mate@gmail.com</a></p>
    </div>
    <div class="footer">
      <p class="footer-text">&copy; 2025 <span class="footer-brand">RoomMate</span>. All rights reserved.<br>Find your perfect roommate, safely and smartly.</p>
    </div>
  </div>
</body>
</html>
`;

// @desc    Send OTP to email for password reset
// @route   POST /api/auth/forgot-password
// @access  Public
router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "No account found with that email address." });
        }

        const otp = generateOTP();
        user.otpCode = otp;
        user.otpExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        await user.save({ validateBeforeSave: false });

        const mailOptions = {
            from: `"RoomMate" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "\uD83D\uDD10 Your RoomMate Password Reset OTP",
            html: otpEmailTemplate(user.name, otp),
        };

        await getTransporter().sendMail(mailOptions);

        res.status(200).json({ success: true, message: "OTP sent to your email address." });
    } catch (error) {
        console.error("Forgot password error:", error.message || error);
        res.status(500).json({ message: "Failed to send OTP. Please check your server configuration." });
    }
});

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
router.post("/verify-otp", async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({
            email,
            otpCode: otp,
            otpExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP. Please try again." });
        }

        res.status(200).json({ success: true, message: "OTP verified successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Reset Password (after OTP verified)
// @route   PUT /api/auth/reset-password
// @access  Public
router.put("/reset-password", async (req, res) => {
    const { email, otp, password } = req.body;
    try {
        const user = await User.findOne({
            email,
            otpCode: otp,
            otpExpire: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: "OTP expired or invalid. Please restart the process." });
        }

        user.password = password;
        user.otpCode = undefined;
        user.otpExpire = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "Password reset successful! Please log in." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
