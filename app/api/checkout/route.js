import connectMongoDB from "../../../lib/mongodb";
import Checkout from "../../../models/checkout";
import Product from "../../../models/products";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { email, num, name, country,city, address, products, slipimg,paymentMethod } =
    await request.json();
   
  console.log(email, num, name, country,city, address, products,slipimg,paymentMethod);
  await connectMongoDB();

    // Fetch the latest checkout serial number
    const latestCheckout = await Checkout.findOne().sort({ serialnumber: -1 }); // Sort by num descending
    const newSerialNumber = latestCheckout ? parseInt(latestCheckout?.serialnumber) + 1 : 1001; // Increment or start from 1


  await Checkout.create({
    // user_id: userId,
    serialnumber: newSerialNumber,
    email,
    num,
    name,
    country,
    city,
    address,
    products,
    slipimg,
    paymentMethod
  });
  return NextResponse.json({ message: "Product Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const Checkouts = await Checkout.find().populate({
    path: "products.product_id",
    model: Product,
  });

  return NextResponse.json({ Checkouts });
}

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await connectMongoDB();
  await Checkout.findByIdAndDelete(id);
  return NextResponse.json({ message: "Product deleted" }, { status: 200 });
}
