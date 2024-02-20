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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//coupon expiry date
couponSchema.virtual('isExpired').get(function () {
  return this.endDate < Date.now();
});

//days left for coupon expiry
couponSchema.virtual('daysLeft').get(function () {
  const daysLeft = this.endDate - Date.now();
  return Math.ceil(daysLeft / (1000 * 60 * 60 * 24));
});

//verifying start date is greater than today
couponSchema.pre('validate', function (next) {
  if (this.startDate < Date.now()) {
    throw new Error('Start date should be greater than today');
  }
  next();
});

//verifying end date is greater than today
couponSchema.pre('validate', function (next) {
  if (this.endDate < Date.now()) {
    throw new Error('End date should be greater than today');
  }
  next();
});

//verifying whether start date is lesser than end date
couponSchema.pre('validate', function (next) {
  if (this.startDate > this.endDate) {
    throw new Error('Start date should be lesser than End date');
  }
  next();
});

const Coupon = model('Coupon', couponSchema);

export default Coupon;
