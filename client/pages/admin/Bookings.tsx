import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Loader } from "lucide-react";

interface Booking {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  tableNumber: number;
  numberOfPlayers: number;
  totalPrice: number;
  status: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
}

const AdminBookings = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setBookings(data.bookings);
        } else {
          setError(data.error || "Failed to load bookings");
        }
      } catch (err) {
        setError("Failed to load bookings");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchBookings();
    }
  }, [user, token, navigate]);

  const handleStatusUpdate = async (bookingId: string, newStatus: string) => {
    setUpdatingId(bookingId);

    try {
      const response = await fetch(`/api/admin/bookings/${bookingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setBookings(
          bookings.map((b) =>
            b.id === bookingId ? { ...b, status: newStatus } : b
          )
        );
      } else {
        setError("Failed to update booking");
      }
    } catch (err) {
      setError("Failed to update booking");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredBookings = bookings.filter(
    (b) => filterStatus === "all" || b.status === filterStatus
  );

  if (!user || !user.isAdmin) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">
            Manage Bookings
          </h1>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Filter */}
          <div className="mb-6 flex gap-2 flex-wrap">
            {["all", "confirmed", "cancelled", "completed"].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                  filterStatus === status
                    ? "bg-brand-green text-white"
                    : "bg-white text-gray-700 border-2 border-gray-300"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader size={40} className="animate-spin text-brand-green" />
            </div>
          ) : filteredBookings.length > 0 ? (
            <div className="bg-white rounded-lg shadow-lg overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-brand-dark text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">
                      User
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Time
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Table
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Players
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-800">
                            {booking.userName}
                          </p>
                          <p className="text-xs text-gray-600">
                            {booking.userEmail}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {new Date(booking.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        {booking.startTime} - {booking.endTime}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        Table {booking.tableNumber}
                      </td>
                      <td className="px-6 py-4">{booking.numberOfPlayers}</td>
                      <td className="px-6 py-4 font-semibold text-brand-gold">
                        ₹{booking.totalPrice}
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            handleStatusUpdate(booking.id, e.target.value)
                          }
                          disabled={updatingId === booking.id}
                          className={`px-3 py-1 rounded-lg font-semibold text-sm ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : booking.status === "cancelled"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                          } disabled:opacity-50`}
                        >
                          <option value="confirmed">Confirmed</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">
                No {filterStatus !== "all" ? filterStatus : ""} bookings found
              </p>
            </div>
          )}

          <div className="mt-8 p-4 bg-brand-green bg-opacity-10 rounded-lg">
            <p className="text-sm text-gray-700">
              Total Bookings: <strong>{filteredBookings.length}</strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminBookings;
