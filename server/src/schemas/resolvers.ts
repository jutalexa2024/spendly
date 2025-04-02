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
    
    userBills: async (_parent: unknown, { username }: { username: string }) => {
      return await Bill.find({ username });
    },
    bill: async (_parent: unknown, { id }: { id: string }) => {
      return await Bill.findById(id);
    },
    subscription: async (_parent: unknown, { id }: { id: string }) => {
      return await Subscription.findById(id);
    },
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
