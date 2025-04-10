import React, { createContext, useState } from "react";
import {Outlet} from "react-router-dom";
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
    { name: "Netflix", status: "Active", paymentStatus: "Unpaid", cycle: "Monthly", cost: 15.99, dueDate: "2025-04-15" },
    { name: "Spotify", status: "Inactive", paymentStatus: "Unpaid", cycle: "Monthly", cost: 9.99, dueDate: "2025-04-10" },
    { name: "Hulu", status: "Active", paymentStatus: "Unpaid", cycle: "Monthly", cost: 9.99, dueDate: "2025-04-20" },
    { name: "Microsoft 365", status: "Active", paymentStatus: "Paid", cycle: "Annually", cost: 99.99, dueDate: "2025-06-01" },
    { name: "Amazon Prime", status: "Active", paymentStatus: "Unpaid", cycle: "Annually", cost: 100.0, dueDate: "2025-07-05" },
    { name: "HBO Max", status: "Inactive", paymentStatus: "Unpaid", cycle: "Monthly", cost: 15.99, dueDate: "2025-04-18" },
  ]);

  const [user, setUser] = useState<{ username: string } | null>(null);

  return (
    <AppContext.Provider
      value={{ subscriptions, setSubscriptions, user, setUser }}
    >
      <div className="app-layout">
        <Header />
        <main className="main-content">
          <Outlet />{" "}
          {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
        </main>
        {/* <Navbar /> */}
        <Footer />
      </div>
    </AppContext.Provider>
  );
}


export default App;
