import React from "react";
import { useQuery } from "react-query";
import * as api from "../../api/ProductApi";
import ProductListComponent from "./ProductListComponent";
import Loading from "../../assets/image/Loading.gif";
function ProductList() {
  const {
    data: productsList,
    isLoading,
    isError,
  } = useQuery("ProductList", () => api.AllProducts());


  if (isLoading) {
    return (
      <div class="bg-transparent fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000]">
        <div class="w-full flex justify-center items-center max-w-lg rounded-md px-5 py-4 relative">
          <img src={Loading} className="w-24 " alt="" />
        </div>
      </div>
    );
  }
  return (
    <>{productsList && <ProductListComponent ProductData={productsList} />}</>
  );
}

export default ProductList;
