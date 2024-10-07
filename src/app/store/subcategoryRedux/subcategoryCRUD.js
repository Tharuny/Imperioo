import axios from "axios";

export const postSubcategoryDetails = async (data) => {
  try {
    const response = await axios.post("/api/subcategory", data);
    return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const getSubcategoryDetails = async (params) => {
  try {
    const response = await axios.get("/api/subcategory?key=subcategories", {
      params,
    });

    return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const putSubcategoryDetails = async (data) => {
  try {
    const response = await axios.put(
      "/api/subcategory?key=subcategories",
      data
    );
    return response.data;
  } catch (error) {
   
    throw error;
  }
};

export const deleteSubcategoryDetails = async (data) => {
  try {
    const response = await axios.delete("/api/subcategory", { data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
