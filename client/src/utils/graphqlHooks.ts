import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import authService from './auth';


const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
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

const ADD_USER = gql`
  mutation AddUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

const GET_ME = gql`
  query Me {
    me {
      _id
      username
      email
    }
  }
`;

const GET_BILLS = gql`
  query GetBills {
    bills {
      _id
      username
      name
      category
      amount
      dueDate
    }
  }
`;

const GET_USER_BILLS = gql`
  query GetUserBills($username: String!) {
    userBills(username: $username) {
      _id
      name
      category
      amount
      dueDate
    }
  }
`;

const GET_SUBSCRIPTIONS = gql`
  query GetSubscriptions {
    subscriptions {
      _id
      username
      cost
      renewalDate
    }
  }
`;

const ADD_BILL = gql`
  mutation AddBill(
    $username: String!
    $category: String!
    $name: String!
    $amount: Float!
    $dueDate: String!
  ) {
    addBill(
      username: $username
      category: $category
      name: $name
      amount: $amount
      dueDate: $dueDate
    ) {
      _id
      username
      name
      category
      amount
      dueDate
    }
  }
`;

const ADD_SUBSCRIPTION = gql`
  mutation AddSubscription(
    $username: String!
    $cost: Float!
    $renewalDate: String!
  ) {
    addSubscription(
      username: $username
      cost: $cost
      renewalDate: $renewalDate
    ) {
      _id
      username
      cost
      renewalDate
    }
  }
`;


export const useLogin = () => {
    const [loginMutation, { loading, error }] = useMutation(LOGIN_USER);
    
    const login = async (email: string, password: string) => {
      try {
        const { data } = await loginMutation({
          variables: { email, password }
        });
        
        const { token, user } = data.login;
        authService.login(token);
        
        return { success: true, user };
      } catch (err) {
        console.error('Login error:', err);
        return { success: false, error: err };
      }
    };
    
    return { login, loading, error };
  };

  