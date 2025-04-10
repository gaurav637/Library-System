import { gql } from 'apollo-server-express';

export const borrowRecordTypeDefs = gql`
    scalar Date
    type BorrowRecord {
        _id: ID!
        userId: ID!
        bookId: ID!
        borrowDate: Date!
        returnDate: Date!
        fine: Int
    }

    type BorrowReturnRecord {
        _id: ID
        userId: ID
        bookId: ID
        borrowDate: Date
        returnDate: Date
        fine: Int
    }

    input BorrowBookInput {
        userId: ID!
        bookId: ID!
        borrowDate: Date!
        returnDate: Date!
        fine: Int
    }

    type Query {
        getAllBorrowedBooks: [BorrowRecord!]
        getBorrowedBooksByUserId(id: ID!): [BorrowRecord!]
    }
    
    type Mutation {
        markBookAsBorrowByUser(borrowBookInput: BorrowBookInput): BorrowRecord!
        returnABorrowedBookByUser(userId: ID! , bookId: ID!): BorrowRecord!
    }
    
`;