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
      dueDate: "03/15/2025",
      paidDate: "03/15/2025",
      paymentAmount: 15.99,
    },
    {
      name: "Spotify",
      dueDate: "03/10/2025",
      paidDate: "03/11/2025",
      paymentAmount: 9.99,
    },
  ];

  return (
    <div className="bills-page">
      <h1 className="page-title">My Bills</h1>

      {/* Upcoming Bills */}
      <div className="card-container">
        <h2 className="card-title">Upcoming Bills (Next 2 Weeks)</h2>
        {upcomingBills.length === 0 ? (
          <p className="no-upcoming-bills">
            No upcoming bills within two weeks.
          </p>
        ) : (
          <ul className="upcoming-bills-list">
            {upcomingBills.map((bill, index) => (
              <li key={index} className="upcoming-bill-item">
                <span>{bill.name}</span> - Due: <span>{bill.dueDate}</span> - $
                <span>{bill.paymentDue}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Subscriptions Table */}
      <div className="card-container">
        <h2 className="card-title">Subscription Bills</h2>
        <table className="subscriptions-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Due Date</th>
              <th>Past Due</th>
              <th>Amount ($)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {activeSubscriptions.map((sub, index) => {
              const dueDate = new Date(sub.dueDate);
              const isPastDue = dueDate < new Date();
              return (
                <tr key={index}>
                  <td>{sub.name}</td>
                  <td>
                    {dueDate.toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td>{isPastDue ? "Yes" : "No"}</td>
                  <td>${sub.cost.toFixed(2)}</td>
                  <td>{sub.paymentStatus}</td>
                  <td>
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
                      className="mark-unpaid-btn"
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
                  </td>
                </tr>
              );
            })}
            <tr>
              <td colSpan={3}>Total (Paid)</td>
              <td>${totalPaid}</td>
              <td>Paid</td>
            </tr>
            <tr>
              <td colSpan={3}>Total</td>
              <td>${total}</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Payment History */}
      <div className="card-container">
        <h2 className="card-title">Payment History</h2>
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
            <span className="history-amount">${payment.paymentAmount.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillsPage;
