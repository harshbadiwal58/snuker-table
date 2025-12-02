import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Lock, AlertCircle, Loader } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
      navigate(email === "admin@snookermania.com" ? "/admin/dashboard" : "/my-account");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
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
              Welcome Back
            </h1>
            <p className="text-gray-600 text-center mb-6">
              Sign in to your Snookermania account
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
                  Email Address
                </label>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-2 focus-within:border-brand-green focus-within:ring-2 focus-within:ring-brand-green focus-within:ring-opacity-10">
                  <Mail size={20} className="text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                {isLoading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-brand-green font-semibold hover:underline"
              >
                Sign up here
              </Link>
            </p>

            {/* Demo credentials */}
            <div className="mt-8 p-4 bg-brand-green bg-opacity-5 rounded-lg border border-brand-green border-opacity-20">
              <p className="text-sm font-semibold text-brand-dark mb-2">
                Demo Credentials:
              </p>
              <p className="text-sm text-gray-600">
                Admin: admin@snookermania.com / admin123
              </p>
              <p className="text-sm text-gray-600">
                User: rajesh@example.com / pass123
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
