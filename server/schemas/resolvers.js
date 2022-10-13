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
    addExpense: async (parent, { userId, expense }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { expenses: expense },
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
    updateExpense: async (parent, { id, expense, newExpense }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          {
            _id: id,
            "expenses.name": expense.name,
            "expenses.cost": expense.cost
          },
          {
            $set: {
              "expenses.$.name" : newExpense.name,
              "expenses.$.cost" : newExpense.cost,
            }
          },
          {new: true});
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    addIncome: async (parent, { userId, income }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: userId },
          {
            $addToSet: { incomes: income },
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
    updateIncome: async (parent, { id, income, newIncome }, context) => {
      if (context.user) {
        return await User.findOneAndUpdate(
          {
            _id: id,
            "incomes.name": income.name,
            "incomes.amount": income.amount
          },
          {
            $set: {
              "incomes.$.name" : newIncome.name,
              "incomes.$.amount" : newIncome.amount,
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
    removeExpense: async (parent, { expense }, context) => { // Works
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { expenses: expense } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
    removeIncome: async (parent, { income }, context) => {
      if (context.user) {
        return User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { incomes: income } },
          { new: true }
        );
      }
      throw new AuthenticationError('You need to be logged in!');
    },
  },
};

module.exports = resolvers;
