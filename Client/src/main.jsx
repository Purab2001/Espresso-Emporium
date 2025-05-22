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
        loader: () => fetch('https://espressoemporium.vercel.app/coffees'),
        hydrateFallbackElement: <LoadingSpinner/>,
        Component: Home,
      },
      {
        path: "addCoffee",
        element: (
          <ProtectedRoutes>
            <AddCoffee />
          </ProtectedRoutes>
        ),
      },
      {
        path: "coffee/:id",
        loader: ({ params }) => fetch(`https://espressoemporium.vercel.app/coffees/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner/>,
        element: (
          <ProtectedRoutes>
            <CoffeeDetails />
          </ProtectedRoutes>
        ),
      },
      {
        path: "update-coffee/:id",
        loader: ({ params }) =>
          fetch(`https://espressoemporium.vercel.app/coffees/${params.id}`),
        hydrateFallbackElement: <LoadingSpinner />,
        element: (
          <ProtectedRoutes>
            <UpdateCoffee />
          </ProtectedRoutes>
        ),
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
          fetch('https://espressoemporium.vercel.app/users'),
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
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
