import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

// import AboutPage from './pages/About.tsx'
// import Billpage from './pages/Bills.tsx';
// import Dashboard from './pages/Dashboard.tsx';
import LoginPage from './pages/Login';
// import SignUpPage from './pages/Signup.tsx';
import Subscription from './pages/Subscription';
// import UserPreference from './pages/UserPreferences.tsx'
import App from './App';
// import HomePage from './pages/Home';
import ErrorPage from './pages/ErrorPage';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: <HomePage />,
      // },
      // {
      //   path: "/about",
      //   element: <AboutPage />,
      // },
    //   {
    //     path: "/dashboard",
    //     element: <Dashboard />,
    //   },
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
    //   {
    //     path: "/bills",
    //     element: <Billpage />,
    //   },
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
    <RouterProvider router={router} />
  );
}
