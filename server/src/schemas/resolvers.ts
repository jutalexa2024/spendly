import { User, Bill, Subscription } from '../models/index';

interface AddUserArgs {
  username: string;
  email: string;
  password: string;
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

const resolvers = {
  Query: {
    users: async () => await User.find(),
    bills: async () => await Bill.find(),
    subscriptions: async () => await Subscription.find(),
  },
  Mutation: {
    addUser: async (_: any, { username, email, password }: AddUserArgs) => {
      const user = new User({ username, email, password });
      await user.save();
      return user;
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
  },
};

export default resolvers;

