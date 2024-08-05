import { get, getWithParams, post, put, remove } from "../services/conexion";

export const getProducts = async () => {
  try {
    const data = await get("/bp/products");
    return data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const existProduct = async (id: string) => {
  try {
    const data = await getWithParams("/bp/products/verification", { id });
    return data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const saveProduct = async (product: any) => {
  try {
    const data = await post("/bp/products", product);
    return data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const updateProduct = async (product: any) => {
  try {
    const data = await put("/bp/products", product);
    return data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const data = await remove(`/bp/products?id=${id}`);
    return data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};