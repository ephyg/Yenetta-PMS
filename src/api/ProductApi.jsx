import axios from "axios";
import baseURL from "./BaseURL";
export const AllProducts = async () => {
  const product = await axios
    .get(`${baseURL}`)
    .then((response) => response.data);
  return product;
};
export const AddNewProducts = async (data) => {
  const product = await axios
    .post(`${baseURL}`, data)
    .then((response) => response.data);
  return product;
};
export const UpdateProducts = async (data, id) => {
  const product = await axios
    .put(`${baseURL}/${id}`, data)
    .then((response) => response.data);
  return product;
};
export const DeleteProducts = async (id) => {
  const product = await axios
    .delete(`${baseURL}/${id}`)
    .then((response) => response.data);
  return product;
};
