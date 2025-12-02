import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/snooker", label: "Snooker" },
    { href: "/cafe", label: "Café" },
    { href: "/pricing", label: "Pricing" },
    { href: "/booking", label: "Booking" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-brand-green flex items-center justify-center text-white font-bold text-lg">
            S
          </div>
          <div className="hidden sm:block">
            <h1 className="font-bold text-lg text-brand-dark">Snookermania</h1>
            <p className="text-xs text-gray-600">& Café</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-brand-green text-white"
                  : "text-gray-700 hover:bg-gray-100"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA Button, User Menu, and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Link
            to="/booking"
            className="hidden sm:inline-block px-6 py-2 bg-brand-gold text-brand-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Book Now
          </Link>

          {/* User Menu */}
          {user ? (
            <div className="relative hidden sm:block">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <User size={18} className="text-brand-green" />
                <span className="text-sm font-semibold text-gray-700">
                  {user.name.split(" ")[0]}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 animate-fade-in">
                  <Link
                    to="/my-account"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 border-b"
                  >
                    👤 My Account
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm font-medium text-brand-green hover:bg-gray-100 border-b font-bold"
                    >
                      🔧 Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      logout();
                      setIsUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-600 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hidden sm:inline-block px-4 py-2 text-brand-green font-semibold border-2 border-brand-green rounded-lg hover:bg-brand-green hover:text-white transition-colors"
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-700 hover:text-brand-green"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 animate-fade-in">
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-brand-green text-white"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link
                  to="/my-account"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 bg-blue-100 text-blue-700 font-semibold rounded-lg text-center"
                >
                  👤 My Account
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2 bg-brand-green text-white font-semibold rounded-lg text-center"
                  >
                    🔧 Admin Panel
                  </Link>
                )}
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/booking"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 bg-brand-gold text-brand-dark font-semibold rounded-lg text-center hover:bg-yellow-500 transition-colors"
                >
                  Book Now
                </Link>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 bg-brand-green text-white font-semibold rounded-lg text-center"
                >
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
