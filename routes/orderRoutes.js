import express from 'express';
import { isLogged } from '../middlewares/isLogged.js';
import {
  createOrder,
  getOrder,
  getOrders,
  updateOrder,
} from '../controllers/orderControllers.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const orderRouter = express.Router();

orderRouter.post('/', isLogged, createOrder);
orderRouter.get('/', getOrders);
orderRouter.get('/:id', getOrder);
orderRouter.put('/:id', isLogged, isAdmin,updateOrder);

export default orderRouter;
