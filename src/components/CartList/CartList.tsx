import React from 'react';
import Product from '../../model/Product';
import SelectedProduct from '../../model/SelectedProduct';
import CartListItem from '../CartListItem/CartListItem';
import './CartList.scss';

interface IProps {
  selectedProducts: SelectedProduct[];
  increaseProductQuantity: (product: Product) => void;
  decreaseProductQuantity: (product: SelectedProduct) => void;
}

const CartList = (props: IProps) => {
  return (
    <div className="cart-list">
      {props.selectedProducts.map((selectedProduct) => (
        <CartListItem
          key={selectedProduct.product.id}
          selectedProduct={selectedProduct}
          quantity={selectedProduct.quantity}
          increaseProductQuantity={props.increaseProductQuantity}
          decreaseProductQuantity={props.decreaseProductQuantity}
        />
      ))}
    </div>
  );
};

export default CartList;
