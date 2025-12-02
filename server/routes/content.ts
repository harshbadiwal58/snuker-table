import { RequestHandler } from "express";
import { dataStoreService } from "../services/dataStore";

// Parse token helper
const parseToken = (token: string) => {
  try {
    return JSON.parse(Buffer.from(token, "base64").toString());
  } catch {
    return null;
  }
};

// Events endpoints
export const getEvents: RequestHandler = (req, res) => {
  const events = dataStoreService.getAllEvents();
  res.json({
    success: true,
    events,
  });
};

export const getEvent: RequestHandler = (req, res) => {
  const { id } = req.params;
  const event = dataStoreService.getEventById(id);

  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.json({
    success: true,
    event,
  });
};

// Menu endpoints
export const getMenuItems: RequestHandler = (req, res) => {
  const { category } = req.query;
  const items = dataStoreService.getMenuItems(category as string | undefined);
  res.json({
    success: true,
    items,
  });
};

// Contact form endpoint
export const submitContact: RequestHandler = (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  const contact = dataStoreService.saveContact({
    name,
    email,
    phone,
    subject,
    message,
  });

  res.json({
    success: true,
    message: "Contact message saved successfully",
    contact,
  });
};

// Admin endpoints
export const getAllBookings: RequestHandler = (req, res) => {
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

  // Check if user is admin
  const user = dataStoreService.findUserById(decoded.userId);

  if (!user || user.email !== "admin@snookermania.com") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  const bookings = dataStoreService.getAllBookings();
  const bookingsWithUserInfo = bookings.map((booking) => {
    const user = dataStoreService.findUserById(booking.userId);
    return {
      ...booking,
      userName: user?.name,
      userEmail: user?.email,
      userPhone: user?.phone,
    };
  });

  res.json({
    success: true,
    bookings: bookingsWithUserInfo,
  });
};

export const getAllUsers: RequestHandler = (req, res) => {
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

  // Check if user is admin
  const user = dataStoreService.findUserById(decoded.userId);

  if (!user || user.email !== "admin@snookermania.com") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  // Return all users except passwords
  const users = dataStoreService["users"].map((u) => {
    const { password, ...userWithoutPassword } = u;
    return userWithoutPassword;
  });

  res.json({
    success: true,
    users,
  });
};

export const updateBookingStatus: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { bookingId } = req.params;
  const { status } = req.body;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = parseToken(token);

  if (!decoded || !decoded.userId) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  // Check if user is admin
  const user = dataStoreService.findUserById(decoded.userId);

  if (!user || user.email !== "admin@snookermania.com") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  if (!["confirmed", "cancelled", "completed"].includes(status)) {
    res.status(400).json({ error: "Invalid status" });
    return;
  }

  const booking = dataStoreService.updateBooking(bookingId, { status });

  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  res.json({
    success: true,
    booking,
  });
};

export const getAllContacts: RequestHandler = (req, res) => {
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

  // Check if user is admin
  const user = dataStoreService.findUserById(decoded.userId);

  if (!user || user.email !== "admin@snookermania.com") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  const contacts = dataStoreService.getAllContacts();

  res.json({
    success: true,
    contacts,
  });
};

export const getAdminDashboard: RequestHandler = (req, res) => {
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

  // Check if user is admin
  const user = dataStoreService.findUserById(decoded.userId);

  if (!user || user.email !== "admin@snookermania.com") {
    res.status(403).json({ error: "Admin access required" });
    return;
  }

  const bookings = dataStoreService.getAllBookings();
  const users = dataStoreService["users"];
  const contacts = dataStoreService.getAllContacts();

  const stats = {
    totalBookings: bookings.length,
    confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
    cancelledBookings: bookings.filter((b) => b.status === "cancelled").length,
    completedBookings: bookings.filter((b) => b.status === "completed").length,
    totalUsers: users.length,
    totalRevenue: bookings
      .filter((b) => b.status === "confirmed")
      .reduce((sum, b) => sum + b.totalPrice, 0),
    pendingContacts: contacts.length,
  };

  res.json({
    success: true,
    stats,
  });
};
