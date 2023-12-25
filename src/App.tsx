import { Suspense } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, Profile, UserProfile } from "./routes/routes";

import Loading from "./components/loading";
import Home from "./pages/home";
import Login from "./pages/login";
import SearchQuery from "./pages/search-query";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectedRoute";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <AuthCheck>
          <Login />
        </AuthCheck>
      ),
    },
    {
      path: "signup",
      element: (
        <AuthCheck>
          <Register />
        </AuthCheck>
      ),
    },
    {
      path: "accounts-forgot-password",
      element: (
        <AuthCheck>
          <ForgotPassword />
        </AuthCheck>
      ),
    },
    {
      path: "/home",
      element: (
        <ProtectRoute>
          <Layout />
        </ProtectRoute>
      ),
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<Loading />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "search",
          element: <SearchQuery />,
        },
        {
          path: "profile",
          element: (
            <Suspense fallback={<Loading />}>
              <Profile />
            </Suspense>
          ),
        },
        {
          path:"user/id",
          element:<UserProfile/>
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
