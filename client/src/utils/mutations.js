import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
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

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_LISTING = gql`
  mutation addListing($listingText: String!) {
    addListing(listingText: $listingText) {
      _id
      listingText
      createdAt
      username
      bookingCount
      bookings {
        _id
      }
    }
  }
`;

export const ADD_BOOKING = gql`
  mutation addBooking($listingId: ID!, $bookingBody: String!) {
    addBooking(bookingId: $bookingId, bookingBody: $bookingBody) {
      _id
      bookingCount
      bookings {
        _id
        bookingBody
        createdAt
        username
      }
    }
  }
`;
