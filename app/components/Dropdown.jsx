import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Spinner } from "react-bootstrap"; // Import Spinner

export default function Dropdown() {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

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
        <div>
            {/* Display spinner while loading */}
            {loading ? (
                <div className="p-5 flex justify-center items-center">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <>
                    {allProducts?.length > 0 ? (
                        allProducts.map((items, i) => (
                            <div key={i} className="text-start">
                                <Link href={`/product/?id=${items?._id}`}>
                                    <p>{items.title1}</p>
                                </Link>
                            </div>
                        ))
                    ) : (
                        <div className="py-5 my-5">No category found</div>
                    )}
                </>
            )}
        </div>
    );
}
