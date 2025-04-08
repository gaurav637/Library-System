import { gql } from 'apollo-server-express';

export const authorTypeDefs = gql`
    scalar Date

    type Author {
        _id: ID!
        name: String!
        bio: String!
        dob: Date
        nationality: String
        awards: String
        website: String
        profileImage: String
        Address: [ID]
        createdAt: String
        updatedAt: String
    }

    input AuthorInput {
        name: String!
        bio: String!
        dob: Date!
        nationality: String!
        awards: String
        website: String
        profileImage: String
        Address: [ID]!
    }
    input updateAuthor {
        name: String!
        bio: String!
        dob: Date
        nationality: String
        awards: String
        website: String
        profileImage: String
        Address: [ID]
    }

    type Query {
        getAllAuthor: [Author!]
        getAuthorById(id: ID!): Author
        searchAuthor(searchKey: String, page: Int!, limit: Int!): [Author!]
    }

    type Mutation {
        addNewAuthor(authorInput: AuthorInput!): Author
        updateAuthor(id: ID!, authorInput: AuthorInput): Author!
        deleteAuthor(id: ID!): Author!
    }
`;