import React from 'react';
import ListingList from '../components/ListingList';
import ListingForm from '../components/ListingForm';

import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_LISTINGS } from '../utils/queries';
// add QUERY_ME_BASIC above if needed for later development

const Home = () => {
  const { loading, data } = useQuery(QUERY_LISTINGS);
  // const { data: userData } = useQuery(QUERY_ME_BASIC);
  const listings = data?.listings || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        {loggedIn && (
          <div className="col-12 mb-3">
            <ListingForm />
          </div>
        )}
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ListingList
              listings={listings}
              title="Create your Listing"
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;