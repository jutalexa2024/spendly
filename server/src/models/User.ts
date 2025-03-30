import { Schema, model, Document } from 'mongoose';


export interface IUser extends Document {
  user_id: number;
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>({
  user_id: { type: Number, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
}, 

{ timestamps: true });

const User = model<IUser>('User', UserSchema);

export default User;
