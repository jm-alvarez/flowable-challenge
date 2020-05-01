import React from 'react';
import './ProductStock.scss';

interface IProps {
  stock: number;
  addProductToCart: () => void;
}

const ProductStock = (props: IProps) => {
  const { stock } = props;
  return (
    <div className="product-stock">
      <p>{stock} left</p>
      {stock ? (
        <i className="material-icons" title="Add to shopping cart" onClick={props.addProductToCart}>
          add_shopping_cart
        </i>
      ) : null}
    </div>
  );
};

export default ProductStock;
