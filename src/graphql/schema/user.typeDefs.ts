import { gql } from 'apollo-server-express';

export const userTypeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String!
        password: String!,
        phone: String!,
        address: [ID],
        profileImage: String,
        isEmailVerfified: Boolean
    }

    input UserInput {
        name: String!
        email: String!
        password: String!,
        phone: String!,
        address: [ID],
        profileImage: String,
        isEmailVerfified: Boolean
    }
    input UpdateUserInput {
        name: String
        email: String
        password: String,
        phone: String,
        address: [ID],
        profileImage: String,
        isEmailVerfified: Boolean
    }

    type Query {
        getAllUsers: [User!]
        getUserById(id: ID!): User!
    },

    type Mutation {
        createNewUser(userInput: UserInput!): User!
        updateUser(id: ID!, userInput: UserInput!): User!
        deleteUser(id: ID!): User!
    }
`;