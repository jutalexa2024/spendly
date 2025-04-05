import { User, Bill, Subscription } from '../models/index';
import { signToken, AuthenticationError } from '../utils/auth';
const resolvers = {
    Query: {
        users: async () => await User.find(),
        bills: async () => await Bill.find(),
        user: async (_parent, { _id }) => {
            // Retrieve a profile by its ID
            return await User.findOne({ user_id: _id });
        },
        subscriptions: async () => await Subscription.find(),
        userBills: async (_parent, { username }) => {
            return await Bill.find({ username });
        },
        bill: async (_parent, { id }) => {
            return await Bill.findById(id);
        },
        subscription: async (_parent, { id }) => {
            return await Subscription.findById(id);
        },
        me: async (_parent, _args, context) => {
            if (context.user) {
                // If user is authenticated, return their profile
                return await User.findOne({ _id: context.user.user_id });
            }
            // If not authenticated, throw an authentication error
            throw new AuthenticationError('Not Authenticated');
        },
    },
    Mutation: {
        addUser: async (_parent, { input }) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addBill: async (_, { username, category, name, amount, dueDate }) => {
            const bill = new Bill({ username, category, name, amount, dueDate });
            await bill.save();
            return bill;
        },
        addSubscription: async (_, { username, cost, renewalDate }) => {
            const subscription = new Subscription({ username, cost, renewalDate });
            await subscription.save();
            return subscription;
        },
        login: async (_parent, { email, password }) => {
            // Find a profile by email
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Invalid credentials, No Email Exists');
            }
            // Check if the provided password is correct
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError('Invalid credentials, Incorrect Password');
            }
            // Sign a JWT token for the authenticated profile
            const token = signToken(user.username, user.email, user.user_id);
            return { token, user };
        },
    },
};
export default resolvers;
