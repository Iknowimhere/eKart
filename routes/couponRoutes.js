import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponControllers.js';

//router instance
const CouponRouter=express.Router()


CouponRouter.post("/",isLogged,createCoupon)
CouponRouter.get("/",getCoupons)
CouponRouter.get("/:id",getCoupon)
CouponRouter.put("/:id",isLogged,updateCoupon)
CouponRouter.delete("/:id",isLogged,deleteCoupon)


export default CouponRouter;