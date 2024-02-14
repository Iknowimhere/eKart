import express from 'express';
import { isLogged } from '../middlewares/isLogged.js';
import { createOrder } from '../controllers/orderControllers.js';


//router instance
const orderRouter = express.Router();

orderRouter.post('/', isLogged, createOrder);
// orderRouter.get('/', getorders);
// orderRouter.get('/:id', getorder);
// orderRouter.put('/:id', isLogged, updateorder);
// orderRouter.delete('/:id', isLogged, deleteorder);

export default orderRouter;
