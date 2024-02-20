import express from 'express';
import { isLogged } from '../middlewares/isLogged.js';
import {
  createCategory,
  deletecategory,
  getCategories,
  getCategory,
  updatecategory,
} from '../controllers/categoryControllers.js';
import categoryUpload from '../config/categoryUpload.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const categoryRouter = express.Router();

categoryRouter.post(
  '/',
  isLogged,
  isAdmin,
  categoryUpload.single('image'),
  createCategory
);
categoryRouter.get('/', getCategories);
categoryRouter.get('/:id', getCategory);
categoryRouter.put('/:id', isLogged, isAdmin,updatecategory);
categoryRouter.delete('/:id', isLogged, isAdmin,deletecategory);

export default categoryRouter;
