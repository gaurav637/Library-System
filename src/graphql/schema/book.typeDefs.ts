import { gql } from 'apollo-server-express';

export const bookTypeDefs = gql`

    type Book {
        _id: ID!
        title: String!
        author: ID
        description: String!
        category: String!
        price: Float!
        publishYear: Int!
        publisher: String!
        language: String!
        pages: Int!
        stock: Int!
        ratingAvg: Float!
        ratingCount: Int!
        createdAt: String
        updatedAt: String
    }

    input BookInput {
        title: String!
        author: ID!
        description: String!
        category: String!
        price: Float!
        publishYear: Int!
        publisher: String!
        language: String!
        pages: Int!
        stock: Int!
    }

    input UpdateBookInput {
        title: String
        author: ID
        description: String
        category: String
        price: Float
        publishYear: Int
        publisher: String
        language: String
        pages: Int
        stock: Int
    }

    type Query {
        getAllBooks: [Book!]
        getBookById(id: ID!): Book
    }

    type Mutation {
        addNewBook(bookInput: BookInput): Book!
        updateBook(id: ID!, input: UpdateBookInput!): Book
        deleteBook(id: ID!): String
    }
`;