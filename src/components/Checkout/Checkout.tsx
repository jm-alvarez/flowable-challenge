import React from 'react';
import Loader from 'react-loader-spinner';
import './Checkout.scss';

interface IProps {
  totalPrice: number;
  doCheckout: () => void;
  checkingOut: boolean;
}

const Checkout = (props: IProps) => {
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
          <span>{props.totalPrice}$</span>
        </React.Fragment>
      )}
    </div>
  );
};

export default React.memo(Checkout);
