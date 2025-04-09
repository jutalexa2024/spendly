const typeDefs = `
  # Define which fields are accessible from the Class model
  type User {
    _id: ID!
    user_id: Int
    username: String
    email: String
  }


  type Bill {
    _id: ID!
    username: String
    name: String
    category: String
    amount: Float
    dueDate: String
    user_id: ID
    }


   type Subscription {
    _id: ID!
    user_id: ID
    username: String!
    name: String!
    status: String!
    cycle: String!
    cost: Float!
    paymentStatus: String!
    dueDate: String!
  }

  input SubscriptionInput {
    name: String!
    status: String!
    cycle: String!
    cost: Float!
    paymentStatus: String!
    dueDate: String!
  }

  # Add to your Query type
  extend type Query {
    getUserSubscriptions(username: String!): [Subscription]
  }

  # Add to your Mutation type
  extend type Mutation {
    createSubscription(username: String!, subscription: SubscriptionInput!): Subscription
    updateSubscription(_id: ID!, subscription: SubscriptionInput!): Subscription
    deleteSubscription(_id: ID!): Boolean
    updateSubscriptionStatus(_id: ID!, status: String!): Subscription
    updateSubscriptionPaymentStatus(_id: ID!, paymentStatus: String!): Subscription
  }

input AddBillInput {
  username: String!
  category: String!
  name: String!
  amount: Float!
  dueDate: String!
}

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
  users: [User]
  bills: [Bill]
  subscriptions: [Subscription]
  userBills(username: String!): [Bill]
  user(id: ID!): User
  bill(id: ID!): Bill
  subscription(id: ID!): Subscription
  me: User
  }

  ## delete bills/subscriptions


  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBill(username: String!, category: String!, name: String!, amount: Float!, dueDate: String!): Bill
    addSubscription(username: String!, cost: Float!, renewalDate: String!): Subscription
  }
`;





export default typeDefs;
