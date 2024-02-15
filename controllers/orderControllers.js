import Order from '../models/Order.js';
import Stripe from 'stripe';
import expressAsyncHandler from 'express-async-handler';
import Product from '../models/Product.js';
import User from '../models/User.js';

//@desc     Create Order
//@path     /api/v1/orders
//@access   Private/User

export const createOrder = expressAsyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;
  //find the product in order item exists
  const products = await Product.find({ _id: { $in: orderItems } });
  if (products.length < 0) {
    throw new Error('There are no products in cart');
  }
  let user = await User.findById(req.userId);
  if (!user.hasShippingAddress) {
    throw new Error('Update shipping address please');
  }
  const newOrder = await Order.create({
    user: req.userId,
    orderItems,
    shippingAddress: {
      name: 'umashankar',
      place: 'hoskote',
      pin: 562122,
    }
  });

  //updating product attributes after order
  orderItems.map(async (order) => {
    const product = products.find((product) => {
      return product._id.toString() === order._id.toString();
    });
    product.totalSold += order.qty;
    product.totalQty -= order.qty;
    await product.save();
  });

  //push order into the user's orders
  user.orders.push(newOrder._id);
  //re save
  await user.save();

  const stripe = new Stripe(process.env.STRIPE_KEY);

  let convertedOrders = orderItems.map((item) => {
    return {
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.name,
          description: item.description,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    line_items: convertedOrders,
    metadata: {
      orderID:JSON.stringify(newOrder._id)
    },
    mode: 'payment',
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
  });

  res.send({ url: session.url });
  // res.status(201).json({
  //   status: 'success',
  //   message: 'order successfully done',
  //   newOrder,
  // });
});
