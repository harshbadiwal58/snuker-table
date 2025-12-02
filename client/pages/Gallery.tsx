import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X } from "lucide-react";

const Gallery = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    {
      id: 1,
      category: "snooker",
      title: "Professional Tables",
      emoji: "🎱",
      description: "State-of-the-art snooker tables",
    },
    {
      id: 2,
      category: "snooker",
      title: "Premium Lighting",
      emoji: "💡",
      description: "Perfect lighting for professional play",
    },
    {
      id: 3,
      category: "cafe",
      title: "Cozy Lounge",
      emoji: "☕",
      description: "Comfortable seating and ambiance",
    },
    {
      id: 4,
      category: "cafe",
      title: "Café Menu",
      emoji: "🍰",
      description: "Fresh pastries and beverages",
    },
    {
      id: 5,
      category: "events",
      title: "Tournament in Progress",
      emoji: "🏆",
      description: "Competitive snooker tournament",
    },
    {
      id: 6,
      category: "events",
      title: "Championship Trophy",
      emoji: "🥇",
      description: "Winners celebration",
    },
    {
      id: 7,
      category: "snooker",
      title: "VIP Tables",
      emoji: "👑",
      description: "Exclusive VIP gaming zones",
    },
    {
      id: 8,
      category: "cafe",
      title: "Signature Drinks",
      emoji: "🧃",
      description: "Our special coffee blends",
    },
  ];

  const filters = [
    { id: "all", label: "All" },
    { id: "snooker", label: "Snooker" },
    { id: "cafe", label: "Café" },
    { id: "events", label: "Events" },
  ];

  const filtered = images.filter(
    (img) => selectedFilter === "all" || img.category === selectedFilter
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-dark to-brand-green py-12 md:py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Photo Gallery
            </h1>
            <p className="text-xl text-gray-200">
              Explore our facilities and events
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            {/* Filter Buttons */}
            <div className="flex justify-center gap-4 mb-12 flex-wrap">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-6 py-2 rounded-full font-semibold transition-all ${
                    selectedFilter === filter.id
                      ? "bg-brand-gold text-brand-dark"
                      : "bg-white text-gray-700 border-2 border-gray-300 hover:border-brand-green"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {filtered.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image.id.toString())}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-all cursor-pointer transform hover:scale-105"
                >
                  <div className="w-full h-64 bg-gradient-to-br from-brand-green to-brand-dark flex items-center justify-center relative">
                    <span className="text-7xl">{image.emoji}</span>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-end justify-start p-4">
                      <div className="text-white transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <h3 className="font-bold text-lg">{image.title}</h3>
                        <p className="text-sm text-gray-200">
                          {image.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No images found for this category.
                </p>
              </div>
            )}

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: "Total Photos", value: images.length },
                { label: "Snooker Tables", value: 12 },
                { label: "Café Sections", value: 5 },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg shadow-lg text-center"
                >
                  <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                  <p className="text-4xl font-bold text-brand-green">
                    {stat.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-2xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300"
            >
              <X size={32} />
            </button>

            {(() => {
              const image = images.find(
                (img) => img.id.toString() === selectedImage
              );
              if (!image) return null;

              return (
                <div className="bg-white rounded-lg overflow-hidden shadow-2xl">
                  <div className="bg-gradient-to-br from-brand-green to-brand-dark h-96 flex items-center justify-center">
                    <span className="text-9xl">{image.emoji}</span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">
                      {image.title}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {image.description}
                    </p>
                    <p className="text-sm text-gray-500">
                      Category:{" "}
                      <span className="capitalize font-semibold">
                        {image.category}
                      </span>
                    </p>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
