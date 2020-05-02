import React from 'react';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../state/reducers';
import CartListItem from '../CartListItem/CartListItem';
import './CartList.scss';

const CartList = () => {
  const { cart, products } = useSelector((state: GlobalState) => state);
  const getProduct = (id: string) => products.filter((product) => product.id === id)[0];

  return (
    <div className="cart-list">
      {Object.entries(cart)
        .sort()
        .map(([id, quantity]) => (
          <CartListItem key={id} product={getProduct(id)} quantity={quantity} />
        ))}
    </div>
  );
};

export default React.memo(CartList);
