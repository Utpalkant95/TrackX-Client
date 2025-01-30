import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";

const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const FallbackScreen = lazy(
  () => import("./components/fallbackScreen/FallBackScreen")
);
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
    ],
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
      <Suspense fallback={<FallbackScreen />}>
        <RouterProvider router={appRouter}></RouterProvider>
      </Suspense>
    </main>
  );
};

export default App;
