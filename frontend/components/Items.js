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
    const nordShopURL = `https://www.nordstromrack.com/shop/search?query=red%20wing&division=Men&department=Shoes&class=Boots&sizes%5B%5D=${
      this.state.size
    }&sizes%5B%5D=One%20Size&sort=relevancy`; // including one size
    const sierraShopURL = `https://www.sierra.com/s~red-wing/sizefamily~shoe%20size!${
      this.state.size
    }/`;
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
        <div>
          <h3>Nordstrom Rack</h3>
          <a href={nordShopURL} target="_blank" rel="noopener noreferrer">
            Shop
          </a>
          <ShopQuery
            query={NORDSTROM_QUERY}
            queryMethod="getNordstromrack"
            size={parseInt(this.state.size)}
          />
        </div>
        <div>
          <h3>Sierra</h3>
          <a href={sierraShopURL} target="_blank" rel="noopener noreferrer">
            Shop
          </a>
          <ShopQuery
            query={STP_QUERY}
            queryMethod="getSierra"
            size={parseInt(this.state.size)}
          />
        </div>
      </div>
    );
  }
}

export default Items;
export { NORDSTROM_QUERY, STP_QUERY };
