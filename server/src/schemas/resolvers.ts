import { User, Bill, Subscription } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

const resolvers = {
  Query: {
    users: async () => await User.find(),
    bills: async () => await Bill.find(),
    subscriptions: async () => await Subscription.find(),
    userBills: async (_: any, { username }: { username: string }) => await Bill.find({ username }),
    user: async (_: any, { id }: { id: string }) => await User.findById(id),
    bill: async (_: any, { id }: { id: string }) => await Bill.findById(id),
    subscription: async (_: any, { id }: { id: string }) => await Subscription.findById(id),
    me: async (_: any, __: any, { user }: { user: any }) => {
      if (!user) throw new AuthenticationError('Not authenticated');
      return await User.findById(user._id);
    },
  },

  Mutation: {
    addUser: async (_: any, { input }: { input: any }) => {
      const user = await User.create(input);
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    login: async (_: any, { email, password }: { email: string, password: string }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }
      
      const correctPw = await user.isCorrectPassword(password);
      
      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials');
      }
      
      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    addBill: async (_: any, { username, category, name, amount, dueDate }: { username: string, category: string, name: string, amount: number, dueDate: Date }) => {
      const bill = await Bill.create({ username, category, name, amount, dueDate });
      return bill;
    },
    
    addSubscription: async (_: any, { username, cost, renewalDate }: { username: string, cost: number, renewalDate: Date }) => {
      const subscription = await Subscription.create({ username, cost, renewalDate });
      return subscription;
    }
  }
};

export default resolvers;