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
        <h1 className="text-xl font-semibold ml-2 ">
          Welcome to ST-Markos Page Please Sign In To Continue...
          <p> use this email and password for website review:</p>
           <div className:"flex flex-col align-center items-center"><p> email:stmarkos42@gmail.com</p>
                 <p>pass:852456</p>
          </div>
        </h1>
      )}
      <Outlet />
    </div>
  );
}

export default Home;
