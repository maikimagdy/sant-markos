import React from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";
import WelcomePage from "./Components/WelcomePage";

function Home() {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Home;
