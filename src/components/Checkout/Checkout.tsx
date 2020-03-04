import React from 'react';
import Loader from 'react-loader-spinner';
import './Checkout.scss';

interface Props {
  totalPrice: number;
  doCheckout: () => void;
  checkingOut: boolean;
}

class Checkout extends React.Component<Props, {}> {
  render() {
    return (
      <div className="checkout">
        {this.props.checkingOut ? (
          <Loader type="ThreeDots" />
        ) : (
          <React.Fragment>
            <div
              className="button"
              title="Go to payment"
              onClick={this.props.doCheckout}
            >
              <i className="material-icons">payment</i>
              <span>Checkout</span>
            </div>
            <span>{this.props.totalPrice}$</span>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default Checkout;
