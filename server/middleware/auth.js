import jwt from "jsonwebtoken";

// Middleware function to verify JWT token in the header
export const verifyToken = async (req, res, next) => {
  // Get the authorization header
  const authHeader = req.header("Authorization");

  // If the header is not present, return a 401 error
  if (!authHeader) {
    return res.status(401).json({ error: "Access denied: No token provided." });
  }

  // Get the token from the header
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7) // Remove the "Bearer " prefix
    : authHeader;

  try {
    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is invalid, return a 401 error
    return res.status(401).json({ error: "Invalid token." });
  }
};
