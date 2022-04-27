import { gql } from '@apollo/client';

export const QUERY_LISTINGS = gql`
  query listings($username: String) {
    listings(username: $username) {
      _id
      listingText
      createdAt
      username
      bookingCount
      bookings {
        _id
        createdAt
        username
        bookingBody
      }
    }
  }
`;

export const QUERY_LISTING = gql`
  query listing($id: ID!) {
    listing(_id: $id) {
      _id
      listingText
      createdAt
      username
      bookingCount
      bookings {
        _id
        createdAt
        username
        bookingBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      listings {
        _id
        listingText
        createdAt
        bookingCount
      }
    }
  }
`;

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      listings {
        _id
        listingText
        createdAt
        bookingCount
        bookings {
          _id
          createdAt
          bookingBody
          username
        }
      }
    }
  }
`;

export const QUERY_ME_BASIC = gql`
  {
    me {
      _id
      username
      email
    }
  }
`;
