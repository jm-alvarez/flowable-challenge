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

    this.setState({
      products
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
        addProductToCart={this.addProductToCart}
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

    this.setState({
      selectedProducts
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
}

export default App;
