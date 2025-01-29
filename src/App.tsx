import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthLayout, MainLayout } from "./layout";
import { Login, Register } from "./pages/auth";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children : [
      {
        path: "/",
        element: <h1>Home</h1>
      }
    ]
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter}></RouterProvider>
    </main>
  );
};

export default App;