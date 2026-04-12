import express from "express";
import bcrypt from "bcrypt";
import User from "#models/user.js";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.js";

const router = express.Router();

// SIGNUP
router.post("/signup", async (req, res) => {
  // console.log('BODY:', req.body);
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required!" });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully." });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(409).json({ error: "Invalid email or password." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || "1d",
      },
    );

    await Token.create({
      userId: user._id,
      token: token,
      type: "refresh",
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    const userData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(200).json({
      message: "Login successful.",
      user: userData,
      token,
    });
    
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      return res.status(400).json({ message: "Token missing" });
    }

    const deleted = await Token.findOneAndDelete({ token });

    if (!deleted) {
      return res.status(404).json({ message: "Token not found" });
    }

    return res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;