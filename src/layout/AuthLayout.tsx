import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="grid grid-cols-2">
      <div>
        <p>Uaht</p>
      </div>
      <div>
        <Outlet />
      </div>
    </main>
  );
};

export default AuthLayout;
