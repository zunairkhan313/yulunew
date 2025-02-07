import mongoose, { Schema, models } from "mongoose";

const checkoutSchema = new Schema(
  {
    email: { type: String },
    num: { type: String },
    name: { type: String },
    country: { type: String },
    city: { type: String },
    address: { type: String },
    slipimg: { type: [String] },
    paymentMethod: { type: String },
    serialnumber: { type: String },
    products: [
      {
        product_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        selectedSize: { type: String, required: true },
        price: { type: String, required: true },
        quantity: { type: String, required: true },
      },
    ],
  
  },
  {
    timestamps: true,
  }
);

const Checkout = models.Checkout || mongoose.model("Checkout", checkoutSchema);

export default Checkout;
