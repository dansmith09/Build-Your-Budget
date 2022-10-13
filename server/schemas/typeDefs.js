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
    _id: ID
    name: String!
    cost: Int!
  }

  type Income {
    _id: ID
    name: String!
    cost: Int!
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
    addExpense(userId: ID!, expense: Expense): User
    addIncome(userId: ID!, income: Income): User
    updateExpense(userId: ID!, expense: Expense, newExpense: Expense): User
    updateIncome(incomeId: ID!, income: Income, newIncome: Income): User
    removeUser: User
    removeExpense(expenseId: ID): User
    removeIncome(incomeId: ID): User
  }
`;

module.exports = typeDefs;

// THIS COMMENT WAS ON LINE 34
// # I think we might have to change this to parse in both name and expense to match with expenses array of objects but we will see