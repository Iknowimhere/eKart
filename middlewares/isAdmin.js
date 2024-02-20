import expressAsyncHandler from 'express-async-handler';
import User from '../models/User.js';

const isAdmin = expressAsyncHandler(async (req, res, next) => {
  const user = await User.findById(req.userId);
  if (user.isAdmin) {
    next();
  } else {
    next(new Error('Not authorized'));
  }
});

export default isAdmin;
