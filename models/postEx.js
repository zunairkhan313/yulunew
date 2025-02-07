// import mongoose, { Schema, models } from "mongoose";

// const postSchema = new Schema(
//   {
//     email: { type: String },
//     num: { type: String },
//     name: { type: String },
//     country: { type: String },
//     city: { type: String },
//     address: { type: String },
//     total: { type: String },
//     products: [
//       {
//         product_id: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         selectedSize: { type: String, required: true },
//         price: { type: String, required: true },
//         quantity: { type: String, required: true },
//       },
//     ],
  
//   },
//   {
//     timestamps: true,
//   }
// );

// const Post = models.Post || mongoose.model("Post", postSchema);

// export default Post;
