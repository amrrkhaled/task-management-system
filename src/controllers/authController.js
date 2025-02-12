import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import db from "../models/index.js";  
import { generateToken, verifyToken } from "../middlewares/authMiddleware.js";
import redisClient from "../config/redis.js";
import { queueEmail } from "../services/emailQueue.js";
const { User } = db;  


const saltRounds = parseInt(process.env.SALT_ROUNDS);

export const register = async (req, res) => {
    const { email, password, username} = req.body;
    console.log(req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.findOne({ where: { email } });

        if (user) {
            return res.status(409).send("User already exists");
        } else {
            await User.create({ email, username, password: hashedPassword });
            res.send("User registered successfully");
            queueEmail("amrkhaledsaada1@gmail.com", "newAccount", {});

        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Error registering user");
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).send("Invalid email or password");
        }

        const token = generateToken(user);
        res.json({ token });
    } catch (err) {
        console.log(err);
        res.status(500).send("Error while logging in");
    }
};

export const forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).send("User not found");
        }

        const resetCode = crypto.randomInt(100000, 999999).toString();
        await redisClient.setex(`resetCode:${email}`, 600, resetCode);

        queueEmail("amrkhaledsaada1@gmail.com", "resetPassword", { code: resetCode });
        res.send("Verification code sent to your email.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error sending verification code.");
    }
};

export const verifyResetCode = async (req, res) => {
    const { email, code } = req.body;

    try {
        const resetCode = await redisClient.get(`resetCode:${email}`);
        const user = await User.findOne({ where: { email } });

        if (!user || code !== resetCode) {
            return res.status(400).send("Invalid or expired code.");
        }

        res.send("Code verified successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error verifying code.");
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).send("User not found.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
        user.password = hashedPassword;
        await user.save();

        res.send("Password reset successfully.");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error resetting password.");
    }
};

export const logout = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(400).send("No token provided");
    }

    const decoded = jwt.decode(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    await redisClient.setex(`blacklist:${token}`, expiresIn, "logged out");
    res.send("User logged out successfully");
};
