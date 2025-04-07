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

export const useSignup = () => {
    const [addUserMutation, { loading, error }] = useMutation(ADD_USER);
    
    const signup = async (username: string, email: string, password: string) => {
      try {
        const { data } = await addUserMutation({
          variables: { 
            input: { 
              name: username, 
              email, 
              password 
            } 
          }
        });
        
        const { token, user } = data.addUser;
        authService.login(token);
        
        return { success: true, user };
      } catch (err) {
        console.error('Signup error:', err);
        return { success: false, error: err };
      }
    };
    
    return { signup, loading, error };
  };


  
export const useCurrentUser = () => {
    return useQuery(GET_ME, {
      fetchPolicy: 'cache-and-network',
      skip: !authService.loggedIn()
    });
  };
  
  
  export const useBills = () => {
    return useQuery(GET_BILLS);
  };
  
  
  export const useUserBills = (username: string) => {
    return useQuery(GET_USER_BILLS, {
      variables: { username },
      skip: !username
    });
  };
  
  
  export const useSubscriptions = () => {
    return useQuery(GET_SUBSCRIPTIONS);
  };
  
  
  export const useAddBill = () => {
    const [addBillMutation, { loading, error }] = useMutation(ADD_BILL);
    
    const addBill = async (
      username: string, 
      category: string, 
      name: string, 
      amount: number, 
      dueDate: string
    ) => {
      try {
        const { data } = await addBillMutation({
          variables: { 
            username, 
            category, 
            name, 
            amount, 
            dueDate 
          },
          refetchQueries: [
            { query: GET_BILLS },
            { 
              query: GET_USER_BILLS, 
              variables: { username } 
            }
          ]
        });
        
        return { success: true, bill: data.addBill };
      } catch (err) {
        console.error('Add bill error:', err);
        return { success: false, error: err };
      }
    };
    
    return { addBill, loading, error };
  };
  
  
  export const useAddSubscription = () => {
    const [addSubscriptionMutation, { loading, error }] = useMutation(ADD_SUBSCRIPTION);
    
    const addSubscription = async (
      username: string, 
      cost: number, 
      renewalDate: string
    ) => {
      try {
        const { data } = await addSubscriptionMutation({
          variables: { 
            username, 
            cost, 
            renewalDate 
          },
          refetchQueries: [
            { query: GET_SUBSCRIPTIONS }
          ]
        });
        
        return { success: true, subscription: data.addSubscription };
      } catch (err) {
        console.error('Add subscription error:', err);
        return { success: false, error: err };
      }
    };
    
    return { addSubscription, loading, error };
  };





