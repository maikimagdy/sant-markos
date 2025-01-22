import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase.ts";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [welcome, setWelcome] = useState(false);
  useEffect(() => {
    if (user) {
      if (user.email === "stmarkos42@gmail.com") {
        setWelcome(true);
        setTimeout(() => {
          navigate("/shownames");
        }, 1500);
      }
    }
  }, [user, navigate]);

  // If no user is logged in
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-3xl">Please Sign In To Continue...</h1>
      </div>
    );
  }

  // If the email is the admin email
  if (user.email === "stmarkos42@gmail.com") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        {welcome && (
          <h1 className="text-3xl font-bold text-center">
            Welcome! You Signed In As Admin...
          </h1>
        )}
      </div>
    );
  }

  // If the email is not the admin email, show access denied
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg border-l-4 border-red-600">
        <h1 className="text-3xl font-semibold text-red-600">Access Denied</h1>
        <p className="mt-4 text-gray-700">
          Please sign in with the correct email to access this page.
        </p>
      </div>
    </div>
  );
};

export default WelcomePage;
