import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthProvider from "./context/AuthContext";

const AuthLayout = lazy(() => import("./layout/AuthLayout"));
const MainLayout = lazy(() => import("./layout/MainLayout"));
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const FallbackScreen = lazy(
  () => import("./components/fallbackScreen/FallBackScreen")
);
const Profile = lazy(() => import("./pages/profile/Profile"));
const Settings = lazy(() => import("./pages/settings/Settings"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "settings",
        element : <Settings />,
      }
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
    <AuthProvider>
      <main>
        <Suspense fallback={<FallbackScreen />}>
          <RouterProvider router={appRouter}></RouterProvider>
        </Suspense>
      </main>
    </AuthProvider>
  );
};

export default App;