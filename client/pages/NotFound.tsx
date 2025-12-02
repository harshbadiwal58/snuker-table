import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24 flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <h1 className="text-7xl font-bold text-brand-dark mb-4">404</h1>
          <p className="text-2xl text-gray-600 mb-6">
            Oops! Page not found
          </p>
          <p className="text-gray-500 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-3 bg-brand-green text-white font-semibold rounded-lg hover:bg-opacity-90 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/contact"
              className="px-8 py-3 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
