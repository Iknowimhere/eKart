import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import userRouter from '../routes/userRoutes.js';
import { dbConfig } from '../config/dbConfig.js';
import productRouter from '../routes/productRoutes.js';
import { globalErrorHandler } from '../middlewares/globalErrorHandler.js';
import categoryRouter from '../routes/categoryRoutes.js';
import brandRouter from '../routes/brandRoutes.js';
import colorRouter from '../routes/colorRoutes.js';
import reviewRouter from '../routes/reviewRoutes.js';
import orderRouter from '../routes/orderRoutes.js';
import Stripe from 'stripe';
import Order from '../models/Order.js';
import CouponRouter from '../routes/couponRoutes.js';

dbConfig();

//app instance
let app = express();

//stripe webhook
const stripe = new Stripe(process.env.STRIPE_KEY);

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret =
  'whsec_4d4e8ff08396fa9b8487c15675bc7a36336d5e141e80a04aa2f28676e5884f0e';

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (request, response) => {
    const sig = request.headers['stripe-signature'];

    let event;

    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
      // console.log('event', event);
    } catch (err) {
      console.log('error', err.message);
      response.status(400).send(err.message);
      return;
    }

    // // Handle the event
    // switch (event.type) {
    //   case 'payment_intent.succeeded':
    //     const paymentIntentSucceeded = event.data.object;
    //     // Then define and call a function to handle the event payment_intent.succeeded
    //     break;
    //   // ... handle other event types
    //   default:
    //     console.log(`Unhandled event type ${event.type}`);
    // }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const currency = session.currency;
      const paymentMethod = session.payment_method_types[0];
      const paymentStatus = session.payment_status;
      const totalPrice = session.amount_total;
      const orderId = session.metadata.orderId;
      await Order.findByIdAndUpdate(
        JSON.parse(orderId),
        {
          currency,
          paymentMethod,
          paymentStatus,
          totalPrice: totalPrice / 100,
        },
        { new: true }
      );
    } else {
      return;
    }

    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

//middleware to process incoming json data
app.use(express.json());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/brands', brandRouter);
app.use('/api/v1/colors', colorRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);
app.use('/api/v1/coupons', CouponRouter);

//not found route
app.all('*', (req, res, next) => {
  const err = new Error(`path ${req.originalUrl} is not found`);
  err.status = 404;
  next(err);
});

app.use(globalErrorHandler);

export default app;
