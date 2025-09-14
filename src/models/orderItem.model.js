const orderItemSchema = new Schema(
  {
    order: {
      type: Types.ObjectId,
      ref: "Order",
      required: true,
    },
    product: {
      type: Types.ObjectId,
      ref: "BookStore",
      required: true,
    },
    title: {
      type: String, // snapshot at time of order
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true, // unit price snapshot
    },
    totalPrice: {
      type: Number,
      required: true, // quantity * price
    },
  },
  { timestamps: true }
);

export const OrderItem = mongoose.model("OrderItem", orderItemSchema);
