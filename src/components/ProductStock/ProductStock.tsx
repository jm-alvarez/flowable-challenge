import React from 'react';
import './ProductStock.scss';

interface Props {
  stock: number;
}

class ProductStock extends React.Component<Props, {}> {
  render() {
    const { stock } = this.props;
    return (
      <div className="product-stock">
        <p>{stock} left</p>
        <button disabled={stock === 0}>+ add</button>
      </div>
    );
  }
}

export default ProductStock;
