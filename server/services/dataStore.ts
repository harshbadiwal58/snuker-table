// In-memory data store for the application
// In production, this would be replaced with a real database

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  membershipType?: string;
  membershipExpiry?: string;
  createdAt: string;
}

interface Booking {
  id: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  numberOfPlayers: number;
  tableNumber: number;
  status: "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  createdAt: string;
}

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
  createdAt: string;
}

interface MenuItem {
  id: string;
  category: "hot-beverages" | "cold-beverages" | "snacks" | "desserts";
  name: string;
  price: number;
  description: string;
  image?: string;
}

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
}

// Initialize data store
export const dataStore = {
  users: [
    {
      id: "1",
      name: "Admin User",
      email: "admin@snookermania.com",
      phone: "+91 98765 43210",
      password: "admin123",
      createdAt: new Date().toISOString(),
    } as User,
    {
      id: "2",
      name: "Rajesh Kumar",
      email: "rajesh@example.com",
      phone: "+91 98765 43211",
      password: "pass123",
      membershipType: "Gold",
      membershipExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      createdAt: new Date().toISOString(),
    } as User,
  ] as User[],

  bookings: [
    {
      id: "1",
      userId: "2",
      date: "2024-01-20",
      startTime: "14:00",
      endTime: "15:30",
      duration: 1.5,
      numberOfPlayers: 2,
      tableNumber: 3,
      status: "confirmed",
      totalPrice: 225,
      createdAt: new Date().toISOString(),
    } as Booking,
    {
      id: "2",
      userId: "2",
      date: "2024-01-21",
      startTime: "10:00",
      endTime: "11:00",
      duration: 1,
      numberOfPlayers: 2,
      tableNumber: 5,
      status: "confirmed",
      totalPrice: 150,
      createdAt: new Date().toISOString(),
    } as Booking,
  ] as Booking[],

  events: [
    {
      id: "1",
      title: "Weekend Championship 2024",
      description: "An exciting snooker championship for all skill levels",
      date: "2024-02-10",
      time: "18:00",
      format: "Single Elimination",
      entryFee: 500,
      maxParticipants: 16,
      currentParticipants: 12,
      createdAt: new Date().toISOString(),
    } as Event,
    {
      id: "2",
      title: "Beginner's Cup",
      description: "Perfect for those new to professional snooker",
      date: "2024-02-15",
      time: "15:00",
      format: "Round Robin",
      entryFee: 300,
      maxParticipants: 8,
      currentParticipants: 6,
      createdAt: new Date().toISOString(),
    } as Event,
    {
      id: "3",
      title: "Pro League Match",
      description: "High-level competitive match",
      date: "2024-02-20",
      time: "19:00",
      format: "Best of 9",
      entryFee: 1000,
      maxParticipants: 2,
      currentParticipants: 2,
      createdAt: new Date().toISOString(),
    } as Event,
  ] as Event[],

  menu: [
    // Hot Beverages
    {
      id: "1",
      category: "hot-beverages",
      name: "Espresso",
      price: 80,
      description: "Strong Italian espresso shot",
      image: "🍵",
    } as MenuItem,
    {
      id: "2",
      category: "hot-beverages",
      name: "Cappuccino",
      price: 120,
      description: "Espresso with steamed milk and foam",
      image: "🍵",
    } as MenuItem,
    {
      id: "3",
      category: "hot-beverages",
      name: "Latte",
      price: 130,
      description: "Creamy coffee with hot milk",
      image: "🍵",
    } as MenuItem,
    {
      id: "4",
      category: "hot-beverages",
      name: "Mocha",
      price: 140,
      description: "Espresso with chocolate and milk",
      image: "🍵",
    } as MenuItem,
    // Cold Beverages
    {
      id: "5",
      category: "cold-beverages",
      name: "Iced Coffee",
      price: 110,
      description: "Cold brew iced coffee",
      image: "🧊",
    } as MenuItem,
    {
      id: "6",
      category: "cold-beverages",
      name: "Cold Brew",
      price: 120,
      description: "Smooth cold brew concentrate",
      image: "🧊",
    } as MenuItem,
    {
      id: "7",
      category: "cold-beverages",
      name: "Milkshake",
      price: 150,
      description: "Vanilla, chocolate, or strawberry",
      image: "🧊",
    } as MenuItem,
    {
      id: "8",
      category: "cold-beverages",
      name: "Fresh Juice",
      price: 100,
      description: "Orange, apple, or mixed",
      image: "🧊",
    } as MenuItem,
    // Snacks
    {
      id: "9",
      category: "snacks",
      name: "Croissant",
      price: 90,
      description: "Buttery French croissant",
      image: "🥐",
    } as MenuItem,
    {
      id: "10",
      category: "snacks",
      name: "Muffin",
      price: 80,
      description: "Chocolate chip or blueberry",
      image: "🧁",
    } as MenuItem,
    {
      id: "11",
      category: "snacks",
      name: "Sandwich",
      price: 200,
      description: "Grilled cheese or turkey",
      image: "🥪",
    } as MenuItem,
    {
      id: "12",
      category: "snacks",
      name: "Samosa",
      price: 50,
      description: "Crispy vegetable or meat",
      image: "🥟",
    } as MenuItem,
    // Desserts
    {
      id: "13",
      category: "desserts",
      name: "Cheesecake",
      price: 150,
      description: "Classic New York cheesecake",
      image: "🍰",
    } as MenuItem,
    {
      id: "14",
      category: "desserts",
      name: "Brownie",
      price: 100,
      description: "Fudgy chocolate brownie",
      image: "🍫",
    } as MenuItem,
    {
      id: "15",
      category: "desserts",
      name: "Ice Cream",
      price: 120,
      description: "Vanilla, chocolate, or strawberry",
      image: "🍦",
    } as MenuItem,
  ] as MenuItem[],

  contacts: [] as Contact[],
};

// Helper functions for data access
export const dataStoreService = {
  // User operations
  findUserByEmail: (email: string) => {
    return dataStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  },

  findUserById: (id: string) => {
    return dataStore.users.find((u) => u.id === id);
  },

  createUser: (user: Omit<User, "id" | "createdAt">) => {
    const newUser: User = {
      ...user,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dataStore.users.push(newUser);
    return newUser;
  },

  // Booking operations
  getBookingsByUserId: (userId: string) => {
    return dataStore.bookings.filter((b) => b.userId === userId);
  },

  getAllBookings: () => {
    return dataStore.bookings;
  },

  createBooking: (booking: Omit<Booking, "id" | "createdAt">) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dataStore.bookings.push(newBooking);
    return newBooking;
  },

  updateBooking: (id: string, updates: Partial<Booking>) => {
    const index = dataStore.bookings.findIndex((b) => b.id === id);
    if (index !== -1) {
      dataStore.bookings[index] = { ...dataStore.bookings[index], ...updates };
      return dataStore.bookings[index];
    }
    return null;
  },

  // Event operations
  getAllEvents: () => {
    return dataStore.events;
  },

  getEventById: (id: string) => {
    return dataStore.events.find((e) => e.id === id);
  },

  // Menu operations
  getMenuItems: (category?: string) => {
    if (category) {
      return dataStore.menu.filter((m) => m.category === category);
    }
    return dataStore.menu;
  },

  // Contact operations
  saveContact: (contact: Omit<Contact, "id" | "createdAt">) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    dataStore.contacts.push(newContact);
    return newContact;
  },

  getAllContacts: () => {
    return dataStore.contacts;
  },

  // Check table availability
  isTableAvailable: (tableNumber: number, date: string, startTime: string, endTime: string) => {
    const conflictingBookings = dataStore.bookings.filter(
      (b) =>
        b.tableNumber === tableNumber &&
        b.date === date &&
        b.status !== "cancelled" &&
        ((startTime >= b.startTime && startTime < b.endTime) ||
          (endTime > b.startTime && endTime <= b.endTime) ||
          (startTime <= b.startTime && endTime >= b.endTime))
    );
    return conflictingBookings.length === 0;
  },

  // Get available tables
  getAvailableTables: (date: string, startTime: string, endTime: string) => {
    const totalTables = 12;
    const availableTables = [];
    for (let i = 1; i <= totalTables; i++) {
      if (dataStoreService.isTableAvailable(i, date, startTime, endTime)) {
        availableTables.push(i);
      }
    }
    return availableTables;
  },
};
