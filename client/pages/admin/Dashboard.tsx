import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  BarChart3,
  Calendar,
  Users,
  DollarSign,
  Mail,
  AlertCircle,
} from "lucide-react";

interface Stats {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  completedBookings: number;
  totalUsers: number;
  totalRevenue: number;
  pendingContacts: number;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }

    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setStats(data.stats);
        } else {
          setError(data.error || "Failed to load dashboard");
        }
      } catch (err) {
        setError("Failed to load dashboard");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchStats();
    }
  }, [user, token, navigate]);

  if (!user || !user.isAdmin) return null;

  const dashboardCards = [
    {
      icon: Calendar,
      label: "Total Bookings",
      value: stats?.totalBookings || 0,
      color: "from-blue-600 to-blue-700",
      link: "/admin/bookings",
    },
    {
      icon: DollarSign,
      label: "Total Revenue",
      value: `₹${stats?.totalRevenue || 0}`,
      color: "from-green-600 to-green-700",
      link: "/admin/bookings",
    },
    {
      icon: Users,
      label: "Total Users",
      value: stats?.totalUsers || 0,
      color: "from-purple-600 to-purple-700",
      link: "/admin/users",
    },
    {
      icon: Mail,
      label: "Contact Messages",
      value: stats?.pendingContacts || 0,
      color: "from-orange-600 to-orange-700",
      link: "/admin/contacts",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-brand-dark mb-2">
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
            </div>
          ) : (
            <>
              {/* Statistics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {dashboardCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <Link
                      key={idx}
                      to={card.link}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
                    >
                      <div
                        className={`bg-gradient-to-br ${card.color} p-6 text-white`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm opacity-90 mb-1">
                              {card.label}
                            </p>
                            <p className="text-3xl font-bold">{card.value}</p>
                          </div>
                          <Icon
                            size={40}
                            className="opacity-20 group-hover:opacity-30 transition-opacity"
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Booking Status Overview */}
              {stats && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
                  {/* Booking Status */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                      <BarChart3 size={24} />
                      Booking Status Overview
                    </h2>
                    <div className="space-y-4">
                      {[
                        {
                          label: "Confirmed",
                          value: stats.confirmedBookings,
                          color: "bg-green-500",
                          percentage: Math.round(
                            (stats.confirmedBookings / stats.totalBookings) * 100
                          ) || 0,
                        },
                        {
                          label: "Completed",
                          value: stats.completedBookings,
                          color: "bg-blue-500",
                          percentage: Math.round(
                            (stats.completedBookings / stats.totalBookings) * 100
                          ) || 0,
                        },
                        {
                          label: "Cancelled",
                          value: stats.cancelledBookings,
                          color: "bg-red-500",
                          percentage: Math.round(
                            (stats.cancelledBookings / stats.totalBookings) * 100
                          ) || 0,
                        },
                      ].map((status, idx) => (
                        <div key={idx}>
                          <div className="flex justify-between mb-2">
                            <span className="font-semibold text-gray-700">
                              {status.label}
                            </span>
                            <span className="font-bold text-gray-800">
                              {status.value} ({status.percentage}%)
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`${status.color} h-2 rounded-full transition-all`}
                              style={{ width: `${status.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-brand-dark mb-6">
                      Quick Actions
                    </h2>
                    <div className="space-y-3">
                      <Link
                        to="/admin/bookings"
                        className="block p-4 bg-brand-green text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                      >
                        📅 Manage Bookings
                      </Link>
                      <Link
                        to="/admin/users"
                        className="block p-4 bg-blue-600 text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                      >
                        👥 View All Users
                      </Link>
                      <Link
                        to="/admin/contacts"
                        className="block p-4 bg-orange-600 text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                      >
                        📧 View Messages
                      </Link>
                      <Link
                        to="/"
                        className="block p-4 bg-gray-600 text-white rounded-lg hover:bg-opacity-90 transition-colors font-semibold"
                      >
                        🏠 Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Tips */}
              <div className="bg-brand-green bg-opacity-10 border-l-4 border-brand-green p-6 rounded-lg">
                <h3 className="font-bold text-brand-dark mb-2">
                  Admin Tips
                </h3>
                <ul className="text-gray-700 space-y-2 text-sm">
                  <li>
                    • Use the Manage Bookings section to view and update booking
                    statuses
                  </li>
                  <li>
                    • Check the Users section to manage customer information
                  </li>
                  <li>
                    • Review contact messages regularly for customer inquiries
                  </li>
                  <li>
                    • Monitor revenue trends to track business performance
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
