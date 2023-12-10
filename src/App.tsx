import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout } from "./routes/routes";
import { Suspense } from "react";
import Loading from "./components/loading";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot-password";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "signup",
      element: <Register />,
    },
    {
      path: "accounts-forgot-password",
      element: <ForgotPassword />,
    },
    {
      path: "/home",
      element: <Layout />,
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
