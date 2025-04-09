import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from '@apollo/client';
import apolloClient from './utils/apolloClient';
import './index.css';

import HomePage from './pages/Home';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/Login';
import SignUpPage from './pages/Signup';
import Subscription from './pages/Subscription';
import BillsPage from './pages/Bills';
import ErrorPage from './pages/ErrorPage';
import App from './App';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/subscription", element: <Subscription /> },
      { path: "/bills", element: <BillsPage /> },
    ],
  },
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ApolloProvider>
  );
}
