import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import { toast, ToastContainer, ToastId } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from '../../model/Product';
import ProductService from '../../services/ProductService';
import { loadProducts } from '../../state/actions';
import { GlobalState } from '../../state/reducers';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import './App.scss';

interface IState {
  initCompleted: boolean;
  products: Product[];
  displaying: 0 | 1;
  isMobile: boolean;
  loadingProducts: boolean;
  nextPage: number;
  addedProductToast: ToastId;
  removedProductToast: ToastId;
}

interface IProps {
  products: Product[];
  onLoadProducts: (products: Product[]) => void;
}

class App extends React.Component<IProps, IState> {
  private readonly MOBILE_BREAKPOINT = 768;

  constructor(props: any) {
    super(props);

    this.state = {
      initCompleted: false,
      products: [],
      displaying: 0,
      isMobile: window.innerWidth < this.MOBILE_BREAKPOINT,
      loadingProducts: false,
      nextPage: 1,
      addedProductToast: -1,
      removedProductToast: -1,
    };

    this.setupEventListeners();
  }

  async componentDidMount() {
    await this.fetchProducts();
    if (!this.state.isMobile) {
      this.fetchProducts();
    }
  }

  setupEventListeners() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < this.MOBILE_BREAKPOINT,
      });
    });

    window.addEventListener('scroll', () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        this.state.displaying === 0 &&
        !this.state.loadingProducts
      ) {
        this.fetchProducts();
      }
    });
  }

  render() {
    const components = [
      <ProductList key="product-list" showCart={() => this.updateDisplayedComponent(1)} />,
      <Cart key="cart" showProductList={() => this.updateDisplayedComponent(0)} />,
    ];

    return (
      <React.Fragment>
        {this.state.initCompleted ? (
          <div className="container">
            {this.state.isMobile ? components[this.state.displaying] : components}
          </div>
        ) : (
          <div className="loader">
            <Loader type="Rings" color="Blue" />
          </div>
        )}
        <ToastContainer position="bottom-right" />
      </React.Fragment>
    );
  }

  fetchProducts = async () => {
    if (this.state.loadingProducts) {
      setTimeout(this.fetchProducts, 1000);
    } else {
      this.setState({
        loadingProducts: true,
      });

      const products = await ProductService.getProductList(this.state.nextPage);

      setTimeout(
        () => {
          this.props.onLoadProducts(products);

          this.setState({
            products: [...this.state.products, ...products],
            nextPage: this.state.nextPage + 1,
            loadingProducts: false,
            initCompleted: true,
          });
        },
        this.state.initCompleted ? 0 : 2000
      );
    }
  };

  updateDisplayedComponent = (componentToDisplay: 0 | 1) => {
    this.setState({ displaying: componentToDisplay });
  };

  // TODO: Not being called
  // addProductToCart = () => {
  //   const toastId = this.emitSuccessToast(
  //     'Product added successfully.',
  //     this.state.addedProductToast
  //   );

  //   this.setState({
  //     addedProductToast: toastId,
  //   });
  // };

  // TODO: Not being called
  // decreaseProductQuantity = () => {
  //   const toastId = this.emitSuccessToast(
  //     'Product removed successfully.',
  //     this.state.removedProductToast
  //   );

  //   this.setState({
  //     removedProductToast: toastId,
  //   });
  // };

  emitSuccessToast = (message: string, previousToast: ToastId) => {
    return !toast.isActive(previousToast) ? toast.success(message) : previousToast;
  };
}

const mapStateToProps = (state: GlobalState) => {
  return {
    products: state.products,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onLoadProducts: (products: Product[]) => {
      dispatch(loadProducts(products));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
