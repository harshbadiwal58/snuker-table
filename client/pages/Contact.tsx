import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const data = await response.json();
        setError(data.error || "Failed to send message");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-dark to-brand-green py-12 md:py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-200">
              We'd love to hear from you. Send us a message!
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
              {/* Contact Info Cards */}
              {[
                {
                  icon: Phone,
                  title: "Phone",
                  content: "+91 98765 43210",
                  link: "tel:+919876543210",
                },
                {
                  icon: Mail,
                  title: "Email",
                  content: "info@snookermania.com",
                  link: "mailto:info@snookermania.com",
                },
                {
                  icon: MapPin,
                  title: "Address",
                  content: "123 Game Street, City, State 12345",
                  link: null,
                },
              ].map((info, idx) => {
                const Icon = info.icon;
                return (
                  <div key={idx} className="bg-white rounded-lg shadow-lg p-6">
                    <div className="inline-block p-3 bg-brand-green bg-opacity-10 rounded-lg mb-4">
                      <Icon size={24} className="text-brand-green" />
                    </div>
                    <h3 className="text-xl font-semibold text-brand-dark mb-2">
                      {info.title}
                    </h3>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-600 hover:text-brand-green font-medium"
                      >
                        {info.content}
                      </a>
                    ) : (
                      <p className="text-gray-600">{info.content}</p>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-brand-dark mb-6">
                  Send us a Message
                </h2>

                {success && (
                  <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg mb-6">
                    <CheckCircle size={20} className="text-green-600 mt-0.5" />
                    <div>
                      <p className="font-semibold text-green-800">Message Sent!</p>
                      <p className="text-sm text-green-700">
                        Thank you for reaching out. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
                    <AlertCircle size={20} className="text-red-600 mt-0.5" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
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
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="How can we help?"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message here..."
                      rows={5}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-brand-gold text-brand-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isLoading && <Loader size={20} className="animate-spin" />}
                    {isLoading ? "Sending..." : "Send Message"}
                    {!isLoading && <Send size={20} />}
                  </button>
                </form>
              </div>

              {/* Info & Hours */}
              <div>
                <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                  <h3 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                    <Clock size={24} />
                    Hours of Operation
                  </h3>
                  <div className="space-y-3">
                    {[
                      { day: "Monday - Friday", hours: "10:00 AM - 11:00 PM" },
                      { day: "Saturday", hours: "9:00 AM - 12:00 AM" },
                      { day: "Sunday", hours: "9:00 AM - 11:00 PM" },
                      { day: "Holidays", hours: "11:00 AM - 11:00 PM" },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between">
                        <span className="font-semibold text-gray-700">
                          {item.day}
                        </span>
                        <span className="text-gray-600">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Map placeholder */}
                <div className="bg-gradient-to-br from-brand-green to-brand-dark rounded-lg shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Location</h3>
                  <p className="mb-4">
                    Visit us at our prime location in the city center
                  </p>
                  <div className="w-full h-64 bg-white bg-opacity-10 rounded-lg flex items-center justify-center">
                    <p className="text-white opacity-50">
                      📍 Map Integration Coming Soon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
