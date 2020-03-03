import React from 'react';
import './Checkout.scss';

interface Props {
  totalPrice: number;
}

class Checkout extends React.Component<Props, {}> {
  render() {
    return (
      <div className="checkout">
        <div className="button" title="Go to payment">
          <i className="material-icons">payment</i>
          <span>Checkout</span>
        </div>
        <span>{this.props.totalPrice}$</span>
      </div>
    );
  }
}

export default Checkout;
