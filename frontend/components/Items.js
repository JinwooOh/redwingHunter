import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Item from './Item';
import ShopQuery from './ShopQuery';

const NORDSTROM_QUERY = gql`
  query NORDSTROM_QUERY($size: Float) {
    getNordstromrack(size: $size) {
      name
      price_sale
    }
  }
`;
const STP_QUERY = gql`
  query STP_QUERY($size: Float) {
    getSierra(size: $size) {
      name
      price_sale
    }
  }
`;

class Items extends Component {
  state = {
    size: 7,
  };

  handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    this.setState({ [name]: val });
  };

  render() {
    return (
      <div>
        <div className="search">
          <label htmlFor="title">
            Size:
            <input
              type="nubmer"
              id="size"
              name="size"
              placeholder="Default 7D"
              step="0.1"
              required
              value={this.state.size}
              onChange={this.handleChange}
            />
          </label>
        </div>
        <ShopQuery
          query={NORDSTROM_QUERY}
          queryMethod="getNordstromrack"
          shop="Nordstrom Rack"
          size={parseInt(this.state.size)}
        />
        <ShopQuery
          query={STP_QUERY}
          queryMethod="getSierra"
          shop="Sierra"
          size={parseInt(this.state.size)}
        />
      </div>
    );
  }
}

export default Items;
export { NORDSTROM_QUERY, STP_QUERY };
