import React from 'react';
import Loader from 'react-loader-spinner';
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
  loadingProducts: boolean;
  nextPage: number;
}

class App extends React.Component<{}, State> {
  private readonly MOBILE_BREAKPOINT = 768;

  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
      selectedProducts: [],
      displaying: 0,
      isMobile: window.innerWidth < this.MOBILE_BREAKPOINT,
      loadingProducts: true,
      nextPage: 1
    };

    this.setupEventListeners();
  }

  async componentDidMount() {
    this.fetchProducts();
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
      />
    ];

    return (
      <div>
        <div className="container">
          {this.state.isMobile ? components[this.state.displaying] : components}
        </div>
        {this.state.loadingProducts ? <Loader type="ThreeDots" /> : null}
      </div>
    );
  }

  fetchProducts = async () => {
    this.setState({
      loadingProducts: true
    });

    const products = await ProductService.getProductList(this.state.nextPage);

    this.setState({
      products: [...this.state.products, ...products],
      nextPage: this.state.nextPage + 1,
      loadingProducts: false
    });
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

    this.setState({
      selectedProducts
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
}

export default App;
