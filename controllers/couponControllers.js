import Coupon from '../models/Coupon.js';
import expressAsyncHandler from 'express-async-handler';

//@desc     Create Coupon
//@path     /api/v1/coupons
//@access   Private/Admin
export const createCoupon = expressAsyncHandler(async (req, res) => {
  const { code, startDate, endDate, discount } = req.body;
  const existingCoupon = await Coupon.findOne({ code: code });
  if (existingCoupon) {
    throw new Error('Coupon exists already');
  }
  const newCoupon = await Coupon.create({
    code,
    startDate,
    endDate,
    discount,
    user: req.userId,
  });
  res.status(201).json({
    status: 'success',
    message: 'Coupon created',
    newCoupon,
  });
});

//@desc     Get Coupons
//@path     /api/v1/coupons
//@access   Private/Admin
export const getCoupons = expressAsyncHandler(async (req, res) => {
  const coupons = await Coupon.find();
  res.status(201).json({
    status: 'success',
    message: 'Coupons fetched successfully',
    coupons,
  });
});

//@desc     Get Coupon
//@path     /api/v1/coupons/:id
//@access   Public

export const getCoupon = expressAsyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Coupon fetched successfully',
    coupon,
  });
});

//@desc     Update Coupon
//@path     /api/v1/coupons/:id
//@access   Private/Admin

export const updateCoupon = expressAsyncHandler(async (req, res) => {
  const updatedCoupon = await Coupon.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json({
    status: 'success',
    message: 'Coupon updated successfully',
    updatedCoupon,
  });
});

//@desc     Delete Coupon
//@path     /api/v1/coupons/:id
//@access   Private/Admin

export const deleteCoupon = expressAsyncHandler(async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.status(200).json({
    status: 'success',
    message: 'Coupon deleted successfully',
  });
});
