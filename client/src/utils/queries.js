import { gql } from '@apollo/client';

// TODO: Add 'expenseId' field to query if we decide to use it in Expenses schema.
export const QUERY_ME = gql`
    query Query {
        me {
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

// takes:
// { userId: ID }
export const GET_SINGLE_USER =gql`
    query User($userId: ID!) {
        user(userId: $userId) {
            _id
            email
            password
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
`