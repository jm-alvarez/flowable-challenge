import React from 'react';
import Loader from 'react-loader-spinner';
import { toast, ToastContainer, ToastId } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from '../../model/Product';
import SelectedProduct from '../../model/SelectedProduct';
import ProductService from '../../services/ProductService';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import './App.scss';

interface State {
  initCompleted: boolean;
  products: Product[];
  selectedProducts: SelectedProduct[];
  displaying: 0 | 1;
  isMobile: boolean;
  loadingProducts: boolean;
  nextPage: number;
  addedProductToast: ToastId;
  removedProductToast: ToastId;
}

class App extends React.Component<{}, State> {
  private readonly MOBILE_BREAKPOINT = 768;

  constructor(props: any) {
    super(props);

    this.state = {
      initCompleted: false,
      products: [],
      selectedProducts: [],
      displaying: 0,
      isMobile: window.innerWidth < this.MOBILE_BREAKPOINT,
      loadingProducts: false,
      nextPage: 1,
      addedProductToast: -1,
      removedProductToast: -1
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
        isMobile: window.innerWidth < this.MOBILE_BREAKPOINT
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
      <ProductList
        key="product-list"
        products={this.state.products}
        showCart={() => this.updateDisplayedComponent(1)}
        addProductToCart={this.addProductToCart}
      />,
      <Cart
        key="cart"
        selectedProducts={this.state.selectedProducts}
        showProductList={() => this.updateDisplayedComponent(0)}
        increaseProductQuantity={this.addProductToCart}
        decreaseProductQuantity={this.decreaseProductQuantity}
        emptyCart={this.emptyCart}
      />
    ];

    return (
      <React.Fragment>
        {this.state.initCompleted ? (
          <div className="container">
            {this.state.isMobile
              ? components[this.state.displaying]
              : components}
          </div>
        ) : (
          <div className="loader">
            <Loader type="Rings" color="Blue" />
          </div>
        )}
        <ToastContainer />
      </React.Fragment>
    );
  }

  fetchProducts = async () => {
    if (this.state.loadingProducts) {
      setTimeout(this.fetchProducts, 1000);
    } else {
      this.setState({
        loadingProducts: true
      });

      const products = await ProductService.getProductList(this.state.nextPage);

      setTimeout(
        () =>
          this.setState({
            products: [...this.state.products, ...products],
            nextPage: this.state.nextPage + 1,
            loadingProducts: false,
            initCompleted: true
          }),
        this.state.initCompleted ? 0 : 2000
      );
    }
  };

  updateDisplayedComponent = (componentToDisplay: 0 | 1) => {
    this.setState({ displaying: componentToDisplay });
  };

  addProductToCart = (product: Product) => {
    const { selectedProducts } = this.state;

    const index = selectedProducts.findIndex(
      selectedProduct => selectedProduct.product.id === product.id
    );

    if (index !== -1) {
      selectedProducts[index].quantity += 1;
    } else {
      selectedProducts.push({ product, quantity: 1 });
    }

    selectedProducts.sort((a, b) =>
      a.product.productName > b.product.productName ? 1 : -1
    );

    const toastId = this.emitSuccessToast(
      'Product added successfully.',
      this.state.addedProductToast
    );

    this.setState({
      selectedProducts,
      addedProductToast: toastId
    });

    this.removeStockUnit(product);
  };

  removeStockUnit = (product: Product) => {
    const { products } = this.state;
    const index = products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      products[index].stock -= 1;
      this.setState({
        products
      });
    }
  };

  decreaseProductQuantity = ({ product }: SelectedProduct) => {
    const { selectedProducts } = this.state;

    const index = selectedProducts.findIndex(
      selectedProduct => selectedProduct.product.id === product.id
    );

    if (index !== -1) {
      selectedProducts[index].quantity -= 1;
    }

    if (selectedProducts[index].quantity === 0) {
      selectedProducts.splice(index, 1);
    }

    const toastId = this.emitSuccessToast(
      'Product removed successfully.',
      this.state.removedProductToast
    );

    this.setState({
      selectedProducts,
      removedProductToast: toastId
    });

    this.addStockUnit(product);
  };

  addStockUnit = (product: Product) => {
    const { products } = this.state;
    const index = products.findIndex(p => p.id === product.id);

    if (index !== -1) {
      products[index].stock += 1;
      this.setState({
        products
      });
    }
  };

  emptyCart = () => {
    this.setState({
      selectedProducts: []
    });
  };

  emitSuccessToast = (message: string, previousToast: ToastId) => {
    return !toast.isActive(previousToast)
      ? toast.success(message)
      : previousToast;
  };
}

export default App;
