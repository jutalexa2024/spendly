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
