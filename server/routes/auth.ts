import { RequestHandler } from "express";
import { dataStoreService } from "../services/dataStore";

// Simple JWT token generation (in production, use proper JWT library)
const generateToken = (userId: string) => {
  return Buffer.from(JSON.stringify({ userId, iat: Date.now() })).toString(
    "base64"
  );
};

// Parse token
const parseToken = (token: string) => {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString());
  } catch {
    return null;
  }
};

export const register: RequestHandler = (req, res) => {
  const { name, email, phone, password, confirmPassword } = req.body;

  if (!name || !email || !phone || !password) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  if (dataStoreService.findUserByEmail(email)) {
    res.status(400).json({ error: "Email already registered" });
    return;
  }

  const user = dataStoreService.createUser({
    name,
    email,
    phone,
    password,
  });

  const token = generateToken(user.id);
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
    },
    token,
  });
};

export const login: RequestHandler = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required" });
    return;
  }

  const user = dataStoreService.findUserByEmail(email);

  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid email or password" });
    return;
  }

  // Check if user is admin
  const isAdmin = email === "admin@snookermania.com";

  const token = generateToken(user.id);
  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      isAdmin,
    },
    token,
  });
};

export const getUserProfile: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = parseToken(token);

  if (!decoded || !decoded.userId) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const user = dataStoreService.findUserById(decoded.userId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const isAdmin = user.email === "admin@snookermania.com";

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      membershipType: user.membershipType,
      membershipExpiry: user.membershipExpiry,
      isAdmin,
    },
  });
};

export const updateProfile: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = parseToken(token);

  if (!decoded || !decoded.userId) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const user = dataStoreService.findUserById(decoded.userId);

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const { name, phone } = req.body;

  if (name) user.name = name;
  if (phone) user.phone = phone;

  res.json({
    success: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      membershipType: user.membershipType,
      membershipExpiry: user.membershipExpiry,
    },
  });
};
