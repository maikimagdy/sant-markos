import React from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase.ts";

function Home() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h1>Loading...</h1>; // Optionally show a loading message while auth is being processed
  }

  return (
    <div>
      <NavBar />
{!user && (
  <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 px-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl border border-gray-100 text-center">
      
      {/* Icon */}
      <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
        <span className="text-3xl">👋</span>
      </div>

      {/* Welcome */}
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Welcome to ST-Markos
      </h1>

      <p className="text-gray-500 mb-6">
        Please sign in to continue and explore the website.
      </p>

      {/* Review Notice */}
      <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 text-left">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">
          🔍 Website Review
        </h2>

        <p className="text-sm text-gray-600 mb-4">
          You can use the credentials below to review the website:
        </p>

        {/* Credentials */}
        <div className="space-y-3">
          <div className="rounded-lg bg-white px-4 py-3 border border-blue-100">
            <p className="text-xs font-medium text-gray-400 uppercase">
              Email
            </p>
            <p className="text-sm font-semibold text-gray-800 break-all">
              stmarkos42@gmail.com
            </p>
          </div>

          <div className="rounded-lg bg-white px-4 py-3 border border-blue-100">
            <p className="text-xs font-medium text-gray-400 uppercase">
              Password
            </p>
            <p className="text-sm font-semibold text-gray-800">
              852456
            </p>
          </div>
        </div>
      </div>

      <p className="mt-5 text-xs text-gray-400">
        These credentials are provided for website review purposes.
      </p>
    </div>
  </div>
)}
      <Outlet />
    </div>
  );
}

export default Home;
