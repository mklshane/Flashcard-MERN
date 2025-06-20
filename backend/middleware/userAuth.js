import jwt from "jsonwebtoken";

const { JsonWebTokenError } = jwt; // destructure after import

const userAuth = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    // ⛔ Don't send response — let eitherAuth try firebaseAuth
    return;
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = tokenDecode.id; // Set on req.userId instead of req.body
    next();
  } catch (error) {
    return res.status(401).json({
      // Add status code
      success: false,
      message: "Invalid token. Please login again.",
    });
  }
};

export default userAuth;