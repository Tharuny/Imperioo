import axios from "axios";

export const addProduct = (data) => {
  return axios.post("/api/cart", data);
};

export const getProduct = (userId) => {
  return axios.get(`/api/cart?${userId}`);
};

export const removeProduct = (productData) => {
  return axios.delete("/api/cart", { data: productData });
};
