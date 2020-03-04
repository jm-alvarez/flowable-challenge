import React from 'react';
import './ProductDescription.scss';

interface Props {
  productName: string;
  productDescription: string;
  price: number;
}

export default function ProductDescription(props: Props) {
  const { productDescription, productName, price } = props;

  const descriptionElement =
    productDescription.length > 75 ? (
      <div className="text">
        {productDescription.substring(0, 75)}...
        <span className="tooltip">{productDescription}</span>
      </div>
    ) : (
      <div className="text">{productDescription}</div>
    );

  return (
    <div className="product-description">
      <div>
        <p className="name">{productName}</p>
        {descriptionElement}
      </div>
      <p>{price}$</p>
    </div>
  );
}
