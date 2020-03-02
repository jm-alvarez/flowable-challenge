import React from 'react';
import Product from '../../model/Product';
import ProductService from '../../services/ProductService';
import Cart from '../Cart/Cart';
import ProductList from '../ProductList/ProductList';
import './App.scss';

interface State {
  products: Product[];
}

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);

    this.state = {
      products: []
    };
  }

  async componentDidMount() {
    const products = await ProductService.getProductList(0);
    this.setState({
      products
    });
  }

  render() {
    return (
      <div className="container">
        <ProductList products={this.state.products} />
        <Cart />
      </div>
    );
  }
}

export default App;
