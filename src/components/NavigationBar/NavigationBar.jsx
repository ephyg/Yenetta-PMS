import React, { useState } from "react";
import YenettaImage from ".././../assets/image/Yenetta.png";
import { FaListUl, FaPlus } from "react-icons/fa";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function NavigationBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const pathName = location.pathname;
  return (
    <div className="fixed top-0 left-0 right-0">
      <div className="flex justify-center items-center bg-white py-3">
        <img src={YenettaImage} alt="" className="h-10" />
      </div>
      <div className="flex bg-blue h-16 px-52 justify-between items-center text-white font-roboto md:px-3">
        <h1
          onClick={() => {
            navigate("/");
          }}
          className="px-3 py-1 hover:bg-opacity-20 hover:ease-in-out hover:duration-300 cursor-pointer hover:bg-white_gray"
        >
          Home
        </h1>
        <div className="flex gap-6">
          <div
            className={`flex items-center justify-center gap-3 hover:bg-opacity-20 hover:ease-in-out hover:duration-300 cursor-pointer px-3 py-1 rounded-smd ${
              pathName == "/products" ? "bg-white_gray bg-opacity-30" : ""
            }`}
            onClick={() => {
              navigate("/products");
            }}
          >
            <FaListUl className="md:hidden" />
            <h1 className="">Product List</h1>
          </div>
          <div
            className={`flex items-center justify-center gap-3 hover:bg-opacity-20 hover:bg-white_gray hover:ease-in-out hover:duration-300 cursor-pointer px-3 py-1 rounded-smd ${
              pathName == "/add-product" ? "bg-white_gray bg-opacity-30" : ""
            }`}
            onClick={() => {
              navigate("/add-product");
            }}
          >
            <FaPlus className="md:hidden" />
            <h1>Add Product</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationBar;
