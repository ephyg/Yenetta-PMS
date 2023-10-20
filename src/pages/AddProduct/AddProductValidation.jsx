import * as yup from "yup";

const AddProductValidation = yup.object().shape({
  product_name: yup.string().required("Product Name is required"),
  product_description: yup.string().required("Product Description is required"),
  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),
  quantity: yup
    .number()
    .typeError("Quantity must be a number")
    .required("Quantity is required"),
});
export default AddProductValidation