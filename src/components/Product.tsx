import Image from "next/image";
import React from "react";
import { Product } from "../containers/home/interfaces/products.interface";

function Product({
  product: { thumbnail, title, description, rating, brand, category, price },
}: {
  product: Product;
}) {
  return (
    <div className="p-4 bg-slate-800 flex space-x-4 rounded-md flex-wrap">
      <Image
        src={thumbnail}
        alt={title}
        width={300}
        height={200}
        style={{ height: "auto", width: "auto" }}
      />
      <div className="flex flex-col lg:space-y-4 lg:mt-0 mt-2 max-w-2xl">
        <h1 className="text-2xl text-red-500 font-medium">{title}</h1>
        <div className="flex flex-col lg:space-y-1">
          <p className="">{description}</p>
          <p>Rating: {rating}</p>
          <p>Brand: {brand}</p>
          <p>Category: {category}</p>
          <p className="font-medium">Price: ₹ {price}</p>
        </div>
      </div>
    </div>
  );
}

export default Product;
