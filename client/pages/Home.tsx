import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Zap,
  Award,
  Users,
  Coffee,
  MapPin,
  Clock,
  Star,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialsSlide, setTestimonialsSlide] = useState(0);

  // Snooker area images (placeholder)
  const snookerSlides = [
    {
      id: 1,
      title: "Professional Tables",
      description: "World-class snooker equipment",
      color: "from-emerald-600 to-green-700",
    },
    {
      id: 2,
      title: "Ambient Lighting",
      description: "Perfect lighting for every game",
      color: "from-blue-600 to-blue-700",
    },
    {
      id: 3,
      title: "Premium Experience",
      description: "VIP gaming zones available",
      color: "from-purple-600 to-purple-700",
    },
  ];

  // Café preview images (placeholder)
  const cafeSlides = [
    {
      id: 1,
      title: "Freshly Brewed Coffee",
      description: "Artisan coffee from around the world",
      color: "from-amber-600 to-orange-700",
    },
    {
      id: 2,
      title: "Cozy Ambiance",
      description: "Perfect place to relax",
      color: "from-pink-600 to-rose-700",
    },
    {
      id: 3,
      title: "Delicious Snacks",
      description: "Fresh pastries and light bites",
      color: "from-yellow-600 to-amber-700",
    },
  ];

  // Features
  const features = [
    {
      icon: Zap,
      title: "Fast Service",
      description: "Quick bookings and instant confirmations",
    },
    {
      icon: Award,
      title: "Premium Quality",
      description: "World-class snooker tables and equipment",
    },
    {
      icon: Users,
      title: "Community",
      description: "Join tournaments and events",
    },
    {
      icon: Coffee,
      title: "Great Café",
      description: "Enjoy delicious food and drinks",
    },
  ];

  // Testimonials
  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Professional Player",
      text: "Best snooker venue in the city! The tables are amazing and the café is fantastic.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Regular Customer",
      text: "Love the atmosphere here. Great coffee and friendly staff. Highly recommended!",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Tournament Organizer",
      text: "Organized multiple events here. Professional management and excellent facilities.",
      rating: 5,
    },
  ];

  // Pricing teasers
  const pricingTeasers = [
    {
      title: "Hourly Rate",
      price: "₹150-300",
      desc: "Weekdays & Weekends",
    },
    {
      title: "Monthly Pass",
      price: "₹3,999",
      desc: "Unlimited play",
    },
    {
      title: "Membership",
      price: "From ₹9,999",
      desc: "Exclusive benefits",
    },
  ];

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % snookerSlides.length),
      5000
    );
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(
      () =>
        setTestimonialsSlide(
          (prev) => (prev + 1) % testimonials.length
        ),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  const nextSnookerSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % snookerSlides.length);
  const prevSnookerSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + snookerSlides.length) % snookerSlides.length
    );

  const nextCafeSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % cafeSlides.length);
  const prevCafeSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + cafeSlides.length) % cafeSlides.length
    );

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-screen bg-gradient-to-r from-brand-dark via-brand-green to-brand-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern"></div>
        <div className="relative container mx-auto px-4 h-full flex items-center justify-center">
          <div className="text-center text-white max-w-4xl animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
              Welcome to Snookermania & Café
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
              Where world-class snooker meets a cozy café experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/booking"
                className="px-8 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105 text-lg"
              >
                Book a Table
              </Link>
              <Link
                to="/pricing"
                className="px-8 py-3 bg-white text-brand-dark font-bold rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 text-lg"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-40 h-40 bg-brand-gold opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-brand-gold opacity-5 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4">
            Why Choose Us
          </h2>
          <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto">
            Experience the perfect blend of premium snooker facilities and a
            cozy café
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-lg border border-gray-200 hover:border-brand-green hover:shadow-lg transition-all text-center animate-slide-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="inline-block p-3 bg-brand-green bg-opacity-10 rounded-lg mb-4">
                    <Icon size={32} className="text-brand-green" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Snooker Area Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-12">
            Our Snooker Area
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div
              className={`w-full h-96 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r ${snookerSlides[currentSlide].color}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-4xl font-bold mb-2">
                    {snookerSlides[currentSlide].title}
                  </h3>
                  <p className="text-xl text-gray-200">
                    {snookerSlides[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevSnookerSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-brand-green text-white p-3 rounded-full hover:bg-brand-dark transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextSnookerSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-brand-green text-white p-3 rounded-full hover:bg-brand-dark transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {snookerSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide
                      ? "bg-brand-green w-8"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-4xl font-bold text-brand-gold mb-2">12+</p>
              <p className="text-gray-600">Professional Tables</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-brand-gold mb-2">24/7</p>
              <p className="text-gray-600">Premium Lighting</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-brand-gold mb-2">Expert</p>
              <p className="text-gray-600">Coaching Available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Café Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-12">
            Our Café
          </h2>

          <div className="relative max-w-4xl mx-auto">
            <div
              className={`w-full h-96 rounded-lg overflow-hidden shadow-2xl bg-gradient-to-r ${cafeSlides[currentSlide].color}`}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-white">
                  <h3 className="text-4xl font-bold mb-2">
                    {cafeSlides[currentSlide].title}
                  </h3>
                  <p className="text-xl text-gray-100">
                    {cafeSlides[currentSlide].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <button
              onClick={prevCafeSlide}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-16 bg-brand-green text-white p-3 rounded-full hover:bg-brand-dark transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextCafeSlide}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-16 bg-brand-green text-white p-3 rounded-full hover:bg-brand-dark transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={24} />
            </button>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-6">
              {cafeSlides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentSlide
                      ? "bg-brand-green w-8"
                      : "bg-gray-300"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-2xl font-bold text-brand-green mb-2">
                Premium Coffee
              </p>
              <p className="text-gray-600">Artisan blends from around the world</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-green mb-2">
                Fresh Snacks
              </p>
              <p className="text-gray-600">Daily baked pastries and light meals</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-brand-green mb-2">
                Comfortable Seating
              </p>
              <p className="text-gray-600">Relax between your games</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Teaser Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-4">
            Affordable Pricing
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Choose the perfect plan for your needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-12">
            {pricingTeasers.map((plan, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold text-brand-dark mb-3">
                  {plan.title}
                </h3>
                <p className="text-4xl font-bold text-brand-gold mb-2">
                  {plan.price}
                </p>
                <p className="text-gray-600 mb-6">{plan.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/pricing"
              className="inline-block px-8 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-opacity-90 transition-all transform hover:scale-105"
            >
              View Full Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center text-brand-dark mb-12">
            What Our Customers Say
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-50 p-8 md:p-12 rounded-lg shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(testimonials[testimonialsSlide].rating)].map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className="text-brand-gold fill-brand-gold"
                    />
                  )
                )}
              </div>
              <p className="text-xl text-gray-700 mb-6 italic">
                "{testimonials[testimonialsSlide].text}"
              </p>
              <p className="font-semibold text-brand-dark mb-1">
                {testimonials[testimonialsSlide].name}
              </p>
              <p className="text-gray-600">
                {testimonials[testimonialsSlide].role}
              </p>

              {/* Dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setTestimonialsSlide(idx)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      idx === testimonialsSlide
                        ? "bg-brand-green w-8"
                        : "bg-gray-300"
                    }`}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-brand-green to-brand-dark">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Play?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your table now and enjoy the best snooker experience in the
            city
          </p>
          <Link
            to="/booking"
            className="inline-block px-10 py-4 bg-brand-gold text-brand-dark font-bold text-lg rounded-lg hover:bg-yellow-500 transition-all transform hover:scale-105"
          >
            Book Your Table Now
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
