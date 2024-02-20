import express from 'express'
import { isLogged } from '../middlewares/isLogged.js';
import { createCoupon, deleteCoupon, getCoupon, getCoupons, updateCoupon } from '../controllers/couponControllers.js';
import isAdmin from '../middlewares/isAdmin.js';

//router instance
const CouponRouter=express.Router()


CouponRouter.post("/",isLogged,isAdmin,createCoupon)
CouponRouter.get("/",getCoupons)
CouponRouter.get("/:id",getCoupon)
CouponRouter.put("/:id",isLogged,isAdmin,updateCoupon)
CouponRouter.delete("/:id",isLogged,isAdmin,deleteCoupon)


export default CouponRouter;