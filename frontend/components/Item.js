import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

export default class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item } = this.props;
    return (
      <div>
        <p>
          {item.name} - {item.price_sale}
        </p>
      </div>
    );
  }
}
