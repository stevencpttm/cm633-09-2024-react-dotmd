import { Outlet, Link, useLoaderData, useRoutes } from "react-router-dom";
import { useEffect } from "react";

function Root() {
  return (
    <>
      <nav className="bg-slate-800 py-2">
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white">
            dotMD
          </Link>

          <Link to="/create" className="text-md text-white">
            Create
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Root;
