import React from 'react';
import './Cart.scss';
import SelectedProduct from '../../model/SelectedProduct';
import CartListItem from '../CartListItem/CartListItem';
import Checkout from '../Checkout/Checkout';

interface Props {
  selectedProducts: SelectedProduct[];
}

interface State {
  totalPrice: number;
}

class Cart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      totalPrice: 0
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    const totalPrice = nextProps.selectedProducts
      .map(
        selectedProduct =>
          selectedProduct.product.price * selectedProduct.quantity
      )
      .reduce((totalPrice, currentValue) => totalPrice + currentValue);

    this.setState({
      totalPrice
    });
  }

  render() {
    return (
      <div className="cart-container">
        <h2>Cart</h2>
        <div className="cart-list">
          {this.props.selectedProducts.map(selectedProduct => (
            <CartListItem
              key={selectedProduct.product.id}
              selectedProduct={selectedProduct}
            />
          ))}
        </div>
        <Checkout totalPrice={this.state.totalPrice} />
      </div>
    );
  }
}

export default Cart;
