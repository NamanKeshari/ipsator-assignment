import React from "react";
import { useHomePageDetails } from "../containers/home/Context";
import Product from "./Product";

function Products() {
  const { data } = useHomePageDetails();
  return (
    <div className="mt-4 space-y-4">
      {data?.products.length > 0 ? (
        data?.products.map((product) => (
          <Product key={product.id} product={product} />
        ))
      ) : (
        <div className="mt-4 w-full h-full flex justify-center items-center">
          No Results found
        </div>
      )}
    </div>
  );
}

export default Products;
