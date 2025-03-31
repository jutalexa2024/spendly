import { Schema, model, Document } from 'mongoose';


export interface ISubscription extends Document {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

const subscriptionSchema = new Schema<ISubscription>({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, 

{ timestamps: true });

const Subscription = model<ISubscription>('Subscription', subscriptionSchema);

export default Subscription;