"use client";
import React from "react";
import { HiOutlineTrash } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "@/redux/slices/cartSlice";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ProductCardCart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const removeFromCart = (_id) => {
    let tempArr = [...cart].filter((item) => item._id !== _id);
    dispatch(addCart(tempArr));
  };

  return cart?.length > 0
    ? cart?.map((item, index) => (
        <div
          key={index}
          style={{ height: "100%", width: "100%" }}
          className="mt-3 border border-[#f0f0f0] p-2 bg-body-tertiary rounded"
        >
          <div className="flex flex-wrap gap-3 justify-around">
            {item?.images?.length > 0 && (
              <img
                style={{ height: "100px" }}
                className="rounded object-cover"
                width={100}
                src={item?.images[0]}
                alt={"tshirts"}
              />
            )}

            <div className="mt-2">
              <h4 className="font-text text-[20px] font-bold">{item?.title}</h4>
              <p className="line-clamp-1 text-[14px]">
                {truncateText(item?.description, 30)}
              </p>
              <p className="text-[14px] font-semibold">
                {item.selectedSize}
              </p>
              <h5 className="font-text font-bold text-[14px] mt-1">Quantity : {item?.quantity}</h5>
            </div>

            <div className="flex gap-2 mt-3">
              <div className="price mt-4">
                <h5 className="font-text font-bold">{item?.price}/- PKR</h5>
              </div>

              <div
                className="deleteicon mt-3"
                onClick={() => removeFromCart(item._id)}
              >
                <h3 style={{ marginTop: "7px", cursor: "pointer" }}>
                  <HiOutlineTrash size={20} />
                </h3>
              </div>
            </div>
          </div>
        </div>
      ))
    : "No items in cart";
}
