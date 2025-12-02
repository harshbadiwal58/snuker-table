import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Loader } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  membershipType?: string;
  membershipExpiry?: string;
  createdAt: string;
}

const AdminUsers = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setUsers(data.users);
        } else {
          setError(data.error || "Failed to load users");
        }
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [user, token, navigate]);

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
  );

  if (!user || !user.isAdmin) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">
            Manage Users
          </h1>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          {/* Search */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
            />
          </div>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader size={40} className="animate-spin text-brand-green" />
            </div>
          ) : filteredUsers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredUsers.map((u) => (
                <div
                  key={u.id}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-lg">
                      {u.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800">{u.name}</h3>
                      <p className="text-xs text-gray-600">{u.email}</p>
                    </div>
                  </div>

                  <div className="space-y-3 border-t pt-4">
                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">
                        Phone
                      </p>
                      <p className="font-semibold text-gray-800">{u.phone}</p>
                    </div>

                    {u.membershipType ? (
                      <>
                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">
                            Membership
                          </p>
                          <p className="font-semibold text-brand-green">
                            {u.membershipType}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-600 uppercase mb-1">
                            Expires
                          </p>
                          <p className="font-semibold text-gray-800">
                            {u.membershipExpiry}
                          </p>
                        </div>
                      </>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-600 uppercase mb-1">
                          Status
                        </p>
                        <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
                          No Membership
                        </span>
                      </div>
                    )}

                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">
                        Joined
                      </p>
                      <p className="text-sm text-gray-700">
                        {new Date(u.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 text-lg">No users found</p>
            </div>
          )}

          <div className="mt-8 p-4 bg-brand-green bg-opacity-10 rounded-lg">
            <p className="text-sm text-gray-700">
              Total Users: <strong>{filteredUsers.length}</strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsers;
