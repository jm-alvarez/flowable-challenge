import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import CartListItem from '../CartListItem/CartListItem';
import './CartList.scss';

interface Props {
  selectedProducts: SelectedProduct[];
  increaseProductQuantity: Function;
  decreaseProductQuantity: Function;
}

export default function CartList(props: Props) {
  return (
    <div className="cart-list">
      {props.selectedProducts.map(selectedProduct => (
        <CartListItem
          key={selectedProduct.product.id}
          selectedProduct={selectedProduct}
          increaseProductQuantity={props.increaseProductQuantity}
          decreaseProductQuantity={props.decreaseProductQuantity}
        />
      ))}
    </div>
  );
}
