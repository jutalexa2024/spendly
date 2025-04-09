import React, { createContext, useState } from "react";
import {Outlet } from "react-router-dom";
import Header from "./components/header/index";
import Footer from "./components/footer/index";

function App() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { name: "Netflix", status: "Active", paymentStatus: "Unpaid", cycle: "Monthly", cost: 15.99, dueDate: "2025-04-15" },
    { name: "Spotify", status: "Inactive", paymentStatus: "Unpaid", cycle: "Monthly", cost: 9.99, dueDate: "2025-04-10" },
    { name: "Hulu", status: "Active", paymentStatus: "Unpaid", cycle: "Monthly", cost: 9.99, dueDate: "2025-04-20" },
    { name: "Microsoft 365", status: "Active", paymentStatus: "Paid", cycle: "Annually", cost: 99.99, dueDate: "2025-06-01" },
    { name: "Amazon Prime", status: "Active", paymentStatus: "Unpaid", cycle: "Annually", cost: 100.0, dueDate: "2025-07-05" },
    { name: "HBO Max", status: "Inactive", paymentStatus: "Unpaid", cycle: "Monthly", cost: 15.99, dueDate: "2025-04-18" },
  ]);

  return (
    <AppContext.Provider value={{ subscriptions, setSubscriptions}}>
      <Header />
      {/* <Navbar /> */}
      <Outlet /> {/* This is where child pages (Login, Dashboard, etc.) will be displayed */}
      <Footer />
      
    </AppContext.Provider>
    
  );
}


export default App;
