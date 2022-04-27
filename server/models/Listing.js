const { Schema, model } = require('mongoose');
const bookingSchema = require('./Booking');
const dateFormat = require('../utils/dateFormat');

const listingSchema = new Schema(
  {
    listingText: {
      type: String,
      required: 'Create your listing!',
      minlength: 1,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: true
    },
    bookings: [bookingSchema]
  },
  {
    toJSON: {
      getters: true
    }
  }
);

listingSchema.virtual('bookingCount').get(function() {
  return this.bookings.length;
});

const Listing = model('Listing', listingSchema);

module.exports = Listing;
