const { AuthenticationError } = require('apollo-server-express');
const { User, expenseSchema,  } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('No user with this email found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },
    addExpense: async (parent, { userId, expenseData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { expenses: expenseData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateExpense: async (parent, { userId, expenseId, newExpenseData }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          {
            _id: userId,
            "expenses._id": expenseId
          },
          {
            $set: {
              "expenses.$.name" : newExpenseData.name,
              "expenses.$.cost" : newExpenseData.cost,
            }
          },
          {new: true});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addIncome: async (parent, { userId, incomeData }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { incomes: incomeData },
          },
          {
            new: true,
            runValidators: true,
          }
        );
        return updatedUser
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    updateIncome: async (parent, { userId, incomeId, newIncomeData }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          {
            _id: userId,
            "incomes._id": incomeId
          },
          {
            $set: {
              "incomes.$.name" : newIncomeData.name,
              "incomes.$.amount" : newIncomeData.amount,
            }
          },
          {new: true});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeUser: async (parent, args, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id: context.user._id });
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeExpense: async (parent, { expenseId }, context) => { // Works
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { expenses: { _id: expenseId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeIncome: async (parent, { incomeId }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { incomes: { _id: incomeId } } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
