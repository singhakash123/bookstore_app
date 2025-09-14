import mongoose, { Schema, Types } from "mongoose";

const bookStoreSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },

    author: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    genre: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    coverImage: {
      type: String,
      default: "https://dummyimage.com/300x400/cccccc/000000&text=No+Cover",
    },

    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    publishedYear: {
      type: Number,
      default: 0,
    },

    ISBN: {
      type: String,
      unique: true,
      sparse: true,
    },

    stock: {
      type: Number,
      default: 1,
      min: 0,
    },

    averageRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    numberOfRatings: {
      type: Number,
      default: 0,
    },

    isPublished: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔍 For better search support
bookStoreSchema.index({ title: "text", description: "text", genre: "text" });

export const BookStore = mongoose.model("BookStore", bookStoreSchema);

/*
Breakdown 🔎

bookStoreSchema.index(...)
→ Iska use schema pe custom index banane ke liye hota hai. Index query ko fast banata hai.

{ title: "text", description: "text", genre: "text" }
→ Ye batata hai ki title, description, aur genre fields ko text index ke andar include karo.

"text" ka matlab hai MongoDB text index type (full-text search ke liye).

*/
/*
Use Case ✨
const books = await BookStore.find({
  $text: { $search: "mystery adventure" }
});

👉 Ye query title, description, aur genre ke andar "mystery adventure" words ko search karegi.

Example:

Agar ek book ka title: "The Mystery of Jungle", genre: "Adventure", description: "A thrilling jungle journey" hai.
Aur tum $text: { $search: "jungle adventure mystery" } query karoge → ye book result me aayegi.
*/