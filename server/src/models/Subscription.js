import { Schema, model } from 'mongoose';
const subscriptionSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
}, { timestamps: true });
const Subscription = model('Subscription', subscriptionSchema);
export default Subscription;
