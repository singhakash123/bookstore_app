import mongoose, { Types, Schema } from "mongoose";


const paymentSchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: Types.ObjectId,
      ref: "BookStore", // keep consistent with your book schema
      required: true,
    },

    amount: {
      type: Number,
      default: 0,
      required: true,
    },

    currency: {
      type: String,
      enum: ["INR", "USD", "EUR"],
      default: "INR",
    },

    paymentMethod: {
      type: String,
      enum: ["UPI", "CARD", "COD", "WALLET", "NETBANKING"],
      required: true,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED"],
      default: "PENDING",
    },

    transactionId: {
      type: String,
      unique: true,
      required: true,
    },

    paymentGatewayResponse: {
      type: Object, // raw response from Razorpay/Stripe/PayPal
    },

    refund: {
      type: Types.ObjectId,
      ref: "Refund",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment = mongoose.model("Payment", paymentSchema);
