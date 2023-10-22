import React, { useState } from "react";
import Yenetta from "../../assets/image/Yenetta.png";
import { FaSpinner, FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import AddProductValidation from "../AddProduct/AddProductValidation";
import InputField from "../../components/InputField/InputField";
import Button from "../../components/Button/Button";
import * as api from "../../api/ProductApi";
import { useMutation, useQueryClient } from "react-query";
function EditPopUp({ Edit_Pop_Up, editData }) {
  const queryClient = useQueryClient();

  const EditProduct = async (data) => {
    const response = await api.UpdateProducts(data, editData.id);
    return response;
  };
  const EditProductMutation = useMutation(EditProduct, {
    onSuccess: async (response) => {
      await queryClient.invalidateQueries(["ProductList"]);
      Edit_Pop_Up(false);
    },
  });
  const onSubmit = async () => {
    EditProductMutation.mutate(values);
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
      product_name: editData.product_name,
      product_description: editData.product_description,
      price: editData.price,
      quantity: editData.quantity,
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
    Edit_Pop_Up(false);
  };
  const handleCancelPopUp = () => {
    Edit_Pop_Up(false);
  };
  return (
    <div class="fixed inset-0 p-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <form
        onSubmit={handleSubmit}
        class="w-full max-w-lg bg-white shadow-lg rounded-lg px-5 py-4 relative"
      >
        <div className="flex justify-between items-center mb-3">
          <img src={Yenetta} className="h-8" alt="" />
          <FaTimes
            size={20}
            className="cursor-pointer"
            onClick={handleCancelPopUp}
          />
        </div>
        <h1 className="mb-4 text-center font-roboto text-xl ">Edit Product</h1>
        <div className="grid grid-cols-2 gap-x-4 mb-2 md:grid-cols-1 md:gap-0">
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
        <div className="flex flex-col gap-2">
          {EditProductMutation.isLoading ? (
            <Button
              className="bg-blue flex gap-2 text-white hover:bg-blue_hover"
              text="Updating "
              disabled={true}
              iconSize={18}
              icon={FaSpinner}
              animation="animate-spin"
            />
          ) : (
            <Button
              text="Update Change"
              type="submit"
              // onClick={onSubmit}
              className="bg-blue text-white hover:bg-blue_hover"
            />
          )}
          <Button
            text="Cancel Change"
            onClick={handleClear}
            type="button"
            className="bg-cancel bg-opacity-50 hover:bg-opacity-80"
          />
        </div>
      </form>
    </div>
  );
}

export default EditPopUp;
