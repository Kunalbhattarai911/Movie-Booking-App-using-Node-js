import jwt from "jsonwebtoken";

export const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access token is missing or invalid", success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the user info from the token
    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token",
      success: false,
    });
  }
};
