import React, { useContext } from "react";
import { AppContext } from "../App";
import "../styles/bills.css";

const BillsPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return <p>Error: AppContext not available.</p>;

  const { subscriptions, setSubscriptions } = context;

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "Active"
  );

  const getUpcomingBills = () => {
    const today = new Date();
    const twoWeeksFromToday = new Date(today);
    twoWeeksFromToday.setDate(today.getDate() + 14);

    return activeSubscriptions
      .map((sub) => {
        const dueDate = new Date(sub.dueDate);
        if (dueDate >= today && dueDate <= twoWeeksFromToday) {
          return {
            name: sub.name,
            dueDate: dueDate.toLocaleDateString("en-US", {
              month: "2-digit",
              day: "2-digit",
              year: "numeric",
            }),
            paymentDue: sub.cost.toFixed(2),
          };
        }
        return null;
      })
      .filter(Boolean) as { name: string; dueDate: string; paymentDue: string }[];
  };

  const calculateTotals = () => {
    const totalPaid = activeSubscriptions.reduce(
      (sum, sub) => (sub.paymentStatus === "Paid" ? sum + sub.cost : sum),
      0
    );
    const total = activeSubscriptions.reduce((sum, sub) => sum + sub.cost, 0);
    return { totalPaid: totalPaid.toFixed(2), total: total.toFixed(2) };
  };

  const upcomingBills = getUpcomingBills();
  const { totalPaid, total } = calculateTotals();

  const paymentHistory = [
    {
      name: "Netflix",
      dueDate: "03/14/2025",
      paidDate: "03/14/2025",
      paymentAmount: 15.99,
    },
    {
      name: "Spotify",
      dueDate: "03/10/2025",
      paidDate: "03/11/2025",
      paymentAmount: 9.99,
    },
    {
      name: "Apple Music",
      dueDate: "12/14/2024",
      paidDate: "12/14/2024",
      paymentAmount: 12.00,
    },
    {
      name: "Disney Plus",
      dueDate: "03/10/2025",
      paidDate: "03/11/2025",
      paymentAmount: 9.99,
    },
  ];

  return (
    <div className="bills-page">
      <h1 className="page-title">My Bills</h1>

      {/* Upcoming Bills */}
      <div className="upcoming-bills-card-container">
        <h2 className="upcoming-bills-card-title">
          Upcoming Bills (Next 2 Weeks)
        </h2>
        {upcomingBills.length === 0 ? (
          <p className="no-upcoming-bills">
            No upcoming bills within two weeks.
          </p>
        ) : (
          <div className="upcoming-bills-list">
            {upcomingBills.map((bill, index) => (
              <div key={index} className="upcoming-bill-item">
                <div className="upcoming-bill-info">
                  <div className="upcoming-bill-name">{bill.name}</div>
                  <div className="upcoming-bill-due-date">
                    Due Date: {bill.dueDate}
                  </div>
                </div>
                <div className="upcoming-bill-amount-due">
                  ${bill.paymentDue}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Subscriptions Table */}
      <div className="subscriptions-card-container">
        <h2 className="subscriptions-card-title">Subscription Bills</h2>
        <div className="subscriptions-table-header">
          <span className="subscriptions-header-name">Name</span>
          <span className="subscriptions-header-due-Date">Due Date</span>
          <span className="subscriptions-header-past-Due">Past Due</span>
          <span className="subscriptions-header-cost">Amount</span>
          <span className="subscriptions-header-status">Status</span>
          <span className="subscriptions-header-actions">Actions</span>
        </div>

        {activeSubscriptions.map((sub, index) => {
          const dueDate = new Date(sub.dueDate);
          const isPastDue = dueDate < new Date();

          return (
            <div key={index} className="subscriptions-row">
              <span className="subscriptions-name">{sub.name}</span>
              <span className="subscriptions-due-date">
                {dueDate.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="subscriptions-past-due">{isPastDue ? "Yes" : "No"}</span>
              <span className="subscriptions-cost">${sub.cost.toFixed(2)}</span>
              <span className="subscriptions-status">{sub.paymentStatus}</span>

              <div className="subscriptions-actions">
                <button
                  className="paid-btn"
                  onClick={() =>
                    setSubscriptions((prev) =>
                      prev.map((s) =>
                        s.name === sub.name
                          ? { ...s, paymentStatus: "Paid" }
                          : s
                      )
                    )
                  }
                >
                  Paid
                </button>

                <button
                  className="unpaid-btn"
                  onClick={() =>
                    setSubscriptions((prev) =>
                      prev.map((s) =>
                        s.name === sub.name
                          ? { ...s, paymentStatus: "Unpaid" }
                          : s
                      )
                    )
                  }
                >
                  Unpaid
                </button>
              </div>
            </div>
          );
        })}

        <div className="subscriptions-totals">
          <div className="total-row">
            <span className="total-label">Total (Paid):</span>
            <span className="total-value">${totalPaid}</span>
          </div>
          <div className="total-row">
            <span className="total-label">Grand Total:</span>
            <span className="total-value">${total}</span>
          </div>
        </div>
      </div>

      {/* Payment History */}
      <div className="history-card-container">
        <h2 className="history-card-title">Payment History</h2>
        <div className="history-table-header">
          <span className="history-header-name">Name</span>
          <span className="history-header-dueDate">Due Date</span>
          <span className="history-header-paidDate">Paid Date</span>
          <span className="history-header-amount">Amount</span>
        </div>

        {paymentHistory.map((payment, index) => (
          <div className="history-row" key={index}>
            <span className="history-name">{payment.name}</span>
            <span className="history-dueDate">{payment.dueDate}</span>
            <span className="history-paidDate">{payment.paidDate}</span>
            <span className="history-amount">
              ${payment.paymentAmount.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
