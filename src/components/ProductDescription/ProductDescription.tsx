import React from 'react';
import './ProductDescription.scss';

interface Props {
  productName: string;
  productDescription: string;
  price: number;
}

class ProductDescription extends React.Component<Props, {}> {
  render() {
    const { productDescription, productName, price } = this.props;

    return (
      <div className="product-description">
        <div>
          <p className="name">{productName}</p>
          {productDescription.length > 75 ? (
            <div className="text">
              {productDescription.substring(0, 75)}...
              <span className="tooltip">{productDescription}</span>
            </div>
          ) : (
            <div className="text">{productDescription}</div>
          )}
        </div>
        <p>{price}$</p>
      </div>
    );
  }
}

export default ProductDescription;
