import React from 'react';
import Product from '../../model/Product';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductImage from '../ProductImage/ProductImage';
import ProductStock from '../ProductStock/ProductStock';
import './ProductListItem.scss';

interface Props {
  product: Product;
  addProductToCart: Function;
}

export default function ProductListItem(props: Props) {
  const {
    image_url,
    productName,
    productDescription,
    price,
    stock
  } = props.product;

  return (
    <div className="product-list-item">
      <ProductImage imageUrl={image_url} productName={productName} />
      <ProductDescription
        productName={productName}
        productDescription={productDescription}
        price={price}
      />
      <ProductStock
        stock={stock}
        addProductToCart={() => props.addProductToCart(props.product)}
      />
    </div>
  );
}
