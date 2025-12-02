import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Users, AlertCircle, CheckCircle, Loader } from "lucide-react";

interface TimeSlot {
  startTime: string;
  endTime: string;
  availableTables: number[];
  availableCount: number;
}

const Booking = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [duration, setDuration] = useState("1");
  const [numberOfPlayers, setNumberOfPlayers] = useState("2");
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string>("");
  const [selectedTable, setSelectedTable] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [availableTables, setAvailableTables] = useState<number[]>([]);

  // Get minimum date (today)
  const minDate = new Date().toISOString().split("T")[0];

  // Fetch available slots when date or duration changes
  useEffect(() => {
    if (!date || !duration) return;

    const fetchSlots = async () => {
      try {
        const response = await fetch(
          `/api/bookings/available-slots?date=${date}&duration=${duration}`
        );
        const data = await response.json();
        if (data.success) {
          setTimeSlots(data.slots);
          setSelectedSlot("");
          setSelectedTable(null);
          setAvailableTables([]);
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
      }
    };

    fetchSlots();
  }, [date, duration]);

  // Update available tables when time slot is selected
  useEffect(() => {
    if (selectedSlot) {
      const slot = timeSlots.find((s) => s.startTime === selectedSlot);
      if (slot) {
        setAvailableTables(slot.availableTables);
        setSelectedTable(null);
      }
    }
  }, [selectedSlot, timeSlots]);

  const calculatePrice = () => {
    const dayOfWeek = new Date(date).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hourlyRate = isWeekend ? 300 : 150;
    return hourlyRate * parseFloat(duration);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      navigate("/login");
      return;
    }

    if (!selectedSlot || !selectedTable) {
      setError("Please select a time slot and table");
      return;
    }

    const slot = timeSlots.find((s) => s.startTime === selectedSlot);
    if (!slot) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          startTime: slot.startTime,
          endTime: slot.endTime,
          duration: parseFloat(duration),
          numberOfPlayers: parseInt(numberOfPlayers),
          tableNumber: selectedTable,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          `Booking confirmed! Your table ${data.booking.tableNumber} is reserved.`
        );
        setTimeout(() => {
          navigate("/my-account");
        }, 2000);
      } else {
        setError(data.error || "Booking failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4">
            Book Your Table
          </h1>
          <p className="text-center text-gray-600 mb-12 max-w-lg mx-auto">
            Select your preferred date, time, and table to start playing
          </p>

          {!user && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-yellow-600 mt-1" />
              <div>
                <p className="font-semibold text-yellow-800">Login Required</p>
                <p className="text-sm text-yellow-700">
                  You need to{" "}
                  <a href="/login" className="underline font-semibold">
                    sign in
                  </a>{" "}
                  to book a table.
                </p>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle size={20} className="text-red-600 mt-1" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <CheckCircle size={20} className="text-green-600 mt-1" />
              <span className="text-green-700">{success}</span>
            </div>
          )}

          <form
            onSubmit={handleBooking}
            className="bg-white rounded-lg shadow-lg p-8 space-y-6"
          >
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar size={16} className="inline mr-2" />
                Select Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={minDate}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            {/* Duration Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock size={16} className="inline mr-2" />
                Duration (Hours)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              >
                <option value="1">1 Hour</option>
                <option value="1.5">1.5 Hours</option>
                <option value="2">2 Hours</option>
                <option value="2.5">2.5 Hours</option>
                <option value="3">3 Hours</option>
              </select>
            </div>

            {/* Number of Players */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Users size={16} className="inline mr-2" />
                Number of Players
              </label>
              <select
                value={numberOfPlayers}
                onChange={(e) => setNumberOfPlayers(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                required
              >
                <option value="1">1 Player</option>
                <option value="2">2 Players</option>
                <option value="3">3 Players</option>
                <option value="4">4 Players</option>
              </select>
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Time Slot
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
                {timeSlots.length > 0 ? (
                  timeSlots.map((slot) => (
                    <button
                      key={slot.startTime}
                      type="button"
                      onClick={() => setSelectedSlot(slot.startTime)}
                      className={`p-3 rounded-lg border-2 transition-all text-sm font-semibold ${
                        selectedSlot === slot.startTime
                          ? "border-brand-green bg-brand-green bg-opacity-10"
                          : "border-gray-300 hover:border-brand-green"
                      }`}
                    >
                      {slot.startTime}
                      <div className="text-xs font-normal text-gray-600 mt-1">
                        {slot.availableCount} table{slot.availableCount !== 1 ? "s" : ""}
                      </div>
                    </button>
                  ))
                ) : (
                  <p className="col-span-full text-gray-500 text-center py-4">
                    No available slots for this date and duration
                  </p>
                )}
              </div>
            </div>

            {/* Table Selection */}
            {selectedSlot && availableTables.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Table
                </label>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {availableTables.map((tableNum) => (
                    <button
                      key={tableNum}
                      type="button"
                      onClick={() => setSelectedTable(tableNum)}
                      className={`p-3 rounded-lg border-2 transition-all font-semibold ${
                        selectedTable === tableNum
                          ? "border-brand-gold bg-brand-gold bg-opacity-10"
                          : "border-gray-300 hover:border-brand-gold"
                      }`}
                    >
                      Table {tableNum}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price Summary */}
            <div className="bg-gradient-to-r from-brand-green to-brand-dark text-white p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90">Estimated Price</p>
                  <p className="text-4xl font-bold">₹{calculatePrice()}</p>
                </div>
                <div className="text-right text-sm opacity-90">
                  <p>
                    {parseFloat(duration)} hour{parseFloat(duration) !== 1 ? "s" : ""}
                  </p>
                  <p>
                    ₹{new Date(date).getDay() === 0 || new Date(date).getDay() === 6 ? 300 : 150}
                    /hour
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !user || !selectedTable}
              className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading && <Loader size={20} className="animate-spin" />}
              {isLoading ? "Confirming..." : "Confirm Booking"}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Weekday: ₹150/hour | Weekend: ₹300/hour
            </p>
          </form>

          {/* Info Box */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "🎱",
                title: "12 Premium Tables",
                desc: "Professional-grade snooker tables with perfect felt",
              },
              {
                icon: "💡",
                title: "Perfect Lighting",
                desc: "Professional LED lighting for optimal play",
              },
              {
                icon: "🎯",
                title: "Easy Cancellation",
                desc: "Cancel up to 2 hours before your booking",
              },
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow text-center">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-semibold text-brand-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Booking;
