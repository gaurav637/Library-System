import { gql } from 'apollo-server-express';

export const bookTypeDefs = gql`
    type Book {
        _id: ID!
        title: String!
        author: [ID!]
        description: String!
        category: String!
        price: Float!
        publishYear: Int!
        publisher: String!
        language: String!
        pages: Int!
        stock: Boolean!
        ratingAvg: Float!
        ratingCount: Int!
        reviews: ID
        createdAt: String
        updatedAt: String
    }

    input BookInput {
        title: String!
        author: [ID!]
        description: String!
        category: String!
        price: Float!
        publishYear: Int!
        publisher: String!
        language: String!
        pages: Int!
        stock: Boolean!
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
        stock: Boolean
    }

    type PaginateBook {
        data: [Book]
    }

    input BookFilterInput {
        title: String
        description: String
        price: String
        author: String
        category: String
    }

    type Query {
        getAllBooks: [Book!]
        getBookById(id: ID!): Book
        getBooksByFilter(filter: BookFilterInput, page: Int!, limit: Int!): PaginateBook!
        searchBooksBySearchKey(searchKey: String!, page: Int!, limit: Int!): PaginateBook!
    }

    type Mutation {
        addNewBook(bookInput: BookInput): Book!
        updateBookById(id: ID!, input: UpdateBookInput!): Book!
        deleteBookById(id: ID!): Book!
    }
`;