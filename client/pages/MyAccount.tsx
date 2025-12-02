import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { User, Calendar, Trash2, AlertCircle, Loader, LogOut } from "lucide-react";

interface Booking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  tableNumber: number;
  numberOfPlayers: number;
  totalPrice: number;
  status: string;
}

const MyAccount = () => {
  const navigate = useNavigate();
  const { user, token, logout, updateProfile } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", phone: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const response = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success) {
          setBookings(data.bookings);
        }
      } catch (err) {
        console.error("Error fetching bookings:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchBookings();
      setEditData({ name: user.name, phone: user.phone });
    }
  }, [user, token, navigate]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await updateProfile(editData.name, editData.phone);
      setSuccess("Profile updated successfully!");
      setIsEditing(false);
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to update profile"
      );
    }
  };

  const handleCancel = async (bookingId: string) => {
    if (!window.confirm("Are you sure you want to cancel this booking?"))
      return;

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setBookings(
          bookings.map((b) =>
            b.id === bookingId ? { ...b, status: "cancelled" } : b
          )
        );
        setSuccess("Booking cancelled successfully!");
        setTimeout(() => setSuccess(""), 3000);
      }
    } catch (err) {
      setError("Failed to cancel booking");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">
            My Account
          </h1>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
              <span className="text-green-700 text-sm">{success}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Profile Card */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-brand-green flex items-center justify-center text-white text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-brand-dark">
                    {user.name}
                  </h2>
                  <p className="text-sm text-gray-600">{user.email}</p>
                </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase mb-1">Phone</p>
                  <p className="font-semibold text-gray-800">{user.phone}</p>
                </div>

                {user.membershipType && (
                  <div>
                    <p className="text-xs text-gray-600 uppercase mb-1">
                      Membership
                    </p>
                    <p className="font-semibold text-brand-green">
                      {user.membershipType}
                    </p>
                    <p className="text-xs text-gray-600">
                      Expires: {user.membershipExpiry}
                    </p>
                  </div>
                )}

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="w-full mt-4 px-4 py-2 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                >
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center justify-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>

            {/* Edit Profile Form */}
            {isEditing && (
              <div className="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-2xl font-bold text-brand-dark mb-4">
                  Edit Profile
                </h3>
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-2 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}
          </div>

          {/* Bookings Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
              <Calendar size={24} />
              My Bookings
            </h2>

            {isLoading ? (
              <div className="flex justify-center py-12">
                <Loader size={40} className="animate-spin text-brand-green" />
              </div>
            ) : bookings.length > 0 ? (
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className={`border-2 rounded-lg p-4 ${
                      booking.status === "cancelled"
                        ? "border-gray-300 bg-gray-50"
                        : "border-brand-green bg-white"
                    }`}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          Date
                        </p>
                        <p className="font-bold text-gray-800">
                          {new Date(booking.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          Time
                        </p>
                        <p className="font-bold text-gray-800">
                          {booking.startTime} - {booking.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          Table
                        </p>
                        <p className="font-bold text-gray-800">
                          Table {booking.tableNumber}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          Price
                        </p>
                        <p className="font-bold text-brand-gold">
                          ₹{booking.totalPrice}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>

                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleCancel(booking.id)}
                          className="flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold transition-colors"
                        >
                          <Trash2 size={16} />
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 text-lg mb-4">
                  You don't have any bookings yet
                </p>
                <a
                  href="/booking"
                  className="inline-block px-6 py-2 bg-brand-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
                >
                  Book Now
                </a>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyAccount;
