import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_BILL = gql`
  mutation addBill($username: String!, $name: String!, $category: String!, $amount: Float!, $dueDate: String!) {
    addBill(username: $username, name: $name, category: $category, amount: $amount, dueDate: $dueDate) {
      _id
      username
      name
      category
      amount
      duedate
      user_id
    }
  }
`;

export const DELETE_BILL = gql`
  mutation deleteBill($billId: ID!) {
    deleteBill(billId: $billId) {
      _id
    }
  }
`;


export const UPDATE_BILL = gql`
  mutation updateBill($billId: ID!, $name: String, $category: String, $amount: Float, $dueDate: String) {
    updateBill(billId: $billId, name: $name, category: $category, amount: $amount, dueDate: $dueDate) {
      _id
      name
      category
      amount
      duedate
    }
  }
`;


export const ADD_SUBSCRIPTION = gql`
  mutation addSubscription($username: String!, $name: String!, $category: String!, $cost: Float!, $renewalDate: String!) {
    addSubscription(username: $username, name: $name, category: $category, cost: $cost, renewalDate: $renewalDate) {
      _id
      username
      name
      category
      cost
      renewalDate
      user_id
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  mutation deleteSubscription($subscriptionId: ID!) {
    deleteSubscription(subscriptionId: $subscriptionId) {
      _id
    }
  }
`;