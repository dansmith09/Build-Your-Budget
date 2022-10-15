import { gql } from '@apollo/client';

// Takes:
// {
//     username: String,
//     email: String,
//     password: String
// }

// TODO: This returns a 'must have privatekey or secret' error although it does add a new user
export const ADD_USER = gql `
    mutation Mutation($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                incomes {
                    _id
                    name
                    amount
                }
                expenses {
                    _id
                    name
                    cost
                }
                totalIncomes
                totalExpenses
            }
        }
    }
`;

// Takes:
// {
//     email: String,
//     password: String
// }
export const LOGIN_USER = gql `
    mutation Mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
                email
                incomes {
                    _id
                    name
                    amount
                }
                expenses {
                    _id
                    name
                    cost
                }
                totalIncomes
                totalExpenses
            }
        }
    }

`;

// Takes: 
// {
//     userId: ID,
//     incomeData: {
//       name: String,
//       amount: Int
//     }
// }
export const ADD_INCOME = gql `
    mutation AddIncome($userId: ID!, $incomeData: IncomeInput) {
        addIncome(userId: $userId, incomeData: $incomeData) {
            _id
            username
            email
            totalIncomes
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalExpenses
        }
    }
`;

// Takes: 
// {
//     userId: ID,
//     expenseData: {
//       name: String,
//       cost: Int
//     }
// }
export const ADD_EXPENSE = gql `
    mutation AddExpense($userId: ID!, $expenseData: ExpenseInput!) {
        addExpense(userId: $userId, expenseData: $expenseData) {
            _id 
            username
            email
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalIncomes
            totalExpenses
        }
    }
`;

// Takes: 
// {
//     userId: ID,
//     incomeId: ID,
//     newIncomeData: {
//       name: String,
//       amount: Int
//     }
// }
export const UPDATE_INCOME = gql `
    mutation UpdateIncome($userId: ID!, $incomeId: ID!, $newIncomeData: IncomeInput) {
        updateIncome(userId: $userId, incomeId: $incomeId, newIncomeData: $newIncomeData) {
            _id
            username
            email
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalIncomes
            totalExpenses
        }
    }
`;

// Takes:
// {
//     userId: ID,
//     expenseId: ID,
//     newExpenseData: {
//       name: String,
//       cost: int
//     }
// } 
export const UPDATE_EXPENSE = gql `
    mutation UpdateExpense($userId: ID!, $expenseId: ID!, $newExpenseData: ExpenseInput) {
        updateExpense(userId: $userId, expenseId: $expenseId, newExpenseData: $newExpenseData) {
            _id 
            username
            email
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalIncomes
            totalExpenses
        }
    }
`;

// Takes: 
// { incomeId: ID }
export const REMOVE_INCOME = gql `
    mutation Mutation($incomeId: ID) {
        removeIncome(incomeId: $incomeId) {
            _id
            username
            email
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalIncomes
            totalExpenses
        }
    }
`;

// Takes: 
// { expenseId: ID }
export const REMOVE_EXPENSE = gql `
    mutation RemoveExpense($expenseId: ID) {
        removeExpense(expenseId: $expenseId) {
            _id
            username
            email
            incomes {
                _id
                name
                amount
            }
            expenses {
                _id
                name
                cost
            }
            totalIncomes
            totalExpenses
        }
    }
`;