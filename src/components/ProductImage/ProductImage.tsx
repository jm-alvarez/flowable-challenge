import React from 'react';
import './ProductImage.scss';

interface IProps {
  imageUrl: string;
  productName: string;
}

const ProductImage = (props: IProps) => {
  return <img className="product-image" src={props.imageUrl} alt={props.productName} />;
};

export default React.memo(ProductImage);
