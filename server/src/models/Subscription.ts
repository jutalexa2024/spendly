import { Schema, model, Document } from 'mongoose';

export interface ISubscription extends Document {
  user_id: Schema.Types.ObjectId;
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
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
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