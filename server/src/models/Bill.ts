import { Schema, model, Document } from 'mongoose';
import User from './User';

export interface IBills extends Document {
    bill_id: number;
    username: string;
    name: string;
    category: string;
    amount: number;
    duedate: Date;
    user_id: Schema.Types.ObjectId;
  }
  
const billSchema = new Schema<IBills>(
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
    duedate: {
        type: Date,
        required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }

    
    // classes: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Class',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const Bills = model<IBills>('Bills', billSchema);

export default Bills;