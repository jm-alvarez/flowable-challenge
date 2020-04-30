import React from 'react';
import { toast } from 'react-toastify';
import Product from '../../model/Product';
import SelectedProduct from '../../model/SelectedProduct';
import ProductService from '../../services/ProductService';
import CartList from '../CartList/CartList';
import Checkout from '../Checkout/Checkout';
import './Cart.scss';

interface IProps {
  selectedProducts: SelectedProduct[];
  showProductList: () => void;
  increaseProductQuantity: (product: Product) => void;
  decreaseProductQuantity: (product: SelectedProduct) => void;
  emptyCart: () => void;
}

interface IState {
  totalPrice: number;
  checkingOut: boolean;
}

class Cart extends React.PureComponent<IProps, IState> {
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
        {this.props.selectedProducts.length > 0 ? (
          <React.Fragment>
            <CartList
              selectedProducts={this.props.selectedProducts}
              increaseProductQuantity={this.props.increaseProductQuantity}
              decreaseProductQuantity={this.props.decreaseProductQuantity}
            />
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
    const totalPrice =
      this.props.selectedProducts.length > 0
        ? this.props.selectedProducts
            .map((selectedProduct) => selectedProduct.product.price * selectedProduct.quantity)
            .reduce((totalPrice, currentValue) => totalPrice + currentValue)
        : 0;

    if (this.state.totalPrice !== totalPrice) {
      this.setState({
        totalPrice,
      });
    }
  };

  doCheckout = () => {
    this.setState({
      checkingOut: true,
    });

    this.props.selectedProducts.forEach((selectedProduct) => {
      ProductService.updateProductStock(selectedProduct.product.id, selectedProduct.product.stock);
    });

    setTimeout(() => {
      toast.success('Checkout was successfully completed!');
      this.props.emptyCart();
      this.setState({
        checkingOut: false,
      });
      this.props.showProductList();
    }, 1000);
  };
}

export default Cart;
