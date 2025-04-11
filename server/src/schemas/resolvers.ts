
import { User, Bill, Subscription } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';

interface AddUserArgs {
  input: {
    username: string;
    email: string;
    password: string;
  }
}

interface User {
  username: string;
  email: string;
  password: string;
}

// interface UserArgs {
//   user_id: number;
// }

interface AddBillArgs {
  username: string;
  category: string;
  name: string;
  amount: number;
  dueDate: String;
}

interface AddSubscriptionArgs {
  username: string;
  cost: number;
  renewalDate: string;
}

// interface Context {
//   user?: User;
// }


interface SubscriptionInput {
  name: string;
  status: string;
  cycle: string;
  cost: number;
  paymentStatus: string;
  dueDate: string;
}

const resolvers = {
  Query: {
    users: async () => await User.find(),
    bills: async () => await Bill.find(),
    // user: async (_parent: unknown, { user_id }: UserArgs): Promise<User | null> => {
    //   return await User.findOne({ user_id: user_id });
    // },
    subscriptions: async () => await Subscription.find(),
    
    userBills: async (_parent: unknown, { username }: { username: string }) => {
      return await Bill.find({ username });
    },
    
    getUserSubscriptions: async (_parent: unknown, { username }: { username: string }) => {
      return await Subscription.find({ username });
    },
    
    bill: async (_parent: unknown, { id }: { id: string }) => {
      return await Bill.findById(id);
    },
    subscription: async (_parent: unknown, { id }: { id: string }) => {
      return await Subscription.findById(id);
    },
    // me: async (_parent: unknown, _args: unknown, context: Context): Promise<User | null> => {
    //   if (context.user) {
    //     return await User.findOne({ _id: context.user.user_id });
    //   }
    //   throw new AuthenticationError('Not Authenticated');
    // },
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

    deleteBill: async (_: unknown, { id }: { id: string }) => {
      return await Bill.findByIdAndDelete(id);
    },
    
    addSubscription: async (_: any, { username, cost, renewalDate }: AddSubscriptionArgs) => {
      const subscription = new Subscription({ username, cost, renewalDate });
      await subscription.save();
      return subscription;
    },

    login: async (_parent: unknown, { email, password }: { email: string; password: string }): Promise<{ token: string; user: User }> => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Invalid credentials, No Email Exists');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Invalid credentials, Incorrect Password');
      }

      const token = signToken(user.username, user.email, user._id);
      return { token, user };
    },
    
    // New subscription mutations
    createSubscription: async (_parent: unknown, { username, subscription }: { username: string, subscription: SubscriptionInput }) => {
      const newSubscription = new Subscription({
        ...subscription,
        username
      });
      await newSubscription.save();
      return newSubscription;
    },
    
    updateSubscription: async (_parent: unknown, { _id, subscription }: { _id: string, subscription: SubscriptionInput }) => {
      return await Subscription.findByIdAndUpdate(
        _id,
        { $set: subscription },
        { new: true }
      );
    },
    
    deleteSubscription: async (_parent: unknown, { _id }: { _id: string }) => {
      await Subscription.findByIdAndDelete(_id);
      return true;
    },
    
    updateSubscriptionStatus: async (_parent: unknown, { _id, status }: { _id: string; status: string }) => {
      return await Subscription.findByIdAndUpdate(
        _id,
        { $set: { status } },
        { new: true }
      );
    },
    
    updateSubscriptionPaymentStatus: async (_parent: unknown, { _id, paymentStatus }: { _id: string; paymentStatus: string }) => {
      return await Subscription.findByIdAndUpdate(
        _id,
        { $set: { paymentStatus } },
        { new: true }
      );
    }
  },
};

export default resolvers;