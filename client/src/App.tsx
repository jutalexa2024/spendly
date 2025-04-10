import React, { createContext, useState } from "react";
import {Outlet } from "react-router-dom";
import Header from "./components/header/index";
import Footer from "./components/footer";

// Define the Subscription type
type Subscription = {
  name: string;
  status: "Active" | "Inactive";
  paymentStatus: "Paid" | "Unpaid";
  cycle: "Monthly" | "Annually";
  cost: number;
  dueDate: string;
  category: string;
};

// Create a context to provide subscriptions and their updater
export const AppContext = createContext<{
  subscriptions: Subscription[];
  setSubscriptions: React.Dispatch<React.SetStateAction<Subscription[]>>;
  user: { username: string } | null;
  setUser: React.Dispatch<React.SetStateAction<{ username: string } | null>>
} | null>(null);



function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { name: "Netflix", status: "Active", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-15", category: "streaming"},
    { name: "Spotify", status: "Inactive", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-10", category: "music" },
    { name: "Hulu", status: "Active", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-20", category: "streaming" },
    { name: "Microsoft 365", status: "Active", cycle: "Annually", cost: 99.99, paymentStatus: "Unpaid", dueDate: "2025-06-01", category: "software" },
    { name: "Amazon Prime", status: "Active", cycle: "Annually", cost: 100.00, paymentStatus: "Unpaid", dueDate: "2025-07-06", category: "streaming"},
    { name: "HBO Max", status: "Inactive", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-18", category: "streaming" },
  ]);

  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <AppContext.Provider value={{ subscriptions, setSubscriptions, user, setUser}}>
      <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
      <Footer />
    </AppContext.Provider>
    
  );
}


export default App;
