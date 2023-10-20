import React from "react";
import YenettaImage from "../../assets/image/Yenetta.png";
import { BsChevronDoubleRight } from "react-icons/bs";
import Button from "../../components/Button/Button";
import Product from "../../assets/image/Product.png";
import { useNavigate } from "react-router-dom";
function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-2 h-screen md:grid-cols-1 md:mb-10">
      <div className="bg-landingPageBg bg-cover bg-no-repeat bg-center md:bg-none ">
        <img
          src={Product}
          alt=""
          className="hidden md:flex object-cover md:px-10"
        />
      </div>
      <div className="pt-20 px-10 md:px-3 md:pt-0">
        <img src={YenettaImage} alt="" className="h-16 md:h-12" />
        <p className="flex flex-col font-roboto text-2xl font-bold pt-16 pl-4 md:pt-10">
          <span className="">Streamline</span>
          <span className="">Your</span>
          <span className="">Product Management</span>
        </p>
        <p className="pl-4 pt-4 font-light text-gray-700 md:text-sm">
          Effortlessly Manage Your Product Inventory – Where Things Get Easier,
          and Efficiency Takes Charge.
        </p>
        <Button
          text="Get Started"
          className="bg-blue text-white w-60 ml-4 mt-20 hover:bg-blue_hover md:mt-16"
          icon={BsChevronDoubleRight}
          iconSize={16}
          onClick={() => {
            navigate("/products");
          }}
        />
        <p className="pl-4 font-thin text-xs mt-2 text-gray-500 ">
          Join thousands of businesses that trust us for product management.
        </p>
      </div>
    </div>
  );
}

export default LandingPage;
