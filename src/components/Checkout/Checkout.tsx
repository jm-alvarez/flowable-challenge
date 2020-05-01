import React from 'react';
import Loader from 'react-loader-spinner';
import './Checkout.scss';
import { useSelector } from 'react-redux';
import { GlobalState } from '../../state/reducers';

interface IProps {
  doCheckout: () => void;
  checkingOut: boolean;
}

const Checkout = (props: IProps) => {
  const totalPrice = useSelector((state: GlobalState) => state.totalPrice);

  return (
    <div className="checkout">
      {props.checkingOut ? (
        <Loader type="ThreeDots" color="Blue" />
      ) : (
        <React.Fragment>
          <div className="button" title="Go to payment" onClick={props.doCheckout}>
            <i className="material-icons">payment</i>
            <span>Checkout</span>
          </div>
          <span>{totalPrice}$</span>
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(Checkout);
