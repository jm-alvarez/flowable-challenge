import React from 'react';
import './ProductImage.scss';

interface Props {
  imageUrl: string;
  productName: string;
}

class ProductImage extends React.Component<Props, {}> {
  render() {
    return (
      <img
        className="product-image"
        src={this.props.imageUrl}
        alt={this.props.productName}
      />
    );
  }
}

export default ProductImage;
