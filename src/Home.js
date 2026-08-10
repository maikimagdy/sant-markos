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
        <div className="text-xl font-semibold ml-2">
  <h1>Welcome to ST-Markos Page</h1>

  <p>Please Sign In To Continue...</p>

  <p>Use this email and password for website review:</p>

  <div className="flex flex-col items-center">
    <p>Email: stmarkos42@gmail.com</p>
    <p>Password: 852456</p>
  </div>
</div>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
