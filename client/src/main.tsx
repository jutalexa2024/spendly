import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from "@chakra-ui/react";
import './index.css';

// import AboutPage from './pages/About.tsx'
import BillsPage from './pages/Bills';
// import Dashboard from './pages/Dashboard.tsx';
import LoginPage from './pages/Login';
// import SignUpPage from './pages/Signup.tsx';
import Subscription from './pages/Subscription';
// import UserPreference from './pages/UserPreferences.tsx'
import App from './App';
import HomePage from './pages/Home';
import ErrorPage from './pages/ErrorPage';
import Dashboard from './pages/Dashboard';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
    //   {
    //     path: "/signup",
    //     element: <SignUpPage />,
    //   },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/bills",
        element: <BillsPage />,
      },
    //   {
    //     path: "/usersettings",
    //     element: <UserPreference />,
    //   }, 
      
    ],
  },
]);

const rootElement = document.getElementById('root');
if(rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}
