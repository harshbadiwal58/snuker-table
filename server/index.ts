import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import * as authRoutes from "./routes/auth";
import * as bookingRoutes from "./routes/bookings";
import * as contentRoutes from "./routes/content";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth routes
  app.post("/api/auth/register", authRoutes.register);
  app.post("/api/auth/login", authRoutes.login);
  app.get("/api/auth/profile", authRoutes.getUserProfile);
  app.put("/api/auth/profile", authRoutes.updateProfile);

  // Booking routes
  app.post("/api/bookings", bookingRoutes.createBooking);
  app.get("/api/bookings", bookingRoutes.getUserBookings);
  app.get("/api/bookings/available-slots", bookingRoutes.getAvailableSlots);
  app.delete("/api/bookings/:bookingId", bookingRoutes.cancelBooking);

  // Content routes
  app.get("/api/events", contentRoutes.getEvents);
  app.get("/api/events/:id", contentRoutes.getEvent);
  app.get("/api/menu", contentRoutes.getMenuItems);
  app.post("/api/contact", contentRoutes.submitContact);

  // Admin routes
  app.get("/api/admin/dashboard", contentRoutes.getAdminDashboard);
  app.get("/api/admin/bookings", contentRoutes.getAllBookings);
  app.get("/api/admin/users", contentRoutes.getAllUsers);
  app.put("/api/admin/bookings/:bookingId", contentRoutes.updateBookingStatus);
  app.get("/api/admin/contacts", contentRoutes.getAllContacts);

  return app;
}
