import ProductDetails from "@/app/components/products/productDetails";
import React from "react";

export default function page() {
  return (

    <>
      <style>{`
        body {
          background-color: white;
        }
        `}</style>
      <ProductDetails />;
    </>
  )
}
