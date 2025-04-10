import React, { useContext, useState } from "react";
import { AppContext } from "../App";
import "../styles/bills.css";
import { useQuery, useMutation } from "@apollo/client";
import { GET_USER_BILLS } from "../utils/queries";
import { ADD_BILL, DELETE_BILL } from "../utils/mutations";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter,
  ModalBody, ModalCloseButton, useDisclosure, Button, Input, useToast
} from "@chakra-ui/react";

const BillsPage: React.FC = () => {
  const context = useContext(AppContext);
  if (!context || !context.user) return <p>Error: AppContext or user not available.</p>;

  const { user } = context;
  const { data, refetch } = useQuery(GET_USER_BILLS, {
    variables: { username: user.username },
    skip: !user,
  });

  const [addBill] = useMutation(ADD_BILL);
  const [deleteBill] = useMutation(DELETE_BILL);
  const [newBill, setNewBill] = useState({
    name: "",
    category: "",
    amount: "",
    dueDate: ""
  });
  const [formError, setFormError] = useState("");
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleAddBill = async () => {
    if (!newBill.name || !newBill.category || !newBill.amount || !newBill.dueDate) {
      setFormError("All fields are required.");
      return;
    }
    setFormError("");

    try {
      await addBill({
        variables: {
          username: user.username,
          name: newBill.name,
          category: newBill.category,
          amount: parseFloat(newBill.amount),
          dueDate: newBill.dueDate // Send as string
        }
      });
      refetch();
      setNewBill({ name: "", category: "", amount: "", dueDate: "" });
      toast({ title: "Bill added successfully.", status: "success", duration: 3000, isClosable: true });
      onClose();
    } catch (err) {
      console.error("Add bill error", err);
      toast({ title: "Failed to add bill.", status: "error", duration: 3000, isClosable: true });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteBill({ variables: { id } });
      refetch();
      toast({ title: "Bill deleted.", status: "info", duration: 3000, isClosable: true });
    } catch (err) {
      console.error("Delete bill error", err);
      toast({ title: "Failed to delete bill.", status: "error", duration: 3000, isClosable: true });
    }
  };

  const getDueDetails = (dueDate: string) => {
    let formattedDate = "Invalid Date";
    let dueStatus = "";

    try {
      console.log("Raw dueDate value:", dueDate);
      let parsed: Date;

      if (!isNaN(Number(dueDate))) {
        parsed = new Date(Number(dueDate));
      } else {
        parsed = new Date(dueDate.replace(/-/g, "/"));
      }

      if (!isNaN(parsed.getTime())) {
        const today = new Date();
        const diffTime = parsed.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        formattedDate = parsed.toLocaleDateString("en-US", {
          month: "2-digit",
          day: "2-digit",
          year: "numeric"
        });

        if (diffDays < 0) {
          dueStatus = `Overdue by ${Math.abs(diffDays)} day(s)`;
        } else if (diffDays === 0) {
          dueStatus = "Due today";
        } else {
          dueStatus = `Due in ${diffDays} day(s)`;
        }
      }
    } catch (err) {
      console.error("Date parsing error:", err);
    }

    return { formattedDate, dueStatus };
  };

  return (
    <div className="bills-page">
      <h1 className="page-title">My Bills</h1>

      <Button onClick={onOpen} colorScheme="blue" mb={4}>Add New Bill</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a New Bill</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Name"
              value={newBill.name}
              onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Category"
              value={newBill.category}
              onChange={(e) => setNewBill({ ...newBill, category: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Amount"
              type="number"
              value={newBill.amount}
              onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
              mb={3}
            />
            <Input
              placeholder="Due Date"
              type="date"
              value={newBill.dueDate}
              onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
              mb={3}
            />
            {formError && <p style={{ color: 'red' }}>{formError}</p>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddBill}>Add Bill</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div className="subscriptions-card-container">
        <h2 className="subscriptions-card-title">Bills</h2>
        {data?.userBills?.length > 0 ? (
          <div>
            {data.userBills.map((bill: any) => {
              const { formattedDate, dueStatus } = getDueDetails(bill.dueDate);

              return (
                <div key={bill._id} className="subscriptions-row">
                  <span>{bill.name}</span>
                  <span>{bill.category}</span>
                  <span>${bill.amount.toFixed(2)}</span>
                  <span>{formattedDate}</span>
                  <span style={{ fontStyle: 'italic', color: '#888' }}>{dueStatus}</span>
                  <button onClick={() => handleDelete(bill._id)} className="delete-bill-btn">Delete</button>
                </div>
              );
            })}
          </div>
        ) : (
          <p>No bills found.</p>
        )}
      </div>
    </div>
  );
};

export default BillsPage;



