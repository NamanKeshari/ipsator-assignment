import axios from "axios";

export const getAllProducts = async (params: {
  skip: number;
  limit?: number;
}) => {
  const { skip, limit } = params;
  const { data } = await axios.get(
    `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
  );

  return data;
};

export const searchProducts = async (params: {
  search: string;
  skip: number;
  limit?: number;
}) => {
  const { skip, limit, search } = params;
  const { data } = await axios.get(
    `https://dummyjson.com/products/search?q=${search}&limt=${limit}&skip=${skip}`
  );

  return data;
};

export const getAllProductCategories = async () => {
  const { data } = await axios.get(`https://dummyjson.com/products/categories`);

  return data;
};

export const getProductByCategory = async (params: {
  category: string;
  skip: number;
  limit: number;
}) => {
  const { category, skip, limit } = params;
  const { data } = await axios.get(
    `https://dummyjson.com/products/category/${category}?skip=${skip}&limit=${limit}`
  );

  return data;
};
