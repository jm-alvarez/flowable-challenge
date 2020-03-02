import React from 'react';
import './Checkout.scss';

interface Props {
  totalPrice: number;
}

class Checkout extends React.Component<Props, {}> {
  render() {
    return (
      <div className="checkout">
        <button>Checkout</button>
        <span>{this.props.totalPrice}$</span>
      </div>
    );
  }
}

export default Checkout;
