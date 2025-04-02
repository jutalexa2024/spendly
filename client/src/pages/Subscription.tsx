import React from "react";
import "../styles/subscription.css";

// Mock data
const subscriptions = [
    { name: "Netflix", cost: "$15.99" },
    { name: "Spotify", cost: "$9.99" },
    { name: "Hulu", cost: "$12.99" },
    { name: "Microsoft 365", cost: "$9.99" },
    { name: "Amazon Prime", cost: "$12.99" },
    { name: "HBO Max", cost: "$14.99" },
  ];

  const SubscriptionPage = () => {
    return (
      <div className="subscription-container">
        <div className="table-header">
            <span className="subscription-header-name">Name</span>
            <span className="subscription-header-cost">Amount (Monthly)</span>
        </div>
        {subscriptions.map((subscription, index) => (
          <div className="subscription-row" key={index}>
            <span className="subscription-name">{subscription.name}</span>
            <span className="subscription-cost">{subscription.cost}</span>
          </div>
        ))}
      </div>
    );
  };
  
  export default SubscriptionPage;
  