import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Users, Trophy, TrendingUp } from "lucide-react";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  format: string;
  entryFee: number;
  maxParticipants: number;
  currentParticipants: number;
}

const Events = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("/api/events");
        const data = await response.json();
        if (data.success) {
          setEvents(data.events);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero */}
        <section className="bg-gradient-to-r from-brand-dark to-brand-green py-12 md:py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Events & Tournaments
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Join exciting snooker tournaments and compete with players from
              across the city
            </p>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-green"></div>
              </div>
            ) : events.length > 0 ? (
              <div className="space-y-6 mb-12">
                {events.map((event) => {
                  const participationRate = Math.round(
                    (event.currentParticipants / event.maxParticipants) * 100
                  );
                  const isFull = event.currentParticipants >= event.maxParticipants;

                  return (
                    <div
                      key={event.id}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 md:p-8">
                        {/* Event Details */}
                        <div className="md:col-span-2">
                          <div className="flex items-start gap-4 mb-4">
                            <div className="inline-block p-3 bg-brand-gold bg-opacity-20 rounded-lg">
                              <Trophy
                                size={24}
                                className="text-brand-gold"
                              />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-2xl font-bold text-brand-dark mb-2">
                                {event.title}
                              </h3>
                              <p className="text-gray-600">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Event Info */}
                        <div className="md:col-span-2 space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                              <Calendar
                                size={20}
                                className="text-blue-600"
                              />
                              <div>
                                <p className="text-xs text-gray-600">Date</p>
                                <p className="font-semibold text-gray-800">
                                  {formatDate(event.date)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                              <span className="text-xl">🕐</span>
                              <div>
                                <p className="text-xs text-gray-600">Time</p>
                                <p className="font-semibold text-gray-800">
                                  {event.time}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                              <Users
                                size={20}
                                className="text-green-600"
                              />
                              <div>
                                <p className="text-xs text-gray-600">
                                  Participants
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {event.currentParticipants}/{event.maxParticipants}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                              <span className="text-xl">₹</span>
                              <div>
                                <p className="text-xs text-gray-600">
                                  Entry Fee
                                </p>
                                <p className="font-semibold text-gray-800">
                                  ₹{event.entryFee}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Participation Bar */}
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-sm font-semibold text-gray-700">
                                Spots Filled
                              </span>
                              <span className="text-sm font-bold text-brand-green">
                                {participationRate}%
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-brand-green h-2 rounded-full transition-all"
                                style={{ width: `${participationRate}%` }}
                              ></div>
                            </div>
                          </div>

                          {/* Register Button */}
                          <button
                            className={`w-full font-bold py-3 rounded-lg transition-colors ${
                              isFull
                                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                                : "bg-brand-gold text-brand-dark hover:bg-yellow-500"
                            }`}
                            disabled={isFull}
                          >
                            {isFull
                              ? "Event Full"
                              : "Register Now"}
                          </button>
                        </div>
                      </div>

                      {/* Footer with Format */}
                      <div className="bg-gray-50 px-6 md:px-8 py-4 flex items-center justify-between">
                        <span className="flex items-center gap-2 text-gray-700">
                          <TrendingUp size={16} className="text-brand-green" />
                          <span className="text-sm">
                            Format: <strong>{event.format}</strong>
                          </span>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No events scheduled at the moment. Check back soon!
                </p>
              </div>
            )}

            {/* Upcoming Events Notice */}
            <div className="bg-brand-green bg-opacity-10 border-l-4 border-brand-green p-6 rounded-lg">
              <h3 className="font-bold text-brand-dark mb-2">
                More Events Coming Soon!
              </h3>
              <p className="text-gray-700">
                We're planning exciting new tournaments and special events.
                Subscribe to our newsletter to stay updated.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Events;
