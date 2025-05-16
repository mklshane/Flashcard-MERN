import User from "../models/user.model.js";

export const getUserData = async (req, res) => {
  try {
    const userId = req.userId || req.headers["x-user-id"]; // use what you set in the middleware

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User not logged in.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.json({
      success: true,
      userData: {
        name: user.name,
        isVerified: user.isVerified,
      },
    });
  } catch (error) {
    console.error("Error getting user data:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
  