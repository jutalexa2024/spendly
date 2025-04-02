import { User, Bill, Subscription } from '../models/index';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
  input:{
    username: string;
    email: string;
    password: string;
  }
}

interface User {
  user_id: number;
  username: string;
  email: string;
  password: string;
}


interface UserArgs {
  _id: number;
}

interface AddBillArgs {
  username: string;
  category: string;
  name: string;
  amount: number;
  dueDate: string;
}

interface AddSubscriptionArgs {
  username: string;
  cost: number;
  renewalDate: string;
}

interface Context {
  user?: User; 
}

const resolvers = {
  Query: {
    users: async () => await User.find(),
    bills: async () => await Bill.find(),
    user: async (_parent: unknown, { _id }: UserArgs): Promise<User | null> => {
      // Retrieve a profile by its ID
      return await User.findOne({ user_id: _id });
    },
    subscriptions: async () => await Subscription.find(),

    me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
      if (context.user) {
        // If user is authenticated, return their profile
        return await User.findOne({ _id: context.user.user_id });
      }
      // If not authenticated, throw an authentication error
      throw new AuthenticationError('Not Authenticated');
    },
  },
  Mutation: {
    addUser: async (_parent: any, { input }: AddUserArgs) => {
      const user = await User.create({ ...input });
    
      const token = signToken(user.username, user.email, user._id);
    
      return { token, user };
    },
    addBill: async (_: any, { username, category, name, amount, dueDate }: AddBillArgs) => {
      const bill = new Bill({ username, category, name, amount, dueDate });
      await bill.save();
      return bill;
    },
    addSubscription: async (_: any, { username, cost, renewalDate }: AddSubscriptionArgs) => {
      const subscription = new Subscription({ username, cost, renewalDate });
      await subscription.save();
      return subscription;
    },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<{ token: string; user: User }> => {
      // Find a profile by email
      const user = await User.findOne({ email });

      if (!user) {
        // If profile with provided email doesn't exist, throw an authentication error
        throw AuthenticationError;
      }

      // Check if the provided password is correct
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        // If password is incorrect, throw an authentication error
        throw new AuthenticationError('Not Authenticated');
      }

      // Sign a JWT token for the authenticated profile
      const token = signToken(user.username, user.email, user.user_id);
      return { token, user };
    },
  },
};

export default resolvers;

