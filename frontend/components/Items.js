import React, { Component } from 'react';
import gql from 'graphql-tag';
import styled from 'styled-components';
import ShopQuery from './ShopQuery';

const ShopWrapper = styled.div``;
const ShopTitle = styled.div``;
const ShopButton = styled.button`
  background: ${props => props.theme.grey};
  box-shadow: ${props => props.theme.bs};
  color: white;
  font-size: 16px;
  margin: 0 10px;
`;
const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: 1rem;
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid black;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.red};
    }
  }
  button,
  input[type='submit'] {
    width: auto;
    background: red;
    color: white;
    border: 0;
    font-size: 16px;
    font-weight: 600;
    padding: 2px 10px;
  }
`;

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
    const nordShopURL = `https://www.nordstromrack.com/shop/search?query=red%20wing&division=Men&department=Shoes&class=Boots&sizes%5B%5D=${this.state.size}&sort=relevancy`;
    const sierraShopURL = `https://www.sierra.com/s~red-wing/sizefamily~shoe%20size!${this.state.size}/`;
    return (
      <div>
        <Form>
          <div className="search">
            <label htmlFor="title">
              Size to search:
              <input
                type="nubmer"
                id="size"
                name="size"
                placeholder="Default 7D"
                step="0.5"
                required
                value={this.state.size}
                onChange={this.handleChange}
              />
            </label>
          </div>
        </Form>

        <ShopWrapper>
          <ShopTitle>
            <h3>
              Nordstrom Rack
              <a href={nordShopURL} target="_blank" rel="noopener noreferrer">
                <ShopButton>Shop</ShopButton>
              </a>
            </h3>
          </ShopTitle>
          <ShopQuery
            query={NORDSTROM_QUERY}
            queryMethod="getNordstromrack"
            size={parseFloat(this.state.size)}
          />
        </ShopWrapper>
        <ShopWrapper>
          <ShopTitle>
            <h3>
              Sierra
              <a href={sierraShopURL} target="_blank" rel="noopener noreferrer">
                <ShopButton>Shop</ShopButton>
              </a>
            </h3>
          </ShopTitle>
          <ShopQuery
            query={STP_QUERY}
            queryMethod="getSierra"
            size={parseFloat(this.state.size)}
          />
        </ShopWrapper>
      </div>
    );
  }
}

export default Items;
export { NORDSTROM_QUERY, STP_QUERY };
