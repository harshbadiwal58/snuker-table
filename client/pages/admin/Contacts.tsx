import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AlertCircle, Loader, Mail } from "lucide-react";

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

const AdminContacts = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate("/");
      return;
    }

    const fetchContacts = async () => {
      try {
        const response = await fetch("/api/admin/contacts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (data.success) {
          setContacts(data.contacts);
        } else {
          setError(data.error || "Failed to load contacts");
        }
      } catch (err) {
        setError("Failed to load contacts");
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      fetchContacts();
    }
  }, [user, token, navigate]);

  if (!user || !user.isAdmin) return null;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-brand-dark mb-8">
            Contact Messages
          </h1>

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-lg mb-6">
              <AlertCircle size={20} className="text-red-600 mt-0.5" />
              <span className="text-red-700">{error}</span>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1">
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader
                    size={40}
                    className="animate-spin text-brand-green"
                  />
                </div>
              ) : contacts.length > 0 ? (
                <div className="space-y-3 max-h-screen overflow-y-auto">
                  {contacts.map((contact) => (
                    <div
                      key={contact.id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 rounded-lg cursor-pointer transition-all ${
                        selectedContact?.id === contact.id
                          ? "bg-brand-green text-white shadow-lg"
                          : "bg-white hover:shadow-lg"
                      }`}
                    >
                      <h3
                        className={`font-bold ${
                          selectedContact?.id === contact.id
                            ? "text-white"
                            : "text-gray-800"
                        }`}
                      >
                        {contact.name}
                      </h3>
                      <p
                        className={`text-sm ${
                          selectedContact?.id === contact.id
                            ? "text-gray-100"
                            : "text-gray-600"
                        }`}
                      >
                        {contact.subject}
                      </p>
                      <p
                        className={`text-xs ${
                          selectedContact?.id === contact.id
                            ? "text-gray-100"
                            : "text-gray-500"
                        } mt-2`}
                      >
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg">
                  <p className="text-gray-600">No contact messages</p>
                </div>
              )}
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              {selectedContact ? (
                <div className="bg-white rounded-lg shadow-lg p-8 h-full">
                  <div className="mb-6 pb-6 border-b">
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">
                      {selectedContact.subject}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      From: <strong>{selectedContact.name}</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b">
                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">
                        Email
                      </p>
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-brand-green font-semibold hover:underline flex items-center gap-2"
                      >
                        <Mail size={16} />
                        {selectedContact.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 uppercase mb-1">
                        Phone
                      </p>
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-brand-green font-semibold hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-600 uppercase mb-1">
                        Received
                      </p>
                      <p className="text-gray-700">
                        {new Date(selectedContact.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600 uppercase mb-3 font-semibold">
                      Message
                    </p>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {selectedContact.message}
                    </p>
                  </div>

                  <div className="mt-8 pt-6 border-t flex gap-3">
                    <a
                      href={`mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`}
                      className="flex-1 px-6 py-3 bg-brand-green text-white font-bold rounded-lg hover:bg-opacity-90 transition-colors text-center"
                    >
                      Reply
                    </a>
                    <button
                      onClick={() => setSelectedContact(null)}
                      className="flex-1 px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-400 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-lg p-8 flex items-center justify-center h-full min-h-96">
                  <p className="text-gray-600 text-lg">
                    Select a message to view details
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 p-4 bg-brand-green bg-opacity-10 rounded-lg">
            <p className="text-sm text-gray-700">
              Total Messages: <strong>{contacts.length}</strong>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminContacts;
