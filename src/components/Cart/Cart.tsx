import React from 'react';
import { connect } from 'react-redux';
import CartProducts from '../../model/Cart';
import Product from '../../model/Product';
import { updateProductStock } from '../../services/ProductService';
import { emptyCart } from '../../state/actions';
import { GlobalState } from '../../state/reducers';
import { emitCheckoutCompletedToast } from '../../utils/toasts';
import CartList from '../CartList/CartList';
import Checkout from '../Checkout/Checkout';
import './Cart.scss';

interface IProps {
  cart: CartProducts;
  products: Product[];
  showProductList: () => void;
  onEmptyCart: () => void;
}

interface IState {
  checkingOut: boolean;
}

class Cart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      checkingOut: false,
    };
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
        {Object.keys(this.props.cart).length > 0 ? (
          <React.Fragment>
            <CartList />
            <Checkout doCheckout={this.doCheckout} checkingOut={this.state.checkingOut} />
          </React.Fragment>
        ) : (
          <div className="cart-empty-message">Cart is empty</div>
        )}
      </div>
    );
  }

  getProduct = (id: string) => this.props.products.filter((product) => product.id === id)[0];

  doCheckout = () => {
    this.setState({
      checkingOut: true,
    });

    this.props.products.forEach((product) => {
      if (this.props.cart[product.id]) {
        updateProductStock(product.id, product.stock);
      }
    });

    setTimeout(() => {
      emitCheckoutCompletedToast();
      this.props.onEmptyCart();
      this.setState({
        checkingOut: false,
      });
      this.props.showProductList();
    }, 1000);
  };
}

const mapStateToProps = (state: GlobalState) => {
  return {
    cart: state.cart,
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onEmptyCart: () => dispatch(emptyCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
