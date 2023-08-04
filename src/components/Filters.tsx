import { useHomePageDetails } from "@/containers/home/Context";
import { useGetAllProductCategories } from "@/queries/products.query";
import React, { useEffect } from "react";

function Filters() {
  const { search, setSearch, setSort, setCategory, sort, category } =
    useHomePageDetails();
  const { data: categories, refetch } = useGetAllProductCategories();

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className="flex mt-4 justify-between flex-wrap">
      <div className="flex flex-1 lg:flex-[0.5]">
        <input
          type="search"
          className="relative m-0 rounded-md block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
          placeholder="Search products"
          aria-label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex flex-row lg:space-x-4 lg:mt-0 mt-2 space-x-2">
        <button
          onClick={() => setSort((prev) => !prev)}
          type="button"
          className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          {sort ? "Desc Price" : "Asc Price"}
        </button>
        <div>
          <select
            id="categories"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          >
            <option value={"all"}>Choose a category</option>
            {categories?.map((category: any) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filters;
