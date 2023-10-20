import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";

function RouteList() {
  return (
    <>
      <Routes>
        <Route path="/" Component={LandingPage} />
      </Routes>
    </>
  );
}

export default RouteList;
