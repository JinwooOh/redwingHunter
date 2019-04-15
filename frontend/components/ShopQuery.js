import React from 'react';
import { Query } from 'react-apollo';
import styled from 'styled-components';
import Item from './Item';

const ItemList = styled.div`
  font-family: Tahoma;
`;

export default function ShopQuery({ query, queryMethod, size }) {
  return (
    <div>
      <Query query={query} variables={{ size }}>
        {({ data, error, refetch, loading }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error: {error.message}</p>;
          return (
            <div>
              <button type="button" onClick={() => refetch()}>
                Refetch!
              </button>
              {data[queryMethod].map((item, i) => (
                <ItemList key={i}>
                  <Item item={item} />
                </ItemList>
              ))}
            </div>
          );
        }}
      </Query>
    </div>
  );
}
