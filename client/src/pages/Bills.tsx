import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "../styles/bills.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BILLS } from "../utils/queries";
import { ADD_BILL, DELETE_BILL } from "../utils/mutations";

const BillsPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context || !context.user) {
    return <p>Error: AppContext or user not available.</p>;
  }
  
  const { user } = context;
  const { data, refetch } = useQuery(GET_USER_BILLS, {
    variables: { username: user?.username },
    skip: !user,
  });

  const [addBill] = useMutation(ADD_BILL);
  const [deleteBill] = useMutation(DELETE_BILL);
  const [newBill, setNewBill] = useState({
    name: "",
    category: "",
    amount: 0,
    dueDate: ""
  });

  const handleAddBill = async () => {
    try {
      await addBill({
        variables: {
          username: user.username,
          name: newBill.name,
          category: newBill.category,
          amount: parseFloat(String(newBill.amount)),
          dueDate: newBill.dueDate
        }
      });
      refetch();
      setNewBill({ name: "", category: "", amount: 0, dueDate: "" });
    } catch (err) {
      console.error("Add bill error", err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBill({ variables: { id } });
      refetch();
    } catch (err) {
      console.error("Delete bill error", err);
    }
  };

  return (
    <div className="bills-page">
      <h1 className="page-title">My Bills</h1>

      <div className="add-bill-form">
        <h2>Add a New Bill</h2>
        <input
          type="text"
          placeholder="Name"
          value={newBill.name}
          onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Category"
          value={newBill.category}
          onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newBill.amount}
          onChange={(e) => setNewBill({ ...newBill, amount: parseFloat(e.target.value) })}
        />
        <input
          type="date"
          value={newBill.dueDate}
          onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
        />
        <button onClick={handleAddBill} className="chakra-button css-1qhwwba">Add Bill</button>
      </div>

      <div className="subscriptions-card-container">
        <h2 className="subscriptions-card-title">Bills</h2>
        {data?.userBills?.length > 0 ? (
          <div>
            {data.userBills.map((bill: any) => (
              <div key={bill._id} className="subscriptions-row">
                <span>{bill.name}</span>
                <span>{bill.category}</span>
                <span>${bill.amount.toFixed(2)}</span>
                <span>{new Date(bill.dueDate).toLocaleDateString()}</span>
                <button onClick={() => handleDelete(bill._id)} className="chakra-button css-1qhwwba">Delete</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No bills found.</p>
        )}
      </div>
    </div>
  );
};

export default BillsPage;
