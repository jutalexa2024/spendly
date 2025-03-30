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
