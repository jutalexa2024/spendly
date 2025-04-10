import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";

import "../styles/bills.css";

type Subscription = {
  name: string;
  status: "Active" | "Inactive";
  cycle: "Monthly" | "Annually";
  cost: number;
  paymentStatus: "Paid" | "Unpaid"
  dueDate: string;
  category: string;
}; 

const BillsPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context) return <p>Error: AppContext not available.</p>;

  const { subscriptions, setSubscriptions } = context;

  const activeSubscriptions = subscriptions.filter(
    (sub) => sub.status === "Active"
  );

  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const defaultBillState: Subscription = {
    name: "",
    status: "Active",
    paymentStatus: "Unpaid",
    cycle: "Monthly",
    cost: 0.0,
    dueDate: "",
    category: "",
  };
  
  // This is setting a state variable for adding and editing Bills
  const [newBill, setNewBill] = useState<Subscription>(defaultBillState);
  const [editBill, setEditBill] = useState<Subscription>(defaultBillState);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // For the Edit modal


  // Error messages for when user add a new bill or edit it.
  const [errorMessage, setErrorMessage] = useState(""); // Add Subscription Modal
  const [editErrorMessage, setEditErrorMessage] = useState(""); // Edit modal message

  const handleModalClose = () => {
    setNewBill(defaultBillState);
    setErrorMessage("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewBill((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddBill = () => {

    const duplicate = subscriptions.some(
      (sub) => sub.name.trim().toLowerCase() === newBill.name.trim().toLowerCase()
    );

    if (duplicate) {
      setErrorMessage("This bill already exists.");
      return;
    }

    if (newBill.name.trim() === "" && newBill.dueDate === "" && newBill.category === "") {
      setErrorMessage("All fields are required");
      return;
    }
    if (newBill.name.trim() === "") {
      setErrorMessage("Please enter a valid name and due date for the bill.");
      return;
    }

    if (newBill.dueDate === "") {
      setErrorMessage("Date need to be selected.");
      return;
    }

    if (newBill.category === "") {
      setErrorMessage("Please Enter a Category.");
      return;
    }

    if (newBill.cost <= 0){
      setErrorMessage("Amount must be greater than 0.");
      return;
    }

    const formattedBill: Subscription = {
      name: newBill.name.trim(),
      status: newBill.status as "Active" | "Inactive", // Ensure literal type
      paymentStatus: newBill.paymentStatus as "Paid" | "Unpaid", // Ensure literal type
      cycle: newBill.cycle as "Monthly" | "Annually", // Ensure literal type
      cost: Number(newBill.cost), // Ensure cost is a number
      dueDate: newBill.dueDate, // Keep as string
      category: newBill.category.trim(),
    };
  

    setSubscriptions((prev) => [...prev, formattedBill]);
    setErrorMessage(""); // Clear any existing error
    handleModalClose();
  };

  const handleEditModalOpen = (subscription: typeof editBill) => {
    setEditBill(subscription); // Prefill modal with subscription data
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setEditBill(defaultBillState); // Reset modal state
    setEditErrorMessage("");
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setEditBill((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {

    
    const formattedEditBill: Subscription = {
      name: editBill.name.trim(),
      status: editBill.status as "Active" | "Inactive", // Ensure literal type
      paymentStatus: editBill.paymentStatus as "Paid" | "Unpaid", // Ensure literal type
      cycle: editBill.cycle as "Monthly" | "Annually", // Ensure literal type
      cost: Number(editBill.cost), // Ensure cost is a number
      dueDate: editBill.dueDate, 
      category: editBill.category.trim(),
    };

    if (editBill.name.trim() === "") {
      setEditErrorMessage("Please enter a Name.");
      return;
    }

    if (editBill.dueDate === "") {
      setEditErrorMessage("Date must be selected.");
      return;
    }

    if (editBill.category === "") {
      setEditErrorMessage("Please Enter a Category.");
      return;
    }

    if (editBill.cost <= 0){
      setEditErrorMessage("Amount must be greater than 0.");
      return;
    }

    const duplicate = subscriptions.some(
      (sub) => sub.name.trim().toLowerCase() === editBill.name.trim().toLowerCase() && sub.name !== editBill.name
    );

    if (duplicate) {
      setEditErrorMessage("A bill with this name already exists.");
      return;
    }

    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub.name === editBill.name ? { ...formattedEditBill } : sub
      )
    );
    handleEditModalClose();
  };


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

      {/* Add Bill + Button  */}
      <div className="add-bills-button-container">
        <Button
          bg="rgb(0, 140, 233)"
          color="white"
          _hover={{ bg: "rgb(46, 204, 113)" }}
          onClick={onOpen}
        >
          Add Bills +
        </Button>
      </div>

      {/* Subscriptions Table */}
      <div className="subscriptions-card-container">
        <h2 className="subscriptions-card-title">Subscription Bills</h2>
        <div className="subscriptions-table-header">
          <span className="subscriptions-header-name">Name</span>
          <span className="subscriptions-header-category">Category</span>
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
              <span className="subscriptions-category">{sub.category}</span>
              <span className="subscriptions-due-date">
                {dueDate.toLocaleDateString("en-US", {
                  month: "2-digit",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
              <span className="subscriptions-past-due">
                {isPastDue ? "Yes" : "No"}
              </span>
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

                <Button
                  bg="rgb(0, 140, 233)"
                  color="white"
                  _hover={{ bg: "rgb(46, 204, 113)" }}
                  onClick={() => handleEditModalOpen(sub)}
                >
                  Edit
                </Button>
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

      {/* Chakra-UI Modal for the "Add Bills + button"*/}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of Bill</FormLabel>
              <Input
                name="name"
                value={newBill.name}
                onChange={handleInputChange}
                placeholder="Enter Bill Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                value={newBill.dueDate}
                onChange={handleInputChange}
                type="date"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={newBill.category}
                onChange={handleInputChange}
                placeholder="Enter category (e.g., utilities, entertainment)"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount($)</FormLabel>
              <Input
                name="cost"
                value={newBill.cost}
                onChange={handleInputChange}
                type="number"
                placeholder="0.00"
              />
            </FormControl>

            {errorMessage && (
              <div style={{ color: "red", marginTop: "8px" }}>
                {errorMessage}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddBill}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chakra-UI Modal for the "Edit button"*/}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of Bill</FormLabel>
              <Input
                name="name"
                value={editBill.name}
                onChange={handleEditInputChange}
                placeholder="Enter Bill Name"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                value={editBill.dueDate}
                onChange={handleEditInputChange}
                type="date"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Category</FormLabel>
              <Input
                name="category"
                value={editBill.category}
                onChange={handleEditInputChange}
                placeholder="Enter category (e.g., utilities, entertainment)"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Amount($)</FormLabel>
              <Input
                name="cost"
                value={editBill.cost}
                onChange={(e) =>
                  setEditBill((prev) => ({
                    ...prev,
                    cost: parseFloat(e.target.value),
                  }))
                }

                type="number"
                placeholder="0.00"
              />
            </FormControl>

            {editErrorMessage && (
              <div style={{ color: "red", marginTop: "8px" }}>
                {editErrorMessage}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveChanges}>
              Update
            </Button>
            <Button onClick={handleEditModalClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default BillsPage;
