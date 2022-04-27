import React from 'react';
import { useParams } from 'react-router-dom';

import BookingList from '../components/BookingList';
import BookingForm from '../components/BookingForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_LISTING } from '../utils/queries';

const SingleListing = (props) => {
  const { id: listingId } = useParams();

  const { loading, data } = useQuery(QUERY_LISTING, {
    variables: { id: listingId },
  });

  const listing = data?.listing || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {listing.username}
          </span>{' '}
          Listing on {listing.createdAt}
        </p>
        <div className="card-body">
          <p>{listing.listingText}</p>
        </div>
      </div>

      {listing.bookingCount > 0 && (
        <BookingList bookings={listing.bookings} />
      )}

      {Auth.loggedIn() && <BookingForm listingId={listing._id} />}
    </div>
  );
};

export default SingleListing;