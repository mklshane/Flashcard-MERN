import express from "express";
import {
  signup,
  login,
  logout,
  sendVerifyOTP,
  verifyEmail,
  isAuthenticated,
  sendResetOTP,
  resetPassword,
} from "../controllers/auth.controller.js";
import userAuth from "../middleware/userAuth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);


// Still use userAuth for manual verification flow
router.post("/send-verify-otp", userAuth, sendVerifyOTP);
router.post("/verify-account", userAuth, verifyEmail);

// Changed to eitherAuth — any logged-in user should be able to check auth
router.post("/is-authenticated", userAuth, isAuthenticated);

// Public (no auth needed)
router.post("/send-reset-otp", sendResetOTP);
router.post("/reset-password", resetPassword);

// Changed to eitherAuth for general user check
router.get("/check", userAuth, (req, res) => {
  res.json({
    success: true,
    user: { id: req.userId },
  });
});

export default router;
