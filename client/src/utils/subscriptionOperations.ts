
import { gql } from '@apollo/client';

// Queries
export const GET_USER_SUBSCRIPTIONS = gql`
  query GetUserSubscriptions($username: String!) {
    getUserSubscriptions(username: $username) {
      _id
      name
      status
      cycle
      cost
      paymentStatus
      dueDate
    }
  }
`;

// Mutations
export const CREATE_SUBSCRIPTION = gql`
  mutation CreateSubscription($username: String!, $subscription: SubscriptionInput!) {
    createSubscription(username: $username, subscription: $subscription) {
      _id
      name
      status
      cycle
      cost
      paymentStatus
      dueDate
    }
  }
`;

export const UPDATE_SUBSCRIPTION = gql`
  mutation UpdateSubscription($_id: ID!, $subscription: SubscriptionInput!) {
    updateSubscription(_id: $_id, subscription: $subscription) {
      _id
      name
      status
      cycle
      cost
      paymentStatus
      dueDate
    }
  }
`;

export const DELETE_SUBSCRIPTION = gql`
  mutation DeleteSubscription($_id: ID!) {
    deleteSubscription(_id: $_id)
  }
`;

export const UPDATE_SUBSCRIPTION_STATUS = gql`
  mutation UpdateSubscriptionStatus($_id: ID!, $status: String!) {
    updateSubscriptionStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

export const UPDATE_SUBSCRIPTION_PAYMENT_STATUS = gql`
  mutation UpdateSubscriptionPaymentStatus($_id: ID!, $paymentStatus: String!) {
    updateSubscriptionPaymentStatus(_id: $_id, paymentStatus: $paymentStatus) {
      _id
      paymentStatus
    }
  }
`;