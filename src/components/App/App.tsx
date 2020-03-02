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
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      products: [],
      selectedProducts: []
    };
  }

  async componentDidMount() {
    const products = await ProductService.getProductList(0); // TODO: update to fetch more when user scrolls down
    const selectedProducts = products.map(product => {
      return { product, quantity: 1 };
    }); // TODO: stop mocking selected products

    this.setState({
      products,
      selectedProducts
    });
  }

  render() {
    return (
      <div className="container">
        <ProductList products={this.state.products} />
        <Cart selectedProducts={this.state.selectedProducts} />
      </div>
    );
  }
}

export default App;
