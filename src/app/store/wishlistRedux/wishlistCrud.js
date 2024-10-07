import axios from "axios";

export const addProduct = (data) => {
  return axios.post("/api/wishlist", data);
};

export const getProduct = (userId) => {
  return axios.get(`/api/wishlist?${userId}`);
};

export const removeProduct = (productId,userId) => {
  return axios.delete(`/api/wishlist?${productId}?${userId}`);
};
