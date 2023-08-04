import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Product, Products } from "./interfaces/products.interface";
import { useGetAllProducts, useSearchProducts } from "@/queries/products.query";
import Loading from "@/components/Loading";

const Context = createContext(
  {} as {
    data: Products;
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    sort: boolean;
    setSort: Dispatch<SetStateAction<boolean>>;
    setCategory: Dispatch<SetStateAction<string>>;
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
    category: string;
  }
);

export function useHomePageDetails() {
  return useContext(Context);
}

const ContextProvider = ({ children }: { children: any }) => {
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<boolean>(true);
  const [category, setCategory] = useState<string>("all");
  const [page, setPage] = useState<number>(1);

  const {
    data: searchData,
    refetch: searchRefetch,
    isLoading: searchIsLoading,
    isError: searchIsError,
  } = useSearchProducts({
    search,
    skip: (page - 1) * 10,
    limit: 10,
  });

  const { data, refetch, isError, isLoading } = useGetAllProducts({
    skip: (page - 1) * 10,
    limit: 10,
  });

  const debounce = (func: any, timeout = 300) => {
    let timer: any;
    return (...args: any): void => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };

  useEffect(() => {
    if (search) {
      debounce(() => {
        console.log(search, "hi please see me, im search");
        searchRefetch();
      }, 1000)();
    } else {
      refetch();
    }
  }, [search, page, category]);

  const updatedData = useMemo(() => {
    const finalData = search ? searchData : data;
    const temp: Product[] = finalData?.products?.slice(0, 10);
    if (temp) {
      temp?.sort((a, b) => (sort ? a.price - b.price : b.price - a.price));
      finalData.products = [...temp];
    }
    return finalData;
  }, [sort, search, searchData, data]);

  const updateByCategory = useMemo(() => {
    const temp: Product[] = updatedData?.products;
    if (temp && temp.length > 0 && category !== "all") {
      const res = temp.filter((product) => product.category === category);
      updatedData.products = [...res];
    }
    return updatedData;
  }, [sort, search, searchData, data, updatedData, category]);

  const contextValue = useMemo(
    () => ({
      data: updateByCategory,
      search,
      setSearch,
      setSort,
      setCategory,
      sort,
      page,
      setPage,
      category,
    }),
    [
      sort,
      search,
      searchData,
      data,
      updatedData,
      setSort,
      setSearch,
      category,
      setCategory,
      page,
      setPage,
      updateByCategory,
    ]
  );

  return (
    <Context.Provider value={contextValue}>
      {isLoading || searchIsLoading ? (
        <div className="h-screen w-full flex justify-center items-center">
          <Loading />
        </div>
      ) : isError || searchIsError ? (
        <div className="h-full w-full flex justify-center items-center">
          Some Error occurred
        </div>
      ) : (
        children
      )}
    </Context.Provider>
  );
};

export default ContextProvider;
