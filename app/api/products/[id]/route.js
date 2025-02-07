import connectMongoDB from "../../../../lib/mongodb";
import Product from "../../../../models/products";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { 
    title, description, img, smprice, mdprice, lgprice, xlprice, 
    small, medium, large, xlarge, discount, disPrice, code,video,stock,categoryId 
  } = await request.json();
console.log("params",params);

  await connectMongoDB();

  await Product.findByIdAndUpdate(id, {
    title,
    description,
    images: img,
    smprice,
    mdprice,
    lgprice,
    xlprice,
    small,
    medium,
    large,
    xlarge,
    discount,
    disPrice,
    code,
    video,
    stock,
    category_id: categoryId,
  });

  return NextResponse.json({ message: "Product updated" }, { status: 200 });
}