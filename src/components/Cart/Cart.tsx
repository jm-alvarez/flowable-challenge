import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProductStock } from '../../services/ProductService';
import { emptyCart } from '../../state/actions';
import { GlobalState } from '../../state/reducers';
import { emitCheckoutCompletedToast } from '../../utils/toasts';
import CartList from '../CartList/CartList';
import Checkout from '../Checkout/Checkout';
import './Cart.scss';

interface IProps {
  showProductList: () => void;
}

const Cart = (props: IProps) => {
  const [checkingOut, setCheckingOut] = useState(false);
  const { cart, products } = useSelector((state: GlobalState) => state);
  const dispatch = useDispatch();

  const doCheckout = () => {
    setCheckingOut(true);

    products.forEach((product) => {
      if (cart[product.id]) {
        updateProductStock(product.id, product.stock);
      }
    });

    setTimeout(() => {
      emitCheckoutCompletedToast();
      dispatch(emptyCart());
      setCheckingOut(false);
      props.showProductList();
    }, 1000);
  };

  return (
    <div className="cart-container">
      <div className="title">
        <i
          className="material-icons"
          title="Go to the product list"
          onClick={props.showProductList}
        >
          arrow_back_ios
        </i>
        <h2>Cart</h2>
      </div>
      {Object.keys(cart).length > 0 ? (
        <React.Fragment>
          <CartList />
          <Checkout doCheckout={doCheckout} checkingOut={checkingOut} />
        </React.Fragment>
      ) : (
        <div className="cart-empty-message">Cart is empty</div>
      )}
    </div>
  );
};

export default Cart;
