const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String!
    email: String!
    password: String!
    expenses: [Expense]
  }

  type Expense {
    name: String!
    expense: Int!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]!
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addExpense(userId: ID!, name: String!, expense: Int!): User
    removeUser: User
    removeExpense(name: String!): User
    
  }
`;

module.exports = typeDefs;

// THIS COMMENT WAS ON LINE 34
// # I think we might have to change this to parse in both name and expense to match with expenses array of objects but we will see