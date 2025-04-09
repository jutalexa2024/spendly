import React, { useState, useEffect } from "react";
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
  Select,
  Spinner,
  Alert,
  AlertIcon
} from "@chakra-ui/react";
import { 
  useGetUserSubscriptions, 
  useCreateSubscription, 
  useUpdateSubscription, 
  useDeleteSubscription
} from "../hooks/useSubscription";
import authService from "../utils/auth";


type Subscription = {
  _id?: string;
  name: string;
  status: "Active" | "Inactive";
  cycle: "Monthly" | "Annually";
  cost: number;
  paymentStatus: "Paid" | "Unpaid";
  dueDate: string;
};

const SubscriptionPage = () => {
  const userProfile = authService.loggedIn() ? authService.getProfile() : null;
  const username = userProfile?.data?.username || "guest";
  const isAuthenticated = authService.loggedIn();
  
  // Apollo hooks
  const { loading, error, data } = useGetUserSubscriptions(username);
  const [createSubscription, { loading: createLoading }] = useCreateSubscription();
  const [updateSubscription, { loading: updateLoading }] = useUpdateSubscription();
  const [deleteSubscription, { loading: deleteLoading }] = useDeleteSubscription();
  
  
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  
  useEffect(() => {
    if (data && data.getUserSubscriptions) {
      setSubscriptions(data.getUserSubscriptions);
    } else if (!isAuthenticated) {
      
      setSubscriptions([
        { name: "Netflix", status: "Active", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-15"},
        { name: "Spotify", status: "Inactive", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-10" },
        { name: "Hulu", status: "Active", cycle: "Monthly", cost: 9.99, paymentStatus: "Unpaid", dueDate: "2025-04-20" },
        { name: "Microsoft 365", status: "Active", cycle: "Annually", cost: 99.99, paymentStatus: "Paid", dueDate: "2025-06-01" },
        { name: "Amazon Prime", status: "Active", cycle: "Annually", cost: 100.0, paymentStatus: "Unpaid", dueDate: "2025-07-05" },
        { name: "HBO Max", status: "Inactive", cycle: "Monthly", cost: 15.99, paymentStatus: "Unpaid", dueDate: "2025-04-18" },
      ]);
    }
  }, [data, isAuthenticated]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  
  
  const [newSubscription, setNewSubscriptiaon] = useState<Subscription>({
    name: "",
    status: "Active",
    cycle: "Monthly",
    cost: 0.00,
    paymentStatus: "Unpaid",
    dueDate: new Date().toISOString().split("T")[0],
  });

  
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription>({
    name: "",
    status: "Active",
    cycle: "Monthly",
    cost: 0.00, 
    paymentStatus: "Unpaid",
    dueDate: "",
  });
  
  
  const [errorMessage, setErrorMessage] = useState("");
  const [editErrorMessage, setEditErrorMessage] = useState("");

  
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState(false);

  
  const openEditModal = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);
  const openDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(true);
  const closeDeleteConfirmModal = () => setIsDeleteConfirmModalOpen(false);

  // Input change handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSubscriptiaon({
      ...newSubscription,
      [name]: name === 'cost' ? parseFloat(value) || 0 : value,
    });
  };

  const handleStatusChange = (status: "Active" | "Inactive") => {
    setNewSubscriptiaon({
      ...newSubscription,
      status,
    });
  };

  const handleCycleChange = (cycle: "Monthly" | "Annually") => {
    setNewSubscriptiaon({
      ...newSubscription,
      cycle,
    });
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSelectedSubscription({
      ...selectedSubscription,
      [name]: name === 'cost' ? parseFloat(value) || 0 : value,
    });
  };

  const handleEditStatusChange = (status: "Active" | "Inactive") => {
    setSelectedSubscription({
      ...selectedSubscription,
      status,
    });
  };

  const handleEditCycleChange = (cycle: "Monthly" | "Annually") => {
    setSelectedSubscription({
      ...selectedSubscription,
      cycle,
    });
  };
  
  //NEW - Update handle add subscription
  const handleAddSubscription = async () => {
    if (newSubscription.name.trim() === "") {
      setErrorMessage("Subscription name cannot be empty.");
      return;
    }

    if (isNaN(newSubscription.cost) || newSubscription.cost === null || newSubscription.cost <= 0) {
      setErrorMessage("Invalid cost. Please provide a valid positive number.");
      return;
    }

    setErrorMessage(""); 
    
    try {
      if (isAuthenticated) {
       
        const { data } = await createSubscription({
          variables: {
            username,
            subscription: {
              name: newSubscription.name,
              status: newSubscription.status,
              cycle: newSubscription.cycle,
              cost: newSubscription.cost,
              paymentStatus: newSubscription.paymentStatus,
              dueDate: newSubscription.dueDate
            }
          }
        });
        
       
        if (data && data.createSubscription) {
          setSubscriptions(prev => [...prev, data.createSubscription]);
        }
      } else {
        
        setSubscriptions([...subscriptions, newSubscription]);
      }
      
      // Reset the form
      setNewSubscriptiaon({
        name: "",
        status: "Active",
        cycle: "Monthly",
        cost: 0.00,
        paymentStatus: "Unpaid",
        dueDate: new Date().toISOString().split("T")[0]
      });
      
      onClose();
    } catch (err: any) {
      console.error("Error adding subscription:", err);
      setErrorMessage(`Failed to add subscription: ${err.message}`);
    }
  };

  
  const handleSaveEditSubscription = async () => {
    if (selectedSubscription.name.trim() === "") {
      setEditErrorMessage("Subscription name cannot be empty.");
      return;
    }

    if (isNaN(selectedSubscription.cost) || selectedSubscription.cost === null || selectedSubscription.cost <= 0) {
      setEditErrorMessage("Invalid cost. Please provide a valid positive number.");
      return;
    }

    setEditErrorMessage("");
    
    try {
      if (isAuthenticated && selectedSubscription._id) {
        await updateSubscription({
          variables: {
            _id: selectedSubscription._id,
            subscription: {
              name: selectedSubscription.name,
              status: selectedSubscription.status,
              cycle: selectedSubscription.cycle,
              cost: selectedSubscription.cost,
              paymentStatus: selectedSubscription.paymentStatus,
              dueDate: selectedSubscription.dueDate
            }
          }
        });
      } else {
        
        setSubscriptions(prev => prev.map(subscription => 
          subscription.name === selectedSubscription.name ? selectedSubscription : subscription
        ));
      }
      
      closeEditModal();
    } catch (err: any) {
      console.error("Error updating subscription:", err);
      setEditErrorMessage(`Failed to update subscription: ${err.message}`);
    }
  };

  
  const handleDeleteSubscription = async () => {
    try {
      if (isAuthenticated && selectedSubscription._id) {
        await deleteSubscription({
          variables: {
            _id: selectedSubscription._id,
            username 
          }
        });
      } else {
        
        setSubscriptions(prev => prev.filter(subscription => 
          subscription.name !== selectedSubscription.name
        ));
      }
      
      closeDeleteConfirmModal();
      closeEditModal();
    } catch (err: any) {
      console.error("Error deleting subscription:", err);
      setEditErrorMessage(`Failed to delete subscription: ${err.message}`);
    }
  };

 
  if (!isAuthenticated) {
    return (
      <div>
        <h1 className="page-title">My Subscription</h1>
        <Alert status="warning" marginBottom="20px">
          <AlertIcon />
          You are viewing demo data. Please <a href="/login" style={{color: 'blue', textDecoration: 'underline'}}>login</a> to manage your real subscriptions.
        </Alert>
        
        {}
        <div className="subscription-container">
          {}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">My Subscription</h1>
      
      {/* Loading state */}
      {loading && <div className="loading-container"><Spinner size="xl" color="blue.500" /></div>}
      
      {/* Error state */}
      {error && (
        <Alert status="error" borderRadius="md" mb={4}>
          <AlertIcon />
          Error loading subscriptions: {error.message}
        </Alert>
      )}
      
      <div className="add-button-container">
        <Button
          bg="rgb(0, 140, 233)"
          color="white"
          _hover={{ bg: "rgb(46, 204, 113)" }}
          onClick={onOpen}
          isLoading={createLoading}
        >
          Add Subscription +
        </Button>
      </div>
      
      <div className="subscription-container">
        {subscriptions.length === 0 ? (
          <div className="no-subscriptions-message">
            <h2>There Are No Subscriptions</h2>
          </div>
        ) : (
          <>
            <div className="table-header">
              <span className="subscription-header-name">Name</span>
              <span className="subscription-header-status">Status</span>
              <span className="subscription-header-cycle">Payment Cycle</span>
              <span className="subscription-header-cost">Amount</span>
              <span className="subscription-header-edit"></span>
            </div>
            {subscriptions.map((subscription, index) => (
              <div className="subscription-row" key={subscription._id || index}>
                <span className="subscription-name">{subscription.name}</span>
                <span 
                  className={
                    subscription.status === "Active" ? "status-active" : "status-inactive"
                  }
                >
                  {subscription.status}
                </span>
                <span className="subscription-cycle">{subscription.cycle}</span>
                <span className="subscription-cost">${subscription.cost.toFixed(2)}</span>
                <Button
                  bg="rgb(0, 140, 233)"
                  color="white"
                  _hover={{ bg: "rgb(46, 204, 113)" }}
                  onClick={() => openEditModal(subscription)}
                  isLoading={updateLoading}
                >
                  Edit
                </Button>
              </div>
            ))}
          </>
        )}
      </div>
      {/* Add Subscription Modal */}
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
            
            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="date"
                value={newSubscription.dueDate}
                onChange={handleInputChange}
              />
            </FormControl>
            
            {errorMessage && (
              <div style={{ color: "red", marginTop: "8px" }}>
                {errorMessage}
              </div>
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddSubscription} isLoading={createLoading}>
              Add
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Edit Subscription Modal */}
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
            
            <FormControl mt={4}>
              <FormLabel>Due Date</FormLabel>
              <Input
                name="dueDate"
                type="date"
                value={selectedSubscription.dueDate}
                onChange={handleEditInputChange}
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
              isLoading={updateLoading}
            >
              Update
            </Button>
            <Button colorScheme="red" mr={3} onClick={openDeleteConfirmModal} isLoading={deleteLoading}>
              Delete
            </Button>
            <Button onClick={closeEditModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteConfirmModalOpen}
        onClose={closeDeleteConfirmModal}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete the subscription "{selectedSubscription.name}"?
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="red"
              mr={3}
              onClick={handleDeleteSubscription}
              isLoading={deleteLoading}
            >
              Yes, Delete
            </Button>
            <Button onClick={closeDeleteConfirmModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SubscriptionPage;