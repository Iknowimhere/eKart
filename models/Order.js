import { Schema, model } from 'mongoose';
//generate random numbers for order
const randomString = Math.random()
  .toString(36)
  .substring(7)
  .toLocaleUpperCase();
const randomNumbers = Math.floor(1000 + Math.random() * 90000);
const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        type: Object,
        required: true,
      },
    ],
    shippingAddress: {
      type: Object,
      required: true,
    },
    orderNumber: {
      type: String,
      require: true,
      default: randomString + randomNumbers,
    },
    paymentStatus: {
      type: String,
      required: true,
      default: 'Not paid',
    },
    paymentMethod: {
      type: String,
      default: 'Not specified',
    },
    totalPrice: {
      type: Number,
      default: 0.0,
    },
    currency: {
      type: String,
      default: 'not specified',
    },
    //admin
    status: {
      type: String,
      default: 'pending',
      enum: ['pending', 'processing', 'shipped', 'delivered'],
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = model('Order', orderSchema);

export default Order;
