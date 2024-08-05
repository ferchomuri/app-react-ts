import axios, { AxiosResponse } from "axios";

const API_URL = process.env.REACT_APP_API_URL;

const getHeaders = () => ({
  "Content-Type": "application/json",
  authorId: process.env.REACT_APP_AUTHOR_ID,
});

export const get = async <T>(endpoint: string): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: getHeaders(),
  });
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const getWithParams = async <T>(
  endpoint: string,
  params: any
): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: getHeaders(),
  });
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(endpoint, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error making GET request:", error);
    throw error;
  }
};

export const post = async <T>(endpoint: string, data: any): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: getHeaders(),
  });
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error making POST request:", error);
    throw error;
  }
};

export const put = async <T>(endpoint: string, data: any): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: getHeaders(),
  });
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error making PUT request:", error);
    throw error;
  }
};

export const remove = async <T>(endpoint: string): Promise<T> => {
  const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: getHeaders(),
  });
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error making DELETE request:", error);
    throw error;
  }
};
