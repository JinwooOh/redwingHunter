import React from 'react';
import { Query } from 'react-apollo';
import Item from './Item';

export default function ShopQuery({ query, queryMethod, shop, size }) {
  return (
    <div>
      <h3>{shop}</h3>
      <Query query={query} variables={{ size }}>
        {({ data, error, refetch, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <div>
              <button type="button" onClick={() => refetch()}>
                Refetch!
              </button>
              {data[queryMethod].map(item => (
                <div>
                  <Item item={item} />
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
}
