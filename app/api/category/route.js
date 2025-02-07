import connectMongoDB from "../../../lib/mongodb";
import Category from "../../../models/category";
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
  const { title1, description1, img1 } = await request.json();
  console.log(title1, description1, img1);
  await connectMongoDB();
  const response = await cloudinary.uploader.upload(img1[0]);
  await Category.create({ title1, description1, image1: response.url });
  return NextResponse.json({ message: "Category Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Categories = await Category.find();
  return NextResponse.json({ Categories });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Category deleted" }, { status: 200 });
}