const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    listings: [Listing]
  }

  type Listing {
    _id: ID
    listingText: String
    createdAt: String
    username: String
    bookingCount: Int
    bookings: [Booking]
  }

  type Booking {
    _id: ID
    bookingBody: String
    createdAt: String
    username: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]
    user(username: String!): User
    listings(username: String): [Listing]
    listing(_id: ID!): Listing
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addListing(listingText: String!): Listing
    addBooking(listingId: ID!, bookingBody: String!): Listing
  }
`;

module.exports = typeDefs;