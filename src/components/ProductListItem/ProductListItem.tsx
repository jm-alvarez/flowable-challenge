import React from 'react';
import Product from '../../model/Product';
import ProductDescription from '../ProductDescription/ProductDescription';
import ProductImage from '../ProductImage/ProductImage';
import ProductStock from '../ProductStock/ProductStock';
import './ProductListItem.scss';

interface IProps {
  product: Product;
  addProductToCart: (product: Product) => void;
}

const ProductListItem = (props: IProps) => {
  const { image_url, productName, productDescription, price, stock } = props.product;

  return (
    <div className="product-list-item">
      <ProductImage imageUrl={image_url} productName={productName} />
      <ProductDescription
        productName={productName}
        productDescription={productDescription}
        price={price}
      />
      <ProductStock stock={stock} addProductToCart={() => props.addProductToCart(props.product)} />
    </div>
  );
};

export default ProductListItem;
