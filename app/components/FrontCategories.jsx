"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import "../components/hr.css";
import { Spinner } from "react-bootstrap"; // Import Spinner
import FrontCategoriesCard from "./FrontCategoriesCard";

const FrontCategories = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // Add loading state
  const [allProducts, setAllProducts] = useState([]);


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
  

          {/* Display loading spinner while fetching categories */}
          {loading ? (
            <div className="p-5 flex justify-center items-center" style={{ height: '100vh' }}>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="flex flex-wrap justify-around">
              {allProducts?.length > 0 ? (
                allProducts.map((items, i) => (
                  <FrontCategoriesCard key={i} items={items} />
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

export default FrontCategories;
