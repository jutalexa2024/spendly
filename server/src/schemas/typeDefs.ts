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
    username: String
    cost: Float
    renewalDate: String
  }


  type Query {
  users: [User]
  bills: [Bill]
  subscriptions: [Subscription]
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): User
    addBill(username: String!, category: String!, name: String!, amount: Float!, dueDate: String!): Bill
    addSubscription(username: String!, cost: Float!, renewalDate: String!): Subscription
  }
`;



export default typeDefs;
