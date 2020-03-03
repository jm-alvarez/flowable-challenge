import React from 'react';
import SelectedProduct from '../../model/SelectedProduct';
import CartList from '../CartList/CartList';
import Checkout from '../Checkout/Checkout';
import './Cart.scss';

interface Props {
  selectedProducts: SelectedProduct[];
  showProductList: () => void;
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

  componentDidUpdate() {
    // TODO: Improve updating state only if the selected products or the quantity of one of them did change
    const totalPrice = this.props.selectedProducts
      .map(
        selectedProduct =>
          selectedProduct.product.price * selectedProduct.quantity
      )
      .reduce((totalPrice, currentValue) => totalPrice + currentValue);

    if (this.state.totalPrice !== totalPrice) {
      this.setState({
        totalPrice
      });
    }
  }

  render() {
    return (
      <div className="cart-container">
        <div className="title">
          <i
            className="material-icons"
            title="Go to the product list"
            onClick={this.props.showProductList}
          >
            arrow_back_ios
          </i>
          <h2>Cart</h2>
        </div>
        <CartList selectedProducts={this.props.selectedProducts} />
        <Checkout totalPrice={this.state.totalPrice} />
      </div>
    );
  }
}

export default Cart;
