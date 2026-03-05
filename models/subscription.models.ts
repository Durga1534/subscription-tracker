import mongoose, { Document, Schema } from 'mongoose';

export interface ISubscription extends Document {
  name: string;
  price: number;
  currency: 'USD' | 'EUR' | 'INR';
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  category:
  | 'sports'
  | 'news'
  | 'entertainment'
  | 'lifestyle'
  | 'technology'
  | 'finance'
  | 'politics'
  | 'other';
  paymentMethod: string;
  status: 'active' | 'cancelled' | 'expired';
  startDate: Date;
  renewalDate: Date;
  user: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    name: {
      type: String,
      required: [true, 'Subscription name is required'],
      trim: true,
      minLength: 2,
      maxLength: 100,
    },
    price: {
      type: Number,
      required: [true, 'Subscription price is required'],
      min: [0, 'Price must be greater than 0'],
    },
    currency: {
      type: String,
      enum: ['USD', 'EUR', 'INR'],
      default: 'INR',
    },
    frequency: {
      type: String,
      enum: ['daily', 'weekly', 'monthly', 'yearly'],
      required: [true, 'Subscription frequency is required'],
    },
    category: {
      type: String,
      enum: [
        'sports',
        'news',
        'entertainment',
        'lifestyle',
        'technology',
        'finance',
        'politics',
        'other',
      ],
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['active', 'cancelled', 'expired'],
      default: 'active',
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: (value: Date) => value <= new Date(),
        message: 'Start date must be in the past',
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (this: any, value: Date) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after the start date',
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  { timestamps: true },
);

// Auto-calculate renewal date if missing.
subscriptionSchema.pre('save', async function () {
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency as keyof typeof renewalPeriods]);
  }

  // Auto-update the status if renewal date has passed
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }
});

const Subscription =
  mongoose.models.Subscription || mongoose.model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;
