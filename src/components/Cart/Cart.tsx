import React from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import CartProducts from '../../model/Cart';
import Product from '../../model/Product';
import { GlobalState } from '../../state/reducers';
import CartList from '../CartList/CartList';
import Checkout from '../Checkout/Checkout';
import './Cart.scss';
import { emptyCart } from '../../state/actions';

interface IProps {
  cart: CartProducts;
  products: Product[];
  showProductList: () => void;
  onEmptyCart: () => void;
}

interface IState {
  totalPrice: number;
  checkingOut: boolean;
}

class Cart extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      totalPrice: 0,
      checkingOut: false,
    };
  }

  componentDidMount() {
    this.updateTotalPrice();
  }
  componentDidUpdate() {
    this.updateTotalPrice();
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
            <Checkout
              totalPrice={this.state.totalPrice}
              doCheckout={this.doCheckout}
              checkingOut={this.state.checkingOut}
            />
          </React.Fragment>
        ) : (
          <div className="cart-empty-message">Cart is empty</div>
        )}
      </div>
    );
  }

  updateTotalPrice = () => {
    const products = Object.entries(this.props.cart);

    const totalPrice =
      products.length > 0
        ? products
            .map(([id, quantity]) => this.getProduct(id).price * quantity)
            .reduce((totalPrice, currentValue) => totalPrice + currentValue)
        : 0;

    if (this.state.totalPrice !== totalPrice) {
      this.setState({
        totalPrice,
      });
    }
  };

  getProduct = (id: string) => this.props.products.filter((product) => product.id === id)[0];

  doCheckout = () => {
    this.setState({
      checkingOut: true,
    });

    // this.props.cart.forEach((selectedProduct) => {
    //   ProductService.updateProductStock(selectedProduct.product.id, selectedProduct.product.stock);
    // });

    setTimeout(() => {
      toast.success('Checkout was successfully completed!');
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
