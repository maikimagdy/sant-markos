import React from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.ts";

function Home() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <NavBar />

      {!user && (
        <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center px-4">
          
          {/* Tip */}
          <div className="w-full max-w-md mb-6">
            <div className="rounded-xl border border-blue-200 bg-blue-50 px-5 py-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span>💡</span>
                <h2 className="font-semibold text-blue-800">
                  Quick Tip
                </h2>
              </div>

              <p className="text-sm text-blue-700 mb-3">
                Use these credentials to review the website:
              </p>

              <div className="flex gap-3">
                <div className="flex-1 rounded-lg bg-white border border-blue-100 px-3 py-2">
                  <p className="text-xs text-gray-400">Email</p>
                  <p className="text-sm font-medium text-gray-700 truncate">
                    stmarkos42@gmail.com
                  </p>
                </div>

                <div className="w-32 rounded-lg bg-white border border-blue-100 px-3 py-2">
                  <p className="text-xs text-gray-400">Password</p>
                  <p className="text-sm font-medium text-gray-700">
                    852456
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Login */}
          <div className="w-full max-w-2xl">
            <Outlet />
          </div>

        </div>
      )}

      {user && <Outlet />}
    </div>
  );
}

export default Home;
