import React from 'react';
import './ProductImage.scss';

interface Props {
  imageUrl: string;
  productName: string;
}

export default function ProductImage(props: Props) {
  return (
    <img
      className="product-image"
      src={props.imageUrl}
      alt={props.productName}
    />
  );
}
