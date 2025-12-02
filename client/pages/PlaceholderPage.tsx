import { useLocation, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PlaceholderPage = () => {
  const location = useLocation();
  const pageName = location.pathname
    .split("/")
    .pop()
    ?.replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase()) || "Page";

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 p-12 bg-gradient-to-br from-brand-green to-brand-dark rounded-lg text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {pageName}
            </h1>
          </div>
          <p className="text-xl text-gray-600 mb-8">
            This page is coming soon! We're building something amazing for you.
          </p>
          <p className="text-gray-500 mb-8">
            Let us know what content you'd like to see here, and we'll build it
            for you!
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

export default PlaceholderPage;
