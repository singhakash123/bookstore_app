import mongoose, { Schema } from "mongoose";

const refundSchema = new Schema({
  isRefunded:{ 
    type: Boolean, 
    default: false 
  },
  refundId: { 
    type: String, 
    default: null 
  }, // refund txn id
  refundAmount: { 
     type: Number,
     default: 0 },
},
 { timestamps: true }
);

export const Refund = mongoose.model("Refund", refundSchema);
