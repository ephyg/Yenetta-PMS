import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "../pages/LandingPage/LandingPage";
import AddProduct from "../pages/AddProduct/AddProduct";
import ProductList from "../pages/ProductListPage/ProductList";

function RouteList() {
  return (
    <>
      <Routes>
        <Route path="/" Component={LandingPage} />
        <Route path="/products" Component={ProductList} />
        <Route path="/add-product" Component={AddProduct} />
      </Routes>
    </>
  );
}

export default RouteList;
