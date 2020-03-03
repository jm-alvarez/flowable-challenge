import React from 'react';
import Product from '../../model/Product';
import SelectedProduct from '../../model/SelectedProduct';
import ProductService from '../../services/ProductService';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import './App.scss';

interface State {
  products: Product[];
  selectedProducts: SelectedProduct[];
  displaying: 0 | 1;
  isMobile: boolean;
}

class App extends React.Component<{}, State> {
  private readonly MOBILE_BREAKPOINT = 768;

  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
      selectedProducts: [],
      displaying: 0,
      isMobile: window.innerWidth < this.MOBILE_BREAKPOINT
    };

    this.setupIsMobileDetection();
  }

  async componentDidMount() {
    const products = await ProductService.getProductList(0); // TODO: update to fetch more when user scrolls down
    const selectedProducts = products.map(product => {
      return { product, quantity: 2 };
    }); // TODO: stop mocking selected products

    this.setState({
      products,
      selectedProducts
    });
  }

  setupIsMobileDetection() {
    window.addEventListener('resize', () => {
      this.setState({
        isMobile: window.innerWidth < this.MOBILE_BREAKPOINT
      });
    });
  }

  render() {
    const components = [
      <ProductList
        key="product-list"
        products={this.state.products}
        showCart={() => this.updateDisplayedComponent(1)}
      />,
      <Cart
        key="cart"
        selectedProducts={this.state.selectedProducts}
        showProductList={() => this.updateDisplayedComponent(0)}
      />
    ];

    return (
      <div className="container">
        {this.state.isMobile ? components[this.state.displaying] : components}
      </div>
    );
  }

  updateDisplayedComponent = (componentToDisplay: 0 | 1) => {
    this.setState({ displaying: componentToDisplay });
  };
}

export default App;
