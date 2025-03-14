import jwt from "jsonwebtoken";
import Redis from "ioredis";
const SECRET_KEY = process.env.SECRET_KEY;
import db from "../models/index.js";  
const { Project, ProjectMember} = db;  
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


export const checkManager = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const project = await Project.findOne({ where: { id: projectId } });

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.managerId !== userId) {
      return res.status(403).json({ message: "Access denied. Only the project manager can perform this action." });
    }
    next(); 
  } catch (error) {
    console.error("Error checking project manager:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAdmin = async (req, res, next) => {
  const { projectId } = req.params;
  const userId = req.user.id;

  try {
    const projectMember = await ProjectMember.findOne({
      where: { userId, projectId, role: "admin" },
    });

    if (!projectMember) {
      return res.status(403).json({ message: "Access denied. Only admins can perform this action." });
    }

    next(); // Allow access if the user is an admin
  } catch (error) {
    console.error("Error checking project admin:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
