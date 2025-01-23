import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../config/firebase.ts";
import { signOut } from "firebase/auth";
import logo from "../assets/st-markos.webp";

function NavBar() {
  const [user, loading] = useAuthState(auth);
  const nav = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      nav("/");
    } catch (err) {
      console.error("Error signing out:", err.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-between bg-purple-950 text-white p-8">
        <h1
          className=" bg-cover bg-center rounded-full"
          style={{ backgroundImage: `url(${logo})` }}
        ></h1>
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-between bg-purple-950 text-white md:p-4 p-3 items-center">
      <h1
        className="w-20 h-20 bg-cover bg-center rounded-full"
        style={{ backgroundImage: `url(${logo})` }}
      ></h1>
      <p className="md:text-3xl  font-bold animate-pulse">ST-Markos</p>
      {user ? (
        <div>
          <button
            onClick={handleSignOut}
            className="text-white w-full font-semibold p-4 rounded-md bg-orange-500 hover:bg-orange-400 transition duration-200 ease-in-out shadow-lg"
          >
            LogOut
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link
            className="bg-orange-500  font-semibold md:px-8 p-3 rounded-md flex items-center justify-center hover:bg-orange-400"
            to={"/login"}
          >
            Login
          </Link>
          <Link
            className="bg-orange-500  font-semibold md:px-8 p-3 py-4 rounded-md  flex items-center justify-center hover:bg-orange-400"
            to={"/signup"}
          >
            SignUp
          </Link>
        </div>
      )}
    </div>
  );
}

export default NavBar;
