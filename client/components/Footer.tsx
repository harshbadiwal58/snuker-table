import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Events", href: "/events" },
      { label: "Gallery", href: "/gallery" },
    ],
    Services: [
      { label: "Snooker", href: "/snooker" },
      { label: "Café", href: "/cafe" },
      { label: "Pricing", href: "/pricing" },
      { label: "Membership", href: "/membership" },
    ],
    Legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
      { label: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className="bg-brand-dark text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-brand-green flex items-center justify-center font-bold text-lg">
                S
              </div>
              <div>
                <h3 className="font-bold text-lg">Snookermania</h3>
                <p className="text-xs text-gray-400">& Café</p>
              </div>
            </div>
            <p className="text-sm text-gray-400">
              Where world-class snooker meets a cozy café experience.
            </p>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="font-semibold mb-4 text-brand-gold">{section}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4 text-brand-gold">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 text-brand-gold flex-shrink-0" />
                <span className="text-sm text-gray-400">
                  123 Game Street, City, State 12345
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-brand-gold" />
                <a
                  href="tel:+919876543210"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-brand-gold" />
                <a
                  href="mailto:info@snookermania.com"
                  className="text-sm text-gray-400 hover:text-white transition-colors"
                >
                  info@snookermania.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock size={16} className="text-brand-gold" />
                <span className="text-sm text-gray-400">10 AM - 11 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © {currentYear} Snookermania & Café. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-brand-gold transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
