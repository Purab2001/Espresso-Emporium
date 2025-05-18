import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import './index.css'
import App from './layout/App';
import Home from './components/Home';
import LoadingSpinner from './ui/LoadingSpinner';
import ProtectedRoutes from './ui/ProtectedRoutes';
import AddCoffee from './features/coffee/AddCoffee.jsx';
import CoffeeDetails from './features/coffee/CoffeeDetails.jsx';
import UpdateCoffee from './features/coffee/UpdateCoffee.jsx';
import SignIn from './features/user/SignIn.jsx';
import SignUp from './features/user/SignUp.jsx';
import Users from './features/user/Users.jsx';
import UserDetails from './features/user/UserDetails.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        loader: () => fetch('http://localhost:3000/coffees'),
        hydrateFallbackElement: <LoadingSpinner/>,
        Component: Home,
      },
      {
        path: "addCoffee",
        Component: AddCoffee,
      },
      {
        path: "coffee/:id",
        loader: ({ params }) => fetch(`http://localhost:3000/coffees/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner/>,
        Component: CoffeeDetails,
      },
      {
        path: "update-coffee/:id",
        loader: ({ params }) =>
          fetch(`http://localhost:3000/coffees/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        Component: UpdateCoffee,
      },
      {
        path: "sign-in",
        Component: SignIn,
      },
      {
        path: "sign-up",
        Component: SignUp,
      },
      {
        path: "users",
        loader: () =>
          fetch('https://coffee-store-server-gtbz.onrender.com/users'),
        hydrateFallbackElement: <LoadingSpinner />,
        Component: Users,
      },
      {
        path: "user-details",
        Component: UserDetails,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
