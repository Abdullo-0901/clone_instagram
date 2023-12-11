import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/routes";
import { Suspense } from "react";
import Loading from "./components/loading";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";
import AuthCheck from "./utils/AuthCheck";
import ProtectRoute from "./utils/ProtectedRoute";

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
