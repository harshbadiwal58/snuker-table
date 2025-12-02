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

// Pricing rates (weekday vs weekend)
const getPricingRate = (date: string, duration: number) => {
  const dayOfWeek = new Date(date).getDay();
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
  const hourlyRate = isWeekend ? 300 : 150;
  return hourlyRate * duration;
};

export const createBooking: RequestHandler = (req, res) => {
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

  const { date, startTime, endTime, numberOfPlayers, tableNumber, duration } =
    req.body;

  if (!date || !startTime || !endTime || !numberOfPlayers || !tableNumber) {
    res.status(400).json({ error: "All fields are required" });
    return;
  }

  // Check if table is available
  if (!dataStoreService.isTableAvailable(tableNumber, date, startTime, endTime)) {
    res.status(400).json({ error: "Table is not available for this time slot" });
    return;
  }

  const totalPrice = getPricingRate(date, duration);

  const booking = dataStoreService.createBooking({
    userId: decoded.userId,
    date,
    startTime,
    endTime,
    duration,
    numberOfPlayers,
    tableNumber,
    status: "confirmed",
    totalPrice,
  });

  res.json({
    success: true,
    booking: {
      id: booking.id,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
      tableNumber: booking.tableNumber,
      numberOfPlayers: booking.numberOfPlayers,
      totalPrice: booking.totalPrice,
      status: booking.status,
    },
  });
};

export const getUserBookings: RequestHandler = (req, res) => {
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

  const bookings = dataStoreService.getBookingsByUserId(decoded.userId);

  res.json({
    success: true,
    bookings,
  });
};

export const getAvailableSlots: RequestHandler = (req, res) => {
  const { date, duration } = req.query;

  if (!date || !duration) {
    res.status(400).json({ error: "Date and duration are required" });
    return;
  }

  // Generate time slots (9 AM to 10 PM)
  const slots = [];
  const durationMinutes = parseInt(duration as string) * 60;

  for (let hour = 9; hour < 22; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 30) {
      const startTime = `${String(hour).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
      const endHour = hour + Math.floor((minutes + durationMinutes) / 60);
      const endMinutes = (minutes + durationMinutes) % 60;
      const endTime = `${String(endHour).padStart(2, "0")}:${String(endMinutes).padStart(2, "0")}`;

      if (endHour <= 22) {
        const availableTables = dataStoreService.getAvailableTables(
          date as string,
          startTime,
          endTime
        );
        if (availableTables.length > 0) {
          slots.push({
            startTime,
            endTime,
            availableTables,
            availableCount: availableTables.length,
          });
        }
      }
    }
  }

  res.json({
    success: true,
    slots,
  });
};

export const cancelBooking: RequestHandler = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const { bookingId } = req.params;

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const decoded = parseToken(token);

  if (!decoded || !decoded.userId) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const booking = dataStoreService.getAllBookings().find((b) => b.id === bookingId);

  if (!booking) {
    res.status(404).json({ error: "Booking not found" });
    return;
  }

  if (booking.userId !== decoded.userId) {
    res.status(403).json({ error: "You can only cancel your own bookings" });
    return;
  }

  const updated = dataStoreService.updateBooking(bookingId, { status: "cancelled" });

  res.json({
    success: true,
    booking: updated,
  });
};
