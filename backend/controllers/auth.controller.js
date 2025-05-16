import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // default import
import User from "../models/user.model.js";
import transporter from "../config/node.mailer.js";

const { JsonWebTokenError } = jwt; // destructure after import

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "Incomplete details." });
  }

  try {
    const existingUser = await User.findOne({email});
    if(existingUser){
      return res.json({success:false, message: "User already exists."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({email,password:hashedPassword, name});
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'});

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    //Sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: 'Welcome to WeFlash',
      text: `Welcome to WeFlash website. Your account has been created with email id: ${email}`
    }

    await transporter.sendMail(mailOptions);

    return res.json({ success: true });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      // Use proper status code
      success: false,
      message: "Email and password are required",
    });
  }

  try {
    // Find user with case-insensitive email
    const user = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });

    if (!user) {
      return res.status(401).json({
        // Use 401 for auth failures
        success: false,
        message: "Invalid credentials", // Generic message for security
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials", // Same message as above
      });
    }

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set secure cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: "/", // Important for cookie accessibility
      domain: process.env.COOKIE_DOMAIN, // If using cross-domain cookies
    });

    // Return minimal user info
    return res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({success:true, message: "Logged Out"});

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const sendVerifyOTP = async (req, res) => {
  try {
    
    const {userId} = req.body;
    const user = await User.findById(userId);

    if(user.isVerified){
      return res.json({success: false, message: "account already verified."});
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.verifyOtp = otp;
    user.verifyOtpExpiresAt = Date.now() + 24 * 60 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOption);

    res.json({success: true, message: 'Verification OTP sent on Email.'});

  } catch (error) {
    res.json({success: false, message: error.message});
  }
};

// Verify Email using OTP
export const verifyEmail = async (req, res) => {
  const { userId, otp} = req.body;

  if(!userId || !otp) {
    return res.json({ success: false, message: "Missing Details." });
  }

  try {
    
    const user = await User.findById(userId);

    if(!user){
      return res.json({success: false, message: "User not found."});
    }

    if (!user.verifyOtp || user.verifyOtp.trim() !== otp.trim()) {
      return res.json({ success: false, message: "Invalid OTP" });
    }


    if(user.verifyOtpExpiresAt < Date.now()){
      return res.json ({ success: false, message: "OTP expired." });
    }

    user.isVerified = true;
    user.verifyOtp = ' ';
    user.verifyOtpExpiresAt = 0;

    await user.save();
    return res.json ({ success: true, message: "Email verified successfully." });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    res.json({ success: true });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// Send password reset OTP
export const sendResetOTP = async (req,res) => {
  const {email} = req.body;

  if(!email){
    return res.json({success: false, message: 'Email is required.'})
  }

  try {
    const user = await User.findOne({email});
    if(!user){
      return res.json({ success: false, message: 'User not found.' });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpiresAt = Date.now() + 15 * 60 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting your password is ${otp}. 
      Use this OTP to proceed with resetting your password.`,
    };
    await transporter.sendMail(mailOption);
    return res.json({success: true, message: 'OTP sent to your email.'});

  } catch (error) {
    return res.json({ success: false, message: error.message});
  }
}

// Reset User Password
export const resetPassword = async (req,res)=>{
  const {email, otp, newPassword} = req.body;

  if(!email || !otp || !newPassword){
    return res.json({ success: false, message: 'Email, OTP, and new password are required.' });
  }

  try {
    
    const user = await User.findOne({email});
    if(!user){
      return res.json({ success: false, message: 'User not found.' });
    }

    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({ success: false, message: 'Invalid OTP.' });
    }

    if(user.resetOtpExpiresAt < Date.now()){
      return res.json({ success: false, message: 'OTP expired.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = '';
    user.resetOtpExpiresAt = 0;

    await user.save();

    return res.json({ success: true, message: 'Password has been reset successfully.' });

  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
}
