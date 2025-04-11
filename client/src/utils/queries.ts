import { gql } from '@apollo/client';

export const GET_BILLS = gql`
  query GetBills {
    bills {
      bill_id
      name
      amount
      dueDate
      category
    }
  }
`;

export const GET_BILL_BY_ID = gql`
  query GetBillById($id: ID!) {
    bill(id: $id) {
      bill_id
      name
      amount
      dueDate
      category
    }
  }
`;

export const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions {
    subscriptions {
      name
      amount
      startDate
      endDate
      category
      reminder
    }
  }
`;

export const GET_SUBSCRIPTION_BY_ID = gql`
  query GetSubscriptionById($id: ID!) {
    subscription(id: $id) {
      id
      name
      amount
      startDate
      endDate
      category
      reminder
    }
  }
`;


export const GET_USER_BILLS = gql`
  query GetUserBills($username: String!) {
    userBills(username: $username) {
      _id
      username
      category
      name
      amount
      dueDate
    }
  }
`;

export const GET_ALL_BILLS = gql`
  query GetAllBills {
    bills {
      _id
      username
      category
      name
      amount
      dueDate
    }
  }
`;
