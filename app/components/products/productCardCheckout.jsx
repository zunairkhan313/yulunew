"use client";

import React from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

export default function ProductCardCheckout() {

  const { cart } = useSelector((state) => state.cart);

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

          <div className="mt-1">
            <h4 className="text-lg font-bold font-text">{item.title}</h4>
            <p className=" line-clamp-1 font-text">{truncateText(item?.description, 30)}</p>
            <p className="text-[14px] font-semibold font-text">
              {item?.selectedSize}
            </p>
            <h5 className="font-text font-bold text-[14px] ">Quantity : {item?.quantity}</h5>
          </div>

          <div className="flex gap-2">
            <div></div>
            <div></div>
          </div>
          <div className="flex gap-2 mt-3 ">
            <div className="price mt-4">
              <h5 className="font-text font-bold">{item?.price}/- PKR</h5>
            </div>
          </div>
        </div>
      </div>
    ))
    : "No items in cart";
}
