import jwt from "jsonwebtoken";
import Redis from "ioredis";
const SECRET_KEY = process.env.SECRET_KEY;

const redisClient = new Redis(); 

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });
};

export const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // Check if token is blacklisted
  const isBlacklisted = await redisClient.get(`blacklist:${token}`);
  if (isBlacklisted) {
    return res.status(401).send("Token is revoked. Please log in again.");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
};