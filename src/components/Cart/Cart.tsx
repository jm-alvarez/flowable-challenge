import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Store from '@material-ui/icons/Store';
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
        <Typography variant="h4">Cart</Typography>
        <Tooltip title="Go to the product list" arrow>
          <Fab className="icon-button" color="primary" onClick={props.showProductList}>
            <Store />
          </Fab>
        </Tooltip>
      </div>
      {Object.keys(cart).length > 0 ? (
        <React.Fragment>
          <CartList />
          <Checkout doCheckout={doCheckout} checkingOut={checkingOut} />
        </React.Fragment>
      ) : (
        <Typography className="cart-empty-message" variant="body1">
          Cart is empty.
        </Typography>
      )}
    </div>
  );
};

export default Cart;
