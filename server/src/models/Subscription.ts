import { Schema, model, Document } from 'mongoose';

export interface ISubscription extends Document {
  username: string;
  cost: number;
  renewalDate: Date;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    username: { type: String, required: true },
    cost: { type: Number, required: true },
    renewalDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;