import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check } from "lucide-react";

const Pricing = () => {
  const passes = [
    {
      name: "Hourly Rate",
      price: "₹150-300",
      period: "Per Hour",
      description: "Pay as you play",
      benefits: [
        "Weekday: ₹150/hour",
        "Weekend: ₹300/hour",
        "No membership required",
        "Book anytime",
        "Free cancellation (2h before)",
        "Premium tables included",
      ],
      popular: false,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Daily Pass",
      price: "₹1,500",
      period: "Per Day",
      description: "24-hour unlimited access",
      benefits: [
        "Unlimited games (24 hours)",
        "All tables included",
        "Free food coupon (₹500)",
        "Priority booking",
        "Guest entry included",
        "Member badge",
      ],
      popular: false,
      color: "from-purple-600 to-purple-700",
    },
    {
      name: "Silver Pass",
      price: "₹2,999",
      period: "Per Month",
      description: "Great for casual players",
      benefits: [
        "20 hours per month",
        "All premium tables",
        "10% café discount",
        "Priority bookings",
        "Free equipment rental",
        "Monthly tournament access",
      ],
      popular: false,
      color: "from-gray-600 to-gray-700",
    },
    {
      name: "Gold Pass",
      price: "₹4,999",
      period: "Per Month",
      description: "Most popular choice",
      benefits: [
        "40 hours per month",
        "All premium tables",
        "20% café discount",
        "Priority bookings",
        "Free coaching (2 sessions)",
        "All events included",
      ],
      popular: true,
      color: "from-brand-gold to-yellow-600",
    },
    {
      name: "Platinum Pass",
      price: "₹9,999",
      period: "Per Month",
      description: "For serious enthusiasts",
      benefits: [
        "Unlimited hours",
        "VIP tables reserved",
        "30% café discount",
        "24/7 priority support",
        "Free monthly coaching",
        "Exclusive tournaments",
      ],
      popular: false,
      color: "from-brand-green to-emerald-700",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-brand-dark to-brand-green py-12 md:py-16 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Flexible Pricing Plans
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
              Choose the perfect plan for your snooker experience. All plans
              include access to our premium facilities.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
              {passes.map((pass, idx) => (
                <div
                  key={idx}
                  className={`relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 ${
                    pass.popular ? "ring-2 ring-brand-gold scale-105" : ""
                  }`}
                >
                  {/* Badge for popular */}
                  {pass.popular && (
                    <div className="absolute -rotate-45 right-0 top-8 w-32 bg-brand-gold text-brand-dark font-bold text-center py-1 text-sm">
                      POPULAR
                    </div>
                  )}

                  <div
                    className={`bg-gradient-to-br ${pass.color} text-white p-6`}
                  >
                    <h3 className="text-2xl font-bold mb-2">{pass.name}</h3>
                    <p className="text-sm opacity-90 mb-4">{pass.description}</p>
                    <div className="mb-2">
                      <span className="text-4xl font-bold">{pass.price}</span>
                      <span className="text-sm opacity-75 ml-2">{pass.period}</span>
                    </div>
                  </div>

                  <div className="p-6 bg-white">
                    <ul className="space-y-3 mb-6">
                      {pass.benefits.map((benefit, bidx) => (
                        <li
                          key={bidx}
                          className="flex items-start gap-3 text-sm"
                        >
                          <Check
                            size={18}
                            className="text-brand-green flex-shrink-0 mt-0.5"
                          />
                          <span className="text-gray-700">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/booking"
                      className={`block w-full text-center py-2 rounded-lg font-semibold transition-colors ${
                        pass.popular
                          ? "bg-brand-gold text-brand-dark hover:bg-yellow-500"
                          : "bg-brand-green text-white hover:bg-opacity-90"
                      }`}
                    >
                      Choose Plan
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison Table */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                Detailed Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b-2 border-brand-green">
                      <th className="text-left p-4 font-semibold text-brand-dark">
                        Feature
                      </th>
                      <th className="text-center p-4 font-semibold text-brand-dark">
                        Hourly
                      </th>
                      <th className="text-center p-4 font-semibold text-brand-dark">
                        Daily
                      </th>
                      <th className="text-center p-4 font-semibold text-brand-dark">
                        Silver
                      </th>
                      <th className="text-center p-4 font-semibold text-brand-dark">
                        Gold
                      </th>
                      <th className="text-center p-4 font-semibold text-brand-dark">
                        Platinum
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Premium Tables", values: [true, true, true, true, true] },
                      {
                        feature: "Coaching Sessions",
                        values: [false, false, false, true, true],
                      },
                      {
                        feature: "Priority Support",
                        values: [false, true, true, true, true],
                      },
                      {
                        feature: "Event Access",
                        values: [false, false, true, true, true],
                      },
                      {
                        feature: "Café Discount",
                        values: [false, false, "10%", "20%", "30%"],
                      },
                      {
                        feature: "Equipment Rental",
                        values: [false, true, true, true, true],
                      },
                    ].map((row, idx) => (
                      <tr
                        key={idx}
                        className="border-b border-gray-200 hover:bg-gray-50"
                      >
                        <td className="p-4 font-semibold text-gray-700">
                          {row.feature}
                        </td>
                        {row.values.map((value, vidx) => (
                          <td key={vidx} className="p-4 text-center">
                            {typeof value === "boolean" ? (
                              value ? (
                                <Check
                                  size={20}
                                  className="text-brand-green mx-auto"
                                />
                              ) : (
                                <span className="text-gray-300">—</span>
                              )
                            ) : (
                              <span className="text-brand-green font-semibold">
                                {value}
                              </span>
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold text-brand-dark mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                {[
                  {
                    q: "Can I switch between plans?",
                    a: "Yes, you can upgrade or downgrade your plan anytime. Changes take effect at the beginning of the next billing cycle.",
                  },
                  {
                    q: "What if I don't use all my hours?",
                    a: "Monthly pass hours expire at the end of the billing month. They do not rollover. Use them or lose them!",
                  },
                  {
                    q: "Are guests included in passes?",
                    a: "Daily and higher plans include one guest entry. Additional guests pay 50% of the normal rate.",
                  },
                  {
                    q: "Can I cancel anytime?",
                    a: "Monthly plans can be cancelled with 7 days notice. No cancellation fees apply.",
                  },
                  {
                    q: "Do you offer discounts for bulk bookings?",
                    a: "Yes! Contact us for group rates and corporate packages.",
                  },
                ].map((faq, idx) => (
                  <div key={idx}>
                    <h3 className="font-semibold text-brand-dark mb-2">
                      {faq.q}
                    </h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-brand-green to-brand-dark py-12 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-6 max-w-md mx-auto">
              Join thousands of snooker enthusiasts enjoying premium facilities
            </p>
            <Link
              to="/booking"
              className="inline-block px-10 py-3 bg-brand-gold text-brand-dark font-bold rounded-lg hover:bg-yellow-500 transition-colors"
            >
              Book Now
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Pricing;
