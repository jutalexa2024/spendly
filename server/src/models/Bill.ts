import { Schema, model, Document } from 'mongoose';

export interface IBill extends Document {
    bill_id: number;
    username: string;
    name: string;
    category: string;
    amount: number;
    dueDate: String;
  }
  
const billSchema = new Schema<IBill>(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,

    },
    category: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    dueDate: {
        type: String,
        required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Bill = model<IBill>('Bills', billSchema);

export default Bill;