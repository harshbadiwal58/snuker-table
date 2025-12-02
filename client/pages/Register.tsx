import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  User,
  Mail,
  Phone,
  Lock,
  AlertCircle,
  Loader,
  CheckCircle,
} from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await register(
        formData.name,
        formData.email,
        formData.phone,
        formData.password,
        formData.confirmPassword
      );
      navigate("/my-account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-brand-dark mb-2 text-center">
              Join Snookermania
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Create your account to book tables and enjoy exclusive benefits
            </p>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg mb-6 text-red-700">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <User size={20} className="text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <Mail size={20} className="text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <Phone size={20} className="text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <Lock size={20} className="text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <Lock size={20} className="text-gray-400" />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="flex-1 outline-none bg-transparent"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-brand-green text-white font-semibold py-3 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isLoading && <Loader size={20} className="animate-spin" />}
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-brand-green font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>

            {/* Benefits */}
            <div className="mt-8 space-y-2">
              <p className="text-sm font-semibold text-brand-dark mb-3">
                Benefits of joining:
              </p>
              {[
                "Book tables instantly",
                "Manage your bookings",
                "Exclusive member offers",
                "Membership plans available",
              ].map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-sm text-gray-600"
                >
                  <CheckCircle size={16} className="text-brand-gold" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
