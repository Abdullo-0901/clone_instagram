import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Layout, Login, Register } from "./routes/routes";
import { Suspense } from "react";
import Loading from "./components/loading";
import Home from "./pages/home";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/accounts/emailsignup",
      element: <Register />,
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
