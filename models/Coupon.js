import { Schema, model } from 'mongoose';

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      validation:{
        validate:function(){
          console.log(this.startDate > Date.now());
          return this.startDate > Date.now()
        },
        message:"Start date should be greater than today"
      }
    },
    endDate: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON:{virtuals:true}
  }
);



const Coupon=model('Coupon',couponSchema)

export default Coupon;