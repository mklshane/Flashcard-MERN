import express from "express";
import {signup, login, logout, sendVerifyOTP, verifyEmail, isAuthenticated, sendResetOTP, resetPassword} from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/send-verify-otp", userAuth, sendVerifyOTP);

router.post("/verify-account", userAuth, verifyEmail);

router.post("/is-authenticated", userAuth,isAuthenticated);

router.post("/send-reset-otp", sendResetOTP);

router.post("/reset-password", resetPassword);

export default router;