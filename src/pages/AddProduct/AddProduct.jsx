import React from "react";
import NewProduct from "../../assets/image/new_product.jpg";
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import { useFormik } from "formik";
import AddProductValidation from "./AddProductValidation";
import * as api from "../../api/ProductApi";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { FaSpinner } from "react-icons/fa";
function AddProduct() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addNewProduct = async (data) => {
    const response = await api.AddNewProducts(data);
    return response;
  };
  const addNewProductMutation = useMutation(addNewProduct, {
    onSuccess: (response) => {
      queryClient.invalidateQueries(["ProductList"]);
      navigate("/products");
    },
  });
  const onSubmit = (values) => {
    console.log(values);
    addNewProductMutation.mutate(values);
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useFormik({
    initialValues: {
      product_name: "",
      product_description: "",
      price: "",
      quantity: "",
    },
    validationSchema: AddProductValidation,
    onSubmit,
  });
  const handleClear = () => {
    setValues({
      product_name: "",
      product_description: "",
      price: "",
      quantity: "",
    });
  };

  return (
    <>
      <NavigationBar />
      <div className="px-52 mt-36 grid grid-cols-2 md:grid-cols-1 md:px-3 lg:grid-cols-1">
        <div className="flex justify-center items-center md:hidden">
          <img src={NewProduct} alt="" />
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex  border-blue rounded-md flex-col pt-2 px-16 md:px-0 lg:px-0"
        >
          <h1 className="text-2xl font-roboto text-center">New Product</h1>
          <div className="flex flex-col mt-5 gap-1">
            <InputField
              label="Product Name"
              placeholder="Example Product"
              type="text"
              id="product_name"
              name="product_name"
              value={values.product_name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.product_name && touched.product_name ? (
                  errors.product_name
                ) : (
                  <p className="text-white">.</p>
                )
              }
            />
            <InputField
              label="Product Description"
              placeholder="Example of Product Description"
              type="text"
              id="product_description"
              name="product_description"
              value={values.product_description}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.product_description && touched.product_description ? (
                  errors.product_description
                ) : (
                  <p className="text-white">.</p>
                )
              }
            />
            <InputField
              label="Price"
              placeholder="200"
              type="text"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.price && touched.price ? (
                  errors.price
                ) : (
                  <p className="text-white">.</p>
                )
              }
            />
            <InputField
              label="Quantity"
              placeholder="12"
              type="text"
              id="quantity"
              name="quantity"
              value={values.quantity}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                errors.quantity && touched.quantity ? (
                  errors.quantity
                ) : (
                  <p className="text-white">.</p>
                )
              }
            />
          </div>
          <div className="flex flex-col mt-5 mb-5 gap-2">
            {addNewProductMutation.isLoading ? (
              <Button
                className="bg-blue flex gap-2 text-white hover:bg-blue_hover"
                text="Add Product  "
                disabled={true}
                iconSize={18}
                icon={FaSpinner}
                animation="animate-spin"
              />
            ) : (
              <Button
                text="Add Product"
                type="submit"
                onClick={onsubmit}
                className="bg-blue text-white hover:bg-blue_hover"
              />
            )}
            <Button
              text="Clear"
              onClick={handleClear}
              type="button"
              className="bg-cancel bg-opacity-50 hover:bg-opacity-80"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default AddProduct;
