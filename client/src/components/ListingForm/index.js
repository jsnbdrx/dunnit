import React, { useState } from 'react';

import { useMutation } from '@apollo/client';
import { ADD_LISTING } from '../../utils/mutations';
import { QUERY_LISTINGS, QUERY_ME } from '../../utils/queries';

const ListingForm = () => {
  const [listingText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addListing, { error }] = useMutation(ADD_LISTING, {
    update(cache, { data: { addListing } }) {
      try {
        // update listing array's cache
        // could potentially not exist yet, so wrap in a try/catch
        const { listings } = cache.readQuery({ query: QUERY_LISTINGS });
        cache.writeQuery({
          query: QUERY_LISTINGS,
          data: { listings: [addListing, ...listings] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, listings: [...me.listings, addListing] } },
      });
    },
  });

  // update state based on form input changes
  const handleChange = (event) => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addListing({
        variables: { listingText },
      });

      // clear form value
      setText('');
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      <p
        className={`m-0 ${characterCount === 280 || error ? 'text-error' : ''}`}
      >
        {error && <span className="ml-2">Something went wrong...</span>}
      </p>
      <form
        className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit}
      >
        <textarea
          placeholder="Create your listing (Title: $Price Description)..."
          value={listingText}
          className="form-input col-12 col-md-9"
          onChange={handleChange}
        ></textarea>
        <button className="btn col-12 col-md-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ListingForm;
