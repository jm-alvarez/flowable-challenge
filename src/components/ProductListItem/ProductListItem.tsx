import React from 'react';
import Product from '../../model/Product';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductImage from '../ProductImage/ProductImage';
import ProductStock from '../ProductStock/ProductStock';
import './ProductListItem.scss';

interface Props {
  product: Product;
}

class ProductListItem extends React.Component<Props, {}> {
  render() {
    const {
      image_url,
      productName,
      productDescription,
      price,
      stock
    } = this.props.product;

    return (
      <div className="product-list-item">
        <ProductImage imageUrl={image_url} productName={productName} />
        <ProductDescription
          productName={productName}
          productDescription={productDescription}
          price={price}
        />
        <ProductStock stock={stock} />
      </div>
    );
  }
}

export default ProductListItem;
