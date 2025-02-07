"use client";

import { useSession } from "next-auth/react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import CategoriesCard from "../components/categories/CategoriesCard";
import "../components/hr.css";
import { Spinner } from "react-bootstrap"; // Import Spinner

const Category = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Add loading state
  const [allProducts, setAllProducts] = useState([]);

  // let addButton;
  // if (session?.user?.email === "yulu123@gmail.com") {
  //   addButton = (
  //     <Link href={"/addproduct"}>
  //       <button className="custom-file-upload">
  //         <span className="font-bold">Add Category</span> <ControlPointIcon />
  //       </button>
  //     </Link>
  //   );
  // }

  const handleGetProducts = async () => {
    setLoading(true); // Set loading to true before fetching
    try {
      const response = await fetch(`/api/category`);
      const data = await response.json();
      setAllProducts(data.Categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  return (
    <>
      <style>{`
        body {
          background-color: white;
        }
      `}</style>

      <div>
        <div className="container mt-5">
          {/* <div className="flex justify-between"> */}
            {/* <div className=" bgVideoText"> */}
              <h1 className="heading text-black text-[39px] font-extrabold font-text text-center italic">Our <span className="text-[#248ccb]">Categories</span></h1>
            {/* </div> */}
            {/* <div className="mt-2">{addButton}</div> */}
          {/* </div> */}
          {/* <div className="hr-category"></div> */}

          {/* Display loading spinner while fetching categories */}
          {loading ? (
            <div className="p-5 flex justify-center items-center" style={{ height: '100vh' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4 mb-[70px]">
              {allProducts?.length > 0 ? (
                allProducts.map((items, i) => (
                  <CategoriesCard key={i} items={items} />
                ))
              ) : (
                <div className="py-5 my-5">No category found</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Category;
