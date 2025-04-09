import { gql } from '@apollo/client';


export const QUERY_USERS = gql`
  query getUsers {
    users {
      _id
      username
      email
    }
  }
`;


export const QUERY_BILLS = gql`
  query getBills {
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


export const QUERY_SUBSCRIPTIONS = gql`
  query getSubscriptions {
    subscriptions {
      _id
      username
      cost
      renewalDate
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      username
      email
    }
  }
`;

export const QUERY_BILL = gql`
  query getBill($id: ID!) {
    bill(id: $id) {
      _id
      username
      category
      name
      amount
      dueDate
    }
  }
`;

export const QUERY_SUBSCRIPTION = gql`
  query getSubscription($id: ID!) {
    subscription(id: $id) {
      _id
      username
      cost
      renewalDate
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
    }
  }
`;


export const QUERY_USER_BILLS = gql`
  query getUserBills($username: String!) {
    userBills(username: $username) {
      _id
      category
      name
      amount
      dueDate
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($input: AddUserInput!) {
    addUser(input: $input) {
      token
      user {
        user_id
        username
        email
      }
    }
  }
`;
