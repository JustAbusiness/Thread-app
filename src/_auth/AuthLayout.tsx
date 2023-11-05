import { Outlet, Navigate } from "react-router-dom";

function AuthLayout() {
  const isAuthenticated = false;

  return (
    <div className="flex w-full justify-between items-center">
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex items-center flex-col py-10 ml-40">
            <Outlet />
          </section>

          <img src="/assets/images/side-img.svg" alt="logo"  className="hidden xl:block w-[700px] ml-30 h-full object-cover bg-no-repeat"/>
        </>
      )}
    </div>
  );
}

export default AuthLayout;
