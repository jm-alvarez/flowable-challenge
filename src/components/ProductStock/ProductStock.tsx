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
        {stock ? (
          <i className="material-icons" title="Add to shopping cart">
            add_shopping_cart
          </i>
        ) : null}
      </div>
    );
  }
}

export default ProductStock;
