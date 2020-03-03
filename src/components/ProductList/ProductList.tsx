import React from 'react';
import Product from '../../model/Product';
import ProductListItem from '../ProductListItem/ProductListItem';
import './ProductList.scss';

interface Props {
  products: Product[];
  showCart: () => void;
}

class ProductList extends React.Component<Props, {}> {
  render() {
    return (
      <div className="product-list-container">
        <div className="title">
          <i
            className="material-icons"
            title="Go to the shopping cart"
            onClick={this.props.showCart}
          >
            arrow_back_ios
          </i>
          <h2>Product List</h2>
        </div>
        <div className="product-list">
          {this.props.products.map(product => (
            <ProductListItem key={product.id} product={product} />
          ))}
        </div>
      </div>
    );
  }
}

export default ProductList;
