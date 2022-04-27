import React from 'react';
import { Link } from 'react-router-dom';

const BookingList = ({ bookings }) => {
  return (
    <div className="card mb-3">
      <div className="card-header">
        <span className="text-light">Bookings</span>
      </div>
      <div className="card-body">
        {bookings &&
          bookings.map(booking => (
            <p className="pill mb-3" key={booking._id}>
              {booking.bookingBody} || {' '}
              <Link to={`/profile/${booking.username}`} style={{ fontWeight: 700 }}>
                {booking.username} on {booking.createdAt}
              </Link>
            </p>
          ))}
      </div>
    </div>
  );
};

export default BookingList;
