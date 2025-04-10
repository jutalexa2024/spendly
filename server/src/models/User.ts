import mongoose, { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import * as MongooseSequence from 'mongoose-sequence';

// Access the default export explicitly.
const AutoIncrement = (MongooseSequence as any).default
  ? (MongooseSequence as any).default(mongoose)
  : (MongooseSequence as any)(mongoose);

export interface IUser extends Document {
  user_id: number;
  username: string;
  email: string;
  password: string;
  isCorrectPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    user_id: { type: Number, unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

UserSchema.methods.isCorrectPassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

UserSchema.pre<IUser>('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

const User = model<IUser>('User', UserSchema);
export default User;

