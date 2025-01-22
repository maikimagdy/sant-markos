import React from "react";
import NavBar from "./Components/NavBar";
import { Outlet } from "react-router-dom";
import Body from "./Components/Body";

function Home() {
  return (
    <div className="">
      <NavBar />
      <Outlet />
      <Body />
    </div>
  );
}

export default Home;
