import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.ts";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(false);

  const adminEmail = "stmarkos42@gmail.com";

  useEffect(() => {
    if (user && user.email === adminEmail) {
      setWelcome(true);

      const timer = setTimeout(() => {
        navigate("/shownames");
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [user, navigate]);

  // Sign out unauthorized user and return to login
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // ==========================================
  // No user is logged in
  // ==========================================
  if (!user) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="w-full max-w-lg rounded-2xl bg-white border border-gray-200 shadow-lg p-8 text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50">
            <span className="text-3xl">🔐</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            Welcome to ST-Markos
          </h1>

          <p className="text-gray-500 mb-6">
            Please sign in to continue.
          </p>

          <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 text-left">
            <h2 className="font-semibold text-blue-800 mb-2">
              💡 Demo Access
            </h2>

            <p className="text-sm text-blue-700 mb-4">
              Use the following credentials to review the application:
            </p>

            <div className="space-y-2">

              <div className="rounded-lg bg-white border border-blue-100 px-4 py-3">
                <p className="text-xs text-gray-400 uppercase">
                  Email
                </p>

                <p className="text-sm font-medium text-gray-700">
                  {adminEmail}
                </p>
              </div>

              <div className="rounded-lg bg-white border border-blue-100 px-4 py-3">
                <p className="text-xs text-gray-400 uppercase">
                  Password
                </p>

                <p className="text-sm font-medium text-gray-700">
                  852456
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    );
  }

  // ==========================================
  // Authorized admin user
  // ==========================================
  if (user.email === adminEmail) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4">
        <div className="text-center">

          {welcome && (
            <>
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <span className="text-3xl">✓</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Welcome!
              </h1>

              <p className="text-gray-500">
                You signed in successfully as an authorized user.
              </p>

              <p className="text-sm text-gray-400 mt-3">
                Redirecting you to the application...
              </p>
            </>
          )}

        </div>
      </div>
    );
  }

  // ==========================================
  // Authenticated but unauthorized user
  // ==========================================
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-lg rounded-2xl bg-white border border-red-100 shadow-lg p-8 text-center">

        {/* Lock Icon */}
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <span className="text-3xl">🔐</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          Access Restricted
        </h1>

        <p className="text-gray-500 mb-6 leading-relaxed">
          Your account has been successfully authenticated, but it is
          not authorized to access the ST-Markos application.
        </p>

        {/* Authentication Status */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-6 text-left">

          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500 font-bold">
              ✓
            </span>

            <span className="text-sm text-gray-700">
              Authentication verified
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-green-500 font-bold">
              ✓
            </span>

            <span className="text-sm text-gray-700">
              User identity checked
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-red-500 font-bold">
              ✕
            </span>

            <span className="text-sm text-gray-700">
              Account is not authorized
            </span>
          </div>

        </div>

        {/* Authorized Demo Account */}
        <div className="rounded-xl bg-blue-50 border border-blue-100 p-5 text-left mb-6">

          <h2 className="font-semibold text-blue-800 mb-2">
            🔑 Authorized Demo Account
          </h2>

          <p className="text-sm text-blue-700 mb-4">
            For website review, please sign in using the authorized
            ST-Markos account:
          </p>

          <div className="rounded-lg bg-white border border-blue-100 px-4 py-3">

            <p className="text-xs text-gray-400 uppercase">
              Email
            </p>

            <p className="text-sm font-medium text-gray-700">
              {adminEmail}
            </p>

          </div>

        </div>

        {/* Sign Up Explanation */}
        <div className="text-left mb-6">

          <h2 className="font-semibold text-gray-800 mb-2">
            📝 About the Sign Up page
          </h2>

          <p className="text-sm text-gray-500 leading-relaxed">
            The Sign Up page is included to demonstrate the user
            registration process and Firebase Authentication flow.
            New accounts can be created to demonstrate the registration
            process, but access to the application is restricted to
            the authorized ST-Markos account.
          </p>

        </div>

        {/* Sign Out Button */}
        <button
          onClick={handleSignOut}
          className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
        >
          ← Sign Out & Return to Sign In
        </button>

      </div>

    </div>
  );
};

export default WelcomePage;
