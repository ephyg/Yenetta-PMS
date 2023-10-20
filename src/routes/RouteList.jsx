import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import ProductListPage from "../pages/ProductListPage/ProductListPage";
import AddProduct from "../pages/AddProduct/AddProduct";

function RouteList() {
  return (
    <>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/products" Component={ProductListPage} />
        <Route path="/add-product" Component={AddProduct} />
      </Routes>
    </>
  );
}

export default RouteList;
