
const typeDefs = `
  # Define which fields are accessible from the User model
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

  input AddSubscriptionInput {
    username: String!
    cost: Float!
    renewalDate: String!
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
    getUserSubscriptions(username: String!): [Subscription]
    user(id: ID!): User
    bill(id: ID!): Bill
    subscription(id: ID!): Subscription
    me: User
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    addBill(username: String!, category: String!, name: String!, amount: Float!, dueDate: String!): Bill
    addSubscription(username: String!, cost: Float!, renewalDate: String!): Subscription
    
    # New subscription mutations
    createSubscription(username: String!, subscription: SubscriptionInput!): Subscription
    updateSubscription(_id: ID!, subscription: SubscriptionInput!): Subscription
    deleteSubscription(_id: ID!): Boolean
    updateSubscriptionStatus(_id: ID!, status: String!): Subscription
    updateSubscriptionPaymentStatus(_id: ID!, paymentStatus: String!): Subscription
  }
`;

export default typeDefs;