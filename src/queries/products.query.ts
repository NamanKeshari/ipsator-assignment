import {
  getAllProductCategories,
  getAllProducts,
  getProductByCategory,
  searchProducts,
} from "@/apis/products.api";
import { useQuery } from "react-query";

export enum ProductsQueryEnum {
  PRODUCT_QUERY = "products",
  PRODUCT_SEARCH_QUERY = "products search",
  PRODUCT_CATEGORY_QUERY = "product categories",
  PRODUCT_QUERY_BY_CATEGORY = "product by category",
  PRODUCT_QUERY_BY_ID = "productsByID",
}

export const useGetAllProducts = (
  params: { skip: number; limit?: number } = { skip: 0, limit: 10 }
) => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ProductsQueryEnum.PRODUCT_QUERY,
    queryFn: () => getAllProducts(params),
    ...params,
  });
  return { data, refetch, isLoading, isError };
};

export const useSearchProducts = (
  params: { skip: number; limit?: number; search: string } = {
    skip: 0,
    limit: 10,
    search: "",
  }
) => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ProductsQueryEnum.PRODUCT_SEARCH_QUERY,
    queryFn: () => searchProducts(params),
    enabled: false,
    ...params,
  });
  return { data, refetch, isLoading, isError };
};

export const useGetAllProductCategories = () => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ProductsQueryEnum.PRODUCT_CATEGORY_QUERY,
    queryFn: () => getAllProductCategories(),
    enabled: false,
  });
  return { data, refetch, isLoading, isError };
};

export const useGetProductByCategory = (
  params: { skip: number; limit: number; category: string } = {
    skip: 0,
    limit: 10,
    category: "",
  }
) => {
  const { data, refetch, isLoading, isError } = useQuery({
    queryKey: ProductsQueryEnum.PRODUCT_QUERY_BY_CATEGORY,
    queryFn: () => getProductByCategory(params),
  });

  return { data, refetch, isLoading, isError };
};
