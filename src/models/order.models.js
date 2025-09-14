import mongoose, { Schema, Types } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        type: Types.ObjectId,
        ref: "OrderItem", // reference to separate OrderItem collection
      },
    ],
    shippingAddress: {
      type: Types.ObjectId,
      ref: "Address", // separate Address schema
      required: true,
    },
    payment: {
      type: Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending","Processing","Packed","Shipped","OutForDelivery","Delivered","Cancelled"],
      default: "Pending",
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    grandTotal: {
      type: Number,
      required: true,
    },
    deliveredAt: Date,
    cancelledAt: Date,
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
