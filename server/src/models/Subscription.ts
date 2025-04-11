import { Schema, model, Document } from 'mongoose';

export interface ISubscription extends Document {
  username: string;
  name: string;
  status: string;
  cycle: string;
  cost: number;
  paymentStatus: string;
  dueDate: string;
}

const subscriptionSchema = new Schema<ISubscription>(
  {
    username: { 
      type: String, 
      required: true 
    },
    name: { 
      type: String, 
      required: true 
    },
    status: { 
      type: String, 
      required: true,
      enum: ['Active', 'Inactive']
    },
    cycle: { 
      type: String, 
      required: true,
      enum: ['Monthly', 'Annually']
    },
    cost: { 
      type: Number, 
      required: true 
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ['Paid', 'Unpaid']
    },
    dueDate: {
      type: String,
      required: true
    }
  }, 
  { timestamps: true }
);

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;