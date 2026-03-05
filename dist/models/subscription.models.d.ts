import mongoose, { Document } from 'mongoose';
export interface ISubscription extends Document {
    name: string;
    price: number;
    currency: 'USD' | 'EUR' | 'INR';
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    category: 'sports' | 'news' | 'entertainment' | 'lifestyle' | 'technology' | 'finance' | 'politics' | 'other';
    paymentMethod: string;
    status: 'active' | 'cancelled' | 'expired';
    startDate: Date;
    renewalDate: Date;
    user: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
declare const Subscription: mongoose.Model<any, {}, {}, {}, any, any, any>;
export default Subscription;
