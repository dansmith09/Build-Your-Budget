import { gql } from '@apollo/client';

export const LOGIN_USER = gql `
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }

`;


export const ADD_USER = gql `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;
    // TODO: Check line 34 - expenses or expense?
    //       Are we using saveExpenseInput in typeDefs?
export const ADD_EXPENSE = gql `
mutation addExpense($userId: ID!, $expenseData: ExpenseInput!) {
    addExpense(userId: $userId, expenseData: $expenseData) {
        _id
        name
        cost 
    }
}

`;
    // TODO: Check line464 - expenses or expense?
export const REMOVE_EXPENSE = gql `
    mutation removeExpense($expense: String!) {
        removeExpense(expense: $expense) {
            _id
            name
            expense
        }
    }
`;
// Mutation to use if we decide to remove an expense via 'expenseId'.
    // If so, need to add 'expenseId' field in Expenses schema.
// export const REMOVE_EXPENSE = gql`
//     mutation removeExpense($expenseId: String!) {
//         removeExpense(expenseId: $expenseId) {
//             username
//             email
//             password
//             expenses {
//                 name
//                 expense
//             }
//         }
//     }
// `