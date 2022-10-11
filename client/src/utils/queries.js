import { gql } from '@apollo/client';

// TODO: Add 'expenseId' field to query if we decide to use it in Expenses schema.
export const QUERY_ME = gql`
    query getMe {
        me {
            _id
            username
            email
            expenseCount
            expenses {
                name
                expense
            }
        }
    }

`;