import connectMongoDB from "../../../lib/mongodb";
import Product from "../../../models/products";
import { NextResponse } from "next/server";

import cloudinary from "cloudinary";
import config from "@/utils/config";

// Configuration
cloudinary.config({
  cloud_name: config.CLOUD_NAME,
  api_key: config.API_KEY,
  api_secret: config.API_SECRET,
});

export async function POST(request) {
  const { title, description, img, smprice, mdprice, lgprice, xlprice, small,medium,large,xlarge,discount,disPrice, code,video,stock, categoryId } =
    await request.json();
    console.log(title, description, img, smprice, mdprice, lgprice, xlprice, small,medium,large,xlarge, discount,disPrice,code,video,stock ,categoryId );
    

  await connectMongoDB();
  let uploadImages = img.map((item) => cloudinary.uploader.upload(item));

  uploadImages = (await Promise.all(uploadImages)).map((item) => item.url);

  await Product.create({
    title,
    description,
    images: uploadImages,
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

  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET(request) {
  await connectMongoDB();
  const id = request.nextUrl.searchParams.get("id");

  console.log("productID - server", id);

  if (id) {
    const product = await Product.findById(id);
    return NextResponse.json({ product });
  }

  const Products = await Product.find();

  return NextResponse.json({ Products });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Product.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
