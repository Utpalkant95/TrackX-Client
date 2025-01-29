import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="min-h-screen bg-[#121212] flex items-center justify-center p-4">
        <Outlet />
    </main>
  );
};

export default AuthLayout;
