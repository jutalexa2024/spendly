import React, { useState } from "react";
import "../styles/subscription.css";

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
  Radio,
  RadioGroup,
  Stack,
  Select
} from "@chakra-ui/react";

type Subscription = {
    name: string;
    status: "Active" | "Inactive";
    cycle: "Monthly" | "Annually";
    cost: number;
    paymentStatus: "Paid" | "Unpaid"
    dueDate: string;
  }; 

const SubscriptionPage = () => {
  
  // Mock data to populate Subscription table
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { name: "Netflix", status: "Active", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-15"},
    { name: "Spotify", status: "Inactive", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-10" },
    { name: "Hulu", status: "Active", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-20" },
    { name: "Microsoft 365", status: "Active", cycle: "Annually", cost: 99.99, paymentStatus: "Unpaid", dueDate: "2025-06-01" },
    { name: "Amazon Prime", status: "Active", cycle: "Annually", cost: 100.00, paymentStatus: "Unpaid", dueDate: "2025-07-06"},
    { name: "HBO Max", status: "Inactive", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-18" },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  
  // This is setting a state variable for adding New Subscription
  const [newSubscription, setNewSubscriptiaon] = useState<Subscription>({
    name: "",
    status: "Active",
    cycle: "Monthly",
    cost: 0.00,
    paymentStatus: "Unpaid",
    dueDate: "",
  });

  // This is setting a state variable for Editing (information held) Subscription
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription>({
    name: "",
    status: "Active",
    cycle: "Monthly",
    cost: 0.00, 
    paymentStatus: "Unpaid",
    dueDate: "",
  });
  
  // Error messages for when user add a new subscription or edit it.
  const [errorMessage, setErrorMessage] = useState(""); // Add Subscription Modal
  const [editErrorMessage, setEditErrorMessage] = useState(""); // Edit modal message

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription); // Populate the state with row data
    setIsEditModalOpen(true); // Open the modal
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  const openDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(true);
  const closeDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(false);


  // This block of code will handle the submitted inputs from Modal window
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Checking if Cost input is valid
    if (name === "cost") {
      if (value.trim() === "") {
        setErrorMessage("Cost cannot be empty."); // Set an error message for empty input
        return;
      }

      const costValue = parseFloat(value);

      // Check if the cost is not a number or is a negaive number
      if (isNaN(costValue) || costValue < 0) {
        setErrorMessage("Invalid cost. Please provide a valid positive number.");
        return; // Prevent invalid updates
      }
      setErrorMessage(""); // Clear the error message
      setNewSubscription((prev) => ({ ...prev, [name]: costValue, })); // Update the cost as a number
    } else {
      setNewSubscription((prev) => ({ ...prev, [name]: value, }));
    }
  };

  // Handle changes for "Edit Subscription" modal
  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      if (value.trim() === "") {
        setEditErrorMessage("Please provide a subscription name."); // Set an error message for empty input
        return;
      }
    }

    if (name === "cost") {
      if (value.trim() === "") {
        setEditErrorMessage("Cost cannot be empty");
        return;
      }
      const costValue = parseFloat(value);

      if (isNaN(costValue) || costValue < 0) {
        setEditErrorMessage("Invalid cost. Please provide a valid positive number."); // Set error for invalid numbers
        return;
      }

      setEditErrorMessage(""); // Clear error message if input is valid
      setSelectedSubscription((prev) => ({...prev, [name]: costValue, })); // Update the cost as a number
  
    } else {
      setSelectedSubscription((prev) => ({ ...prev, [name]: value, }));
    }

  };

  const handleStatusChange = (status: "Active" | "Inactive") => {
    setNewSubscription((prev) => ({ ...prev, status }));
  };

  const handleEditStatusChange = (status: "Active" | "Inactive") => {
    setSelectedSubscription((prev) => ({ ...prev, status }));
  };

  const handleCycleChange = (cycle: "Monthly" | "Annually") => {
    setNewSubscription((prev) => ({ ...prev, cycle }));
  };

  const handleEditCycleChange = (cycle: "Monthly" | "Annually") => {
    setSelectedSubscription((prev) => ({ ...prev, cycle }));
  };


  const handleAddSubscription = () => {
    if (newSubscription.name.trim() === "") {
      setErrorMessage("Subscription name cannot be empty."); // Set an error message for empty input
      return;
    }
      

    if (isNaN(newSubscription.cost) || newSubscription.cost === null || newSubscription.cost <= 0) {
        setErrorMessage("Invalid cost. Please provide a valid positive number.");
        return;
    }

    setErrorMessage(""); // Clear error message if input is valid
    setSubscriptions([...subscriptions, newSubscription]); // Add new subscription to the state
    setNewSubscription({ name: "", status: "Active", cycle: "Monthly", cost: 0.00, paymentStatus: "Unpaid", dueDate: new Date().toISOString().split("T")[0] }); // Reset the form
    onClose(); // Close the modal window
  };

  // Save edits to the selected subscription
  const handleSaveEditSubscription = () => {
    if (selectedSubscription.name.trim() === "") {
      setErrorMessage("Subscription name cannot be empty."); // Set an error message for empty input
      return;
    }


    if (isNaN(selectedSubscription.cost) || selectedSubscription.cost === null || selectedSubscription.cost <= 0) {
      setErrorMessage("Invalid cost. Please provide a valid positive number.");
      return;
    }

    setEditErrorMessage("");  // Clear error message if input is valid
    setSubscriptions((prev) =>
      prev.map((subscription) =>
        subscription.name === selectedSubscription.name ? selectedSubscription : subscription
      )
    );
    closeEditModal(); // Close the modal
  };

  const handleDeleteSubscription = () => {
    setSubscriptions((prev) =>
      prev.filter(
        (subscription) =>
          subscription.name !== selectedSubscription.name
      )
    );
    closeEditModal(); // Close the modal after deletion
  };


  return (
    <div>
      <h1 className="page-title">My Subscription</h1>
      <div className="add-button-container">
        <Button
          bg="rgb(0, 140, 233)"
          color="white"
          _hover={{ bg: "rgb(46, 204, 113)" }}
          onClick={onOpen}
        >
          Add Subscription +
        </Button>
      </div>
      <div className="subscription-container">
        {subscriptions.length === 0 ? (
          <div className="no-subscriptions-message">
            <h2>There Are No Subscription</h2>
          </div>
        ) : (
          <>
            <div className="table-header">
              <span className="subscription-header-name">Name</span>
              <span className="subscription-header-status">Status</span>
              <span className="subscription-header-cycle">Payment Cycle</span>
              <span className="subscription-header-cost">Amount</span>
              <span className="subscription-header-edit"></span>{" "}  {/*Empty for table alignment purpose*/}
            </div>
            {subscriptions.map((subscription, index) => (
              <div className="subscription-row" key={index}>
                <span className="subscription-name">{subscription.name}</span>
                <span 
                  className= {
                    subscription.status === "Active" ? "status-active" : "status-inactive"
                  }
                > {subscription.status}
                </span>
                <span className="subscription-cycle">{subscription.cycle}</span>
                <span className="subscription-cost">${subscription.cost.toFixed(2)}</span>
                <Button
                  bg="rgb(0, 140, 233)"
                  color="white"
                  _hover={{ bg: "rgb(46, 204, 113)" }}
                  onClick={() => openEditModal(subscription)}
                >
                  Edit
                </Button>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Chakra-UI Modal for the "Add Subscription button"*/}
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of Subscription</FormLabel>
              <Input
                name="name"
                value={newSubscription.name}
                onChange={handleInputChange}
                placeholder="Subscription name"
              />
            </FormControl>

            <div style={{ marginTop: "16px" }}>
              <RadioGroup
                onChange={(value) =>
                  handleStatusChange(value === "1" ? "Active" : "Inactive")
                }
                value={newSubscription.status === "Active" ? "1" : "2"}
              >
                <Stack direction="row">
                  <Radio value="1">Active</Radio>
                  <Radio value="2">Inactive</Radio>
                </Stack>
              </RadioGroup>
            </div>

            <div style={{ marginTop: "16px" }}>
              <Select
                placeholder="Payment Cycle"
                value={newSubscription.cycle}
                onChange={(e) =>
                  handleCycleChange(e.target.value as "Monthly" | "Annually")
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Annually">Annually</option>
              </Select>
            </div>

            <FormControl mt={4}>
              <FormLabel>Amount($)</FormLabel>
              <Input
                name="cost"
                value={newSubscription.cost}
                onChange={handleInputChange}
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
            <Button colorScheme="blue" mr={3} onClick={handleAddSubscription}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chakra-UI Modal for the "Edit button"*/}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name of Subscription</FormLabel>
              <Input
                name="name"
                value={selectedSubscription.name}
                onChange={handleEditInputChange}
                placeholder="Subscription name"
              />
            </FormControl>

            <div style={{ marginTop: "16px" }}>
              <RadioGroup
                onChange={(value) =>
                  handleEditStatusChange(value === "1" ? "Active" : "Inactive")
                }
                value={selectedSubscription.status === "Active" ? "1" : "2"}
              >
                <Stack direction="row">
                  <Radio value="1">Active</Radio>
                  <Radio value="2">Inactive</Radio>
                </Stack>
              </RadioGroup>
            </div>

            <div style={{ marginTop: "16px" }}>
              <Select
                placeholder="Payment Cycle"
                value={selectedSubscription.cycle}
                onChange={(e) =>
                  handleEditCycleChange(
                    e.target.value as "Monthly" | "Annually"
                  )
                }
              >
                <option value="Monthly">Monthly</option>
                <option value="Annually">Annually</option>
              </Select>
            </div>

            <FormControl mt={4}>
              <FormLabel>Amount($)</FormLabel>
              <Input
                name="cost"
                value={selectedSubscription.cost}
                onChange={handleEditInputChange}
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
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleSaveEditSubscription}
            >
              Update
            </Button>
            <Button colorScheme="red" mr={3} onClick={openDeleteConfirmModal}>
              Delete
            </Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Chakra-UI Modal for the "Delete Confirm button"*/}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this subscription?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={() => {
                // Delete the subscription
                handleDeleteSubscription(); // Close confirmation modal
                closeDeleteConfirmModal(); // Close edit modal
              }}
            >
              Yes
            </Button>
            <Button onClick={closeDeleteConfirmModal}>No</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;
