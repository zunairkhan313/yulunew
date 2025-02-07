import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema(
  {
    title1: { type: String },
    description1: { type: String },
    image1: { type: String },
  
 
  },
  {
    timestamps: true,
  }
);

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;